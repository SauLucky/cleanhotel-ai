const form = document.getElementById('cotizadorForm');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');
const resultadoSection = document.getElementById('resultadoSection');

document.querySelectorAll('.btn-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('pedido').value = btn.getAttribute('data-text');
  });
});

const formatMoney = (num) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(num || 0);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.classList.add('hidden');
  resultadoSection.classList.add('hidden');
  loader.classList.remove('hidden');

  const sucursal = document.getElementById('sucursal').value;
  const pedido = document.getElementById('pedido').value;

  try {
    const res = await fetch('/api/cotizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sucursal, pedido })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error en el servidor');

    document.getElementById('sucursalInfo').textContent = data.sucursal_asignada || sucursal;
    document.getElementById('fechaCotizacion').textContent = new Date().toLocaleDateString('es-MX');

    const tbody = document.getElementById('tablaItems');
    tbody.innerHTML = '';

    (data.items || []).forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.sku}</td>
        <td>${item.producto}</td>
        <td class="num">${item.cantidad}</td>
        <td class="num">${formatMoney(item.precio)}</td>
        <td class="num">${formatMoney(item.importe)}</td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('valSubtotal').textContent = formatMoney(data.subtotal);
    document.getElementById('valDescuento').textContent = `-${formatMoney(data.descuento)}`;
    document.getElementById('valEnvio').textContent = formatMoney(data.envio);
    document.getElementById('valIva').textContent = formatMoney(data.iva);
    document.getElementById('valTotal').textContent = formatMoney(data.total);
    document.getElementById('notasComerciales').textContent = data.notas_comerciales || '';

    resultadoSection.classList.remove('hidden');
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  } finally {
    loader.classList.add('hidden');
  }
});