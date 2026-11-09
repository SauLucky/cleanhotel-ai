require('dotenv').config();
const express = require('express');
const path = require('path');
const { AIProjectClient } = require('@azure/ai-projects');
const { DefaultAzureCredential } = require('@azure/identity');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const projectEndpoint = process.env.FOUNDRY_PROJECT_ENDPOINT;
const agentName = process.env.FOUNDRY_AGENT_NAME || 'AgenteCleanHotel';

app.post('/api/cotizar', async (req, res) => {
  try {
    const { sucursal, pedido } = req.body;
    if (!pedido || pedido.trim() === '') {
      return res.status(400).json({ error: 'Por favor describe tu necesidad.' });
    }

    const client = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
    const openAIClient = client.getOpenAIClient();

    const promptUsuario = `Sucursal seleccionada: ${sucursal}.\nPedido del cliente: ${pedido}`;

    const response = await openAIClient.responses.create(
      { input: promptUsuario },
      {
        body: {
          agent_reference: {
            name: agentName,
            type: 'agent_reference'
          }
        }
      }
    );

    const rawText = response.output_text || '';
    const cleanJsonText = rawText.replace(/```json|```/g, '').trim();
    const cotizacionData = JSON.parse(cleanJsonText);

    res.json(cotizacionData);
  } catch (error) {
    console.error('Error al generar cotización:', error);
    res.status(500).json({
      error: 'No se pudo procesar la cotización.',
      detalle: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});