# CleanHotel AI | Cotizador Inteligente B2B

Portal web desarrollado con Inteligencia Artificial Generativa para automatizar las cotizaciones de insumos de limpieza para hoteles a partir de solicitudes en lenguaje natural.

## Enlace Público en Producción
[Abrir CleanHotel AI Cotizador B2B](https://azurewebsites.net)

## Arquitectura de la Solución

```mermaid
flowchart LR
    U[Gerente de Hotel] -->|1. Pedido en lenguaje natural| FE[Frontend HTML/CSS/JS]
    FE -->|2. Petición HTTP POST| BE[Backend Node.js + Express en Azure App Service]
    BE -->|3. SDK AIProjectClient| AG[Agente en Microsoft Foundry]
    AG -->|4. Consulta RAG| CAT[(Catálogo B2B Markdown)]
    AG -->|5. Respuesta JSON estructurada| BE
    BE -->|6. Tabla desglosada + PDF| FE
```

## Tecnologías Utilizadas
- **Inteligencia Artificial:** Microsoft Foundry (`gpt-4.1-mini`), RAG con catálogo B2B, salidas estructuradas en JSON.
- **Nube y Seguridad:** Azure App Service (Linux Node 24 LTS) y Azure Entra ID (Identidad Administrada).
- **Desarrollo:** Node.js, Express, HTML5, CSS3, JavaScript y GitHub Copilot.

## Evidencias de Funcionamiento

### 1. Pantalla Principal
![Pantalla Principal](capturas/1-pantalla-principal.png)

### 2. Cotización Generada por IA
![Cotización Generada](capturas/2-cotizacion-generada.png)

### 3. Despliegue en Azure App Service
![Despliegue Azure](capturas/3-despliegue-azure.png)