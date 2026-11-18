// Estado y Persistencia Multi-Sucursal
const DEFAULT_DATA = {
  sucursalActiva: 'suc_1',
  sucursales: [
    { id: 'suc_1', nombre: 'Sucursal Central', direccion: 'Av. Principal #101' },
    { id: 'suc_2', nombre: 'Sucursal Norte', direccion: 'Calle Comercial #45' },
    { id: 'suc_3', nombre: 'Sucursal Sur', direccion: 'Av. Las Palmas #88' }
  ],
  estilistas: [
    { id: 'e1', sucursalId: 'suc_1', nombre: 'Carlos Mendoza', cedula: '1712345678', nacimiento: '1988-03-12' },
    { id: 'e2', sucursalId: 'suc_2', nombre: 'Ana Gómez', cedula: '1723456789', nacimiento: '1992-07-25' },
    { id: 'e3', sucursalId: 'suc_3', nombre: 'Luis Torres', cedula: '1734567890', nacimiento: '1990-11-05' }
  ],
  servicios: [
    { id: 's1', nombre: 'Corte Caballero', precio: 12.00, tipo: 'servicio', fechaCreacion: '2026-01-05', usosCount: 42 },
    { id: 's2', nombre: 'Tinte & Peinado', precio: 35.00, tipo: 'servicio', fechaCreacion: '2026-01-08', usosCount: 18 },
    { id: 's3', nombre: 'Perfilado Barba', precio: 8.00, tipo: 'servicio', fechaCreacion: '2026-01-15', usosCount: 30 }
  ],
  productos: [
    { id: 'p1', sucursalId: 'suc_1', nombre: 'Cera Moldeadora', categoria: 'Capilar', precio: 15.00, stock: 8, tipo: 'producto', fechaCreacion: '2026-01-10' },
    { id: 'p2', sucursalId: 'suc_2', nombre: 'Aceite para Barba', categoria: 'Barba', precio: 18.00, stock: 2, tipo: 'producto', fechaCreacion: '2026-01-12' },
    { id: 'p3', sucursalId: 'suc_1', nombre: 'Shampoo Especial', categoria: 'Capilar', precio: 22.00, stock: 4, tipo: 'producto', fechaCreacion: '2026-02-01' }
  ],
  clientes: [
   { id: 'c_imp_1', nombre: 'Erick Morocho', telefono: '0963026507', nacimiento: '2017-10-23', fechaCreacion: '2026-10-05', notas: '' },
   { id: 'c_imp_2', nombre: 'Edwin Caguana', telefono: '0997046998', nacimiento: '2007-05-10', fechaCreacion: '2026-10-04', notas: '' }
  ],
  ventas: []
};

// Autenticación de Super Admin
const PASSWORD_SUPER_ADMIN = "admin123";
let esSuperAdmin = false;

function cargarDatos() {
  const local = localStorage.getItem('styleStudioMultiBranch');
  const data = local ? JSON.parse(local) : DEFAULT_DATA;
  
  if (data.productos) {
    data.productos.forEach(p => {
      if (!p.fechaCreacion) p.fechaCreacion = new Date().toISOString().split('T')[0];
    });
  }
  if (data.servicios) {
    data.servicios.forEach(s => {
      if (!s.fechaCreacion) s.fechaCreacion = new Date().toISOString().split('T')[0];
      if (s.usosCount === undefined) s.usosCount = 0;
    });
  }

  return data;
}

function guardarDatos() {
  localStorage.setItem('styleStudioMultiBranch', JSON.stringify(appData));
}

let appData = cargarDatos();
let carritoPOS = [];
let moduloActual = 'pos';

document.addEventListener('DOMContentLoaded', () => {
  setupNavegacion();
  setupTema();
  renderizarSucursales();
  actualizarVisibilidadBotonesAdmin();
  renderizarModulo('pos');
});

function setupNavegacion() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      if (targetTab === 'superadmin' && !esSuperAdmin) {
        document.getElementById('superAdminPassInput').value = '';
        abrirModal('modalSuperAdminAuth');
        return;
      }

      activarPestana(btn, targetTab);
    });
  });

  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

function activarPestana(btn, targetTab) {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  moduloActual = targetTab;
  renderizarModulo(moduloActual);
  document.getElementById('sidebar').classList.remove('open');
}

function validarPasswordSuperAdmin(e) {
  e.preventDefault();
  const inputPass = document.getElementById('superAdminPassInput').value;

  if (inputPass === PASSWORD_SUPER_ADMIN) {
    esSuperAdmin = true;
    cerrarModal('modalSuperAdminAuth');
    actualizarVisibilidadBotonesAdmin();
    
    const superAdminBtn = document.querySelector('.nav-btn[data-tab="superadmin"]');
    activarPestana(superAdminBtn, 'superadmin');
  } else {
    alert('Contraseña incorrecta. Inténtalo de nuevo.');
  }
}

function cerrarSesionSuperAdmin() {
  if (confirm('¿Deseas cerrar la sesión de Super Admin? Se ocultarán las funciones avanzadas.')) {
    esSuperAdmin = false;
    actualizarVisibilidadBotonesAdmin();
    const posBtn = document.querySelector('.nav-btn[data-tab="pos"]');
    activarPestana(posBtn, 'pos');
    alert('Sesión de Super Admin cerrada correctamente.');
  }
}

function actualizarVisibilidadBotonesAdmin() {
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(el => {
    if (esSuperAdmin) {
      el.classList.add('unlocked');
    } else {
      el.classList.remove('unlocked');
    }
  });

  const badge = document.getElementById('badgeAdminActive');
  const btnCerrarHeader = document.getElementById('btnCerrarSuperAdmin');
  const icon = document.getElementById('adminStatusIcon');
  
  if (esSuperAdmin) {
    if (badge) badge.style.display = 'inline-flex';
    if (btnCerrarHeader) btnCerrarHeader.style.display = 'inline-flex';
    if (icon) {
      icon.className = 'fa-solid fa-lock-open';
      icon.style.color = 'var(--emerald)';
    }
  } else {
    if (badge) badge.style.display = 'none';
    if (btnCerrarHeader) btnCerrarHeader.style.display = 'none';
    if (icon) {
      icon.className = 'fa-solid fa-lock';
      icon.style.color = '';
    }
  }
}

// Gestión de Sucursales
function renderizarSucursales() {
  const select = document.getElementById('sucursalSelect');
  select.innerHTML = appData.sucursales.map(s => `
    <option value="${s.id}" ${s.id === appData.sucursalActiva ? 'selected' : ''}>${s.nombre}</option>
  `).join('');
}

function cambiarSucursal(id) {
  appData.sucursalActiva = id;
  guardarDatos();
  renderizarModulo(moduloActual);
}

function guardarSucursal(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const nueva = {
    id: 'suc_' + Date.now(),
    nombre: document.getElementById('sucursalNombre').value,
    direccion: document.getElementById('sucursalDireccion').value
  };

  appData.sucursales.push(nueva);
  appData.sucursalActiva = nueva.id;
  guardarDatos();
  cerrarModal('modalSucursal');
  renderizarSucursales();
  renderizarModulo(moduloActual);
}

function eliminarSucursalActiva() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  if (appData.sucursales.length <= 1) {
    alert('No puedes eliminar la última sucursal existente.');
    return;
  }

  const sucursalActual = appData.sucursales.find(s => s.id === appData.sucursalActiva);
  const nombreSucursal = sucursalActual ? sucursalActual.nombre : 'esta sucursal';

  if (confirm(`¿Estás seguro de que deseas eliminar la sucursal "${nombreSucursal}"? Se eliminarán también sus estilistas, productos y registros asociados a esta ubicación.`)) {
    const idEliminar = appData.sucursalActiva;

    appData.sucursales = appData.sucursales.filter(s => s.id !== idEliminar);
    appData.estilistas = appData.estilistas.filter(e => e.sucursalId !== idEliminar);
    appData.productos = appData.productos.filter(p => p.sucursalId !== idEliminar);
    appData.ventas = appData.ventas.filter(v => v.sucursalId !== idEliminar);

    appData.sucursalActiva = appData.sucursales[0].id;

    guardarDatos();
    renderizarSucursales();
    renderizarModulo(moduloActual);
  }
}

function renderizarModulo(modulo) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
  const activeMod = document.getElementById(`mod-${modulo}`);
  if (activeMod) activeMod.classList.add('active');

  const sucursal = appData.sucursales.find(s => s.id === appData.sucursalActiva);
  const nombreSuc = sucursal ? sucursal.nombre : 'General';

  const titulos = {
    pos: [`Punto de Venta - ${nombreSuc}`, 'Facturación y cobranza'],
    estilistas: [`Estilistas - ${nombreSuc}`, 'Personal asignado a esta sucursal'],
    inventario: [`Inventario & Servicios - ${nombreSuc}`, 'Gestión de stock de productos y catálogo de servicios'],
    clientes: ['Clientes Globales', 'Directorio de clientes de la cadena'],
    superadmin: ['Panel Super Admin', 'Control global, gestión de sucursales y reportes avanzados']
  };

  if (titulos[modulo]) {
    document.getElementById('pageTitle').innerText = titulos[modulo][0];
    document.getElementById('pageSubTitle').innerText = titulos[modulo][1];
  }

  poblarSelects();

  if (modulo === 'pos') renderizarPOS();
  if (modulo === 'estilistas') renderizarEstilistas();
  if (modulo === 'inventario') {
    renderizarInventario();
    comprobarAvisoCompraInventario();
  }
  if (modulo === 'clientes') renderizarClientes();
  if (modulo === 'superadmin') {
    renderizarSuperAdmin();
    renderizarDashboard();
  }
}

// DASHBOARD INTEGRADO
function renderizarDashboard() {
  const hoy = new Date().toISOString().split('T')[0];
  const ventasSucursal = appData.ventas.filter(v => v.sucursalId === appData.sucursalActiva);
  const ingresosHoy = ventasSucursal
    .filter(v => v.fecha === hoy)
    .reduce((sum, v) => sum + v.total, 0);
  const estilistasCount = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva).length;
  const stockBajo = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva && p.stock <= 5).length;

  const elIngresos = document.getElementById('dashIngresos');
  const elEstilistas = document.getElementById('dashEstilistas');
  const elStockBajo = document.getElementById('dashStockBajo');

  if (elIngresos) elIngresos.innerText = `$${ingresosHoy.toFixed(2)}`;
  if (elEstilistas) elEstilistas.innerText = estilistasCount;
  if (elStockBajo) elStockBajo.innerText = stockBajo;

  const tbodyVentas = document.getElementById('dashTablaVentas');
  if (tbodyVentas) {
    tbodyVentas.innerHTML = ventasSucursal.length === 0
      ? `<tr><td colspan="6" class="text-center">Sin facturas recientes registradas</td></tr>`
      : ventasSucursal.slice(-15).reverse().map(v => {
          const cliente = appData.clientes.find(c => c.id === v.clienteId)?.nombre || 'Cliente Ocasional';
          const estilista = appData.estilistas.find(e => e.id === v.estilistaId)?.nombre || 'Sin Asignar';
          return `
            <tr>
              <td>${v.fecha}</td>
              <td><strong>${cliente}</strong></td>
              <td>${estilista}</td>
              <td><span class="badge-status badge-Confirmada">${v.metodoPago}</span></td>
              <td><strong>$${v.total.toFixed(2)}</strong></td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="reimprimirTicket('${v.id}')" title="Reimprimir Factura">
                  <i class="fa-solid fa-print"></i> Imprimir
                </button>
              </td>
            </tr>
          `;
        }).join('');
  }
}

// SUPER ADMIN
function cambiarSubmodSuperAdmin(tab, btn) {
  document.querySelectorAll('#mod-superadmin .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const divGlobal = document.getElementById('submod-superadmin-global');
  const divDash = document.getElementById('submod-superadmin-dashboard');
  const divRep = document.getElementById('submod-superadmin-reportes');

  if (divGlobal) divGlobal.style.display = 'none';
  if (divDash) divDash.style.display = 'none';
  if (divRep) divRep.style.display = 'none';

  if (tab === 'global') {
    if (divGlobal) divGlobal.style.display = 'block';
  } else if (tab === 'dashboard') {
    if (divDash) divDash.style.display = 'block';
    renderizarDashboard();
  } else if (tab === 'reportes') {
    if (divRep) divRep.style.display = 'block';
    actualizarGraficosSuperAdmin();
  }
}

function renderizarSuperAdmin() {
  const container = document.getElementById('superAdminContainer');
  if (!container) return;

  // Cálculo de las ganancias totales globales de todas las sucursales
  let gananciasGlobalesTotales = 0;
  appData.sucursales.forEach(sucursal => {
    const ventasSuc = appData.ventas.filter(v => v.sucursalId === sucursal.id);
    const totalGanancias = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    gananciasGlobalesTotales += totalGanancias;
  });

  const elGananciasGlobales = document.getElementById('gananciasTotalesCadena');
  if (elGananciasGlobales) {
    elGananciasGlobales.innerText = `$${gananciasGlobalesTotales.toFixed(2)}`;
  }

  container.innerHTML = appData.sucursales.map(sucursal => {
    const ventasSuc = appData.ventas.filter(v => v.sucursalId === sucursal.id);
    const totalGanancias = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    const estilistasSuc = appData.estilistas.filter(e => e.sucursalId === sucursal.id);
    const productosSuc = appData.productos.filter(p => p.sucursalId === sucursal.id);

    return `
      <div class="card" style="margin-bottom: 2rem; border-left: 4px solid var(--accent);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <div>
            <h2 style="font-size: 1.2rem; color: var(--text-primary);"><i class="fa-solid fa-store"></i> ${sucursal.nombre}</h2>
            <small style="color: var(--text-secondary);">${sucursal.direccion}</small>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Ganancias Sucursal:</span>
            <h3 style="color: var(--emerald); font-size: 1.3rem;">$${totalGanancias.toFixed(2)}</h3>
          </div>
        </div>

        <div class="grid-2-col" style="gap: 1rem;">
          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--accent);"><i class="fa-solid fa-user-ninja"></i> Peluqueros / Estilistas (${estilistasSuc.length})</h4>
            ${estilistasSuc.length === 0 ? '<p style="font-size: 0.85rem; color: var(--text-secondary);">No hay estilistas registrados.</p>' : `
              <ul style="list-style: none; padding: 0;">
                ${estilistasSuc.map(e => `<li style="padding: 4px 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; display: flex; justify-content: space-between;"><span>${e.nombre}</span> <small>Cédula: ${e.cedula || 'N/A'}</small></li>`).join('')}
              </ul>
            `}
          </div>

          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--amber);"><i class="fa-solid fa-boxes-stacked"></i> Inventario / Stock (${productosSuc.length})</h4>
            ${productosSuc.length === 0 ? '<p style="font-size: 0.85rem; color: var(--text-secondary);">No hay productos registrados.</p>' : `
              <ul style="list-style: none; padding: 0; max-height: 120px; overflow-y: auto;">
                ${productosSuc.map(p => `<li style="padding: 4px 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; display: flex; justify-content: space-between;"><span>${p.nombre}</span> <strong>Stock: ${p.stock} ($${p.precio})</strong></li>`).join('')}
              </ul>
            `}
          </div>
        </div>

        <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin-top: 1rem;">
          <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--blue);"><i class="fa-solid fa-scissors"></i> Servicios Disponibles</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem;">
            ${appData.servicios.map(s => `<span style="background: var(--bg-card); padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; border: 1px solid var(--border-color);">${s.nombre} - <strong>$${s.precio.toFixed(2)}</strong></span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  const selectReportes = document.getElementById('filtroReporteSucursal');
  if (selectReportes) {
    selectReportes.innerHTML = `<option value="todas">Todas las Sucursales (Consolidado)</option>` + 
      appData.sucursales.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
  }
}

function limpiarFiltrosFechasReportes() {
  document.getElementById('reporteFechaInicio').value = '';
  document.getElementById('reporteFechaFin').value = '';
  actualizarGraficosSuperAdmin();
}

function actualizarGraficosSuperAdmin() {
  const selectFilter = document.getElementById('filtroReporteSucursal');
  const sucursalIdSeleccionada = selectFilter ? selectFilter.value : 'todas';
  
  const fechaInicio = document.getElementById('reporteFechaInicio').value;
  const fechaFin = document.getElementById('reporteFechaFin').value;

  const elemC1 = document.getElementById('chartServiciosPopulares');
  const elemC2 = document.getElementById('chartEstilistasVentas');
  const elemC3 = document.getElementById('chartIngresosSemanales');

  if (!elemC1 || !elemC2 || !elemC3) return;

  const ctx1 = elemC1.getContext('2d');
  const ctx2 = elemC2.getContext('2d');
  const ctx3 = elemC3.getContext('2d');

  if (window.repChart1) window.repChart1.destroy();
  if (window.repChart2) window.repChart2.destroy();
  if (window.repChart3) window.repChart3.destroy();

  let ventasFiltradas = appData.ventas;
  if (sucursalIdSeleccionada !== 'todas') {
    ventasFiltradas = ventasFiltradas.filter(v => v.sucursalId === sucursalIdSeleccionada);
  }
  if (fechaInicio) {
    ventasFiltradas = ventasFiltradas.filter(v => v.fecha >= fechaInicio);
  }
  if (fechaFin) {
    ventasFiltradas = ventasFiltradas.filter(v => v.fecha <= fechaFin);
  }

  const contadorServicios = {};
  appData.servicios.forEach(s => contadorServicios[s.id] = 0);

  ventasFiltradas.forEach(v => {
    if (Array.isArray(v.items)) {
      v.items.forEach(item => {
        if (item.tipo === 'servicio') {
          contadorServicios[item.id] = (contadorServicios[item.id] || 0) + (item.cantidad || 1);
        }
      });
    }
  });

  const labelsServicios = appData.servicios.map(s => s.nombre);
  const dataServicios = appData.servicios.map(s => contadorServicios[s.id] || s.usosCount || 0);

  window.repChart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: labelsServicios,
      datasets: [{
        data: dataServicios,
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'],
        borderWidth: 2,
        borderColor: 'var(--bg-card)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: 'var(--text-primary)', font: { size: 11 } }
        }
      }
    }
  });

  let estilistasFiltrados = appData.estilistas;
  if (sucursalIdSeleccionada !== 'todas') {
    estilistasFiltrados = appData.estilistas.filter(e => e.sucursalId === sucursalIdSeleccionada);
  }

  const gananciasEstilista = {};
  estilistasFiltrados.forEach(e => gananciasEstilista[e.id] = 0);

  ventasFiltradas.forEach(v => {
    if (gananciasEstilista[v.estilistaId] !== undefined) {
      gananciasEstilista[v.estilistaId] += (v.total || 0);
    }
  });

  window.repChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: estilistasFiltrados.map(e => e.nombre),
      datasets: [{
        label: 'Ventas Total ($)',
        data: estilistasFiltrados.map(e => gananciasEstilista[e.id] || 0),
        backgroundColor: '#3b82f6',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: 'var(--text-secondary)' }, grid: { display: false } },
        y: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'var(--border-color)' } }
      }
    }
  });

  const ventasPorFechaMap = {};
  ventasFiltradas.forEach(v => {
    ventasPorFechaMap[v.fecha] = (ventasPorFechaMap[v.fecha] || 0) + v.total;
  });

  let fechasOrdenadas = Object.keys(ventasPorFechaMap).sort();
  if (fechasOrdenadas.length === 0) {
    fechasOrdenadas = ['Sin Datos'];
    ventasPorFechaMap['Sin Datos'] = 0;
  }

  window.repChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: fechasOrdenadas,
      datasets: [{
        label: 'Rendimiento Ventas ($)',
        data: fechasOrdenadas.map(f => ventasPorFechaMap[f]),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#10b981',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: 'var(--text-primary)' } } },
      scales: {
        x: { ticks: { color: 'var(--text-secondary)' }, grid: { display: false } },
        y: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'var(--border-color)' } }
      }
    }
  });
}

// CAJA / POS
function renderizarPOS() {
  const grid = document.getElementById('posCatalogGrid');
  if (!grid) return;
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const items = [...appData.servicios, ...prodsSucursal];

  grid.innerHTML = items.map(item => `
    <div class="pos-item-card" onclick="agregarAlCarrito('${item.id}')">
      <strong>${item.nombre}</strong>
      <p>$${item.precio.toFixed(2)}</p>
      <small>${item.tipo.toUpperCase()}</small>
    </div>
  `).join('');

  renderizarCarritoPOS();
}

function filtrarPOSCatalog(tipo, btn) {
  document.querySelectorAll('.pos-tabs .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const grid = document.getElementById('posCatalogGrid');
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  let items = [...appData.servicios, ...prodsSucursal];

  if (tipo !== 'todos') items = items.filter(i => i.tipo === tipo);

  grid.innerHTML = items.map(item => `
    <div class="pos-item-card" onclick="agregarAlCarrito('${item.id}')">
      <strong>${item.nombre}</strong>
      <p>$${item.precio.toFixed(2)}</p>
      <small>${item.tipo.toUpperCase()}</small>
    </div>
  `).join('');
}

function agregarAlCarrito(itemId) {
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const item = [...appData.servicios, ...prodsSucursal].find(i => i.id === itemId);
  if (!item) return;

  const existe = carritoPOS.find(i => i.id === itemId);
  if (existe) { existe.cantidad++; } 
  else { carritoPOS.push({ ...item, cantidad: 1 }); }

  renderizarCarritoPOS();
}

function renderizarCarritoPOS() {
  const container = document.getElementById('cartItemsList');
  if (!container) return;
  if (carritoPOS.length === 0) {
    container.innerHTML = '<p class="empty-msg">No hay ítems agregados</p>';
    calcularTotalesPOS();
    return;
  }

  container.innerHTML = carritoPOS.map((item, index) => `
    <div class="cart-item">
      <div>
        <strong>${item.nombre}</strong><br>
        <small>$${item.precio.toFixed(2)} x ${item.cantidad}</small>
      </div>
      <div>
        <strong>$${(item.precio * item.cantidad).toFixed(2)}</strong>
        <button class="btn btn-danger" style="padding:2px 6px;" onclick="quitarDelCarrito(${index})">&times;</button>
      </div>
    </div>
  `).join('');

  calcularTotalesPOS();
}

function quitarDelCarrito(index) {
  carritoPOS.splice(index, 1);
  renderizarCarritoPOS();
}

function calcularTotalesPOS() {
  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const elTotal = document.getElementById('posTotal');
  if (elTotal) elTotal.innerText = `$${total.toFixed(2)}`;
  calcularVuelto();
}

function toggleSeccionEfectivo() {
  const metodo = document.getElementById('posMetodoPago').value;
  const seccion = document.getElementById('seccionEfectivo');
  if (seccion) {
    seccion.style.display = (metodo === 'Efectivo') ? 'block' : 'none';
  }
}

function calcularVuelto() {
  const metodo = document.getElementById('posMetodoPago').value;
  if (metodo !== 'Efectivo') return;

  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const efectivoRecibido = parseFloat(document.getElementById('posEfectivoRecibido').value) || 0;
  const vuelto = efectivoRecibido - total;

  const lblVuelto = document.getElementById('posVuelto');
  if (lblVuelto) {
    if (vuelto >= 0) {
      lblVuelto.innerText = `$${vuelto.toFixed(2)}`;
      lblVuelto.style.color = 'var(--emerald)';
    } else {
      lblVuelto.innerText = `Faltan $${Math.abs(vuelto).toFixed(2)}`;
      lblVuelto.style.color = 'var(--danger)';
    }
  }
}

function procesarPagoPOS() {
  if (carritoPOS.length === 0) return alert('El carrito está vacío');

  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const metodoPago = document.getElementById('posMetodoPago').value;

  let efectivoRecibido = 0;
  let vuelto = 0;

  if (metodoPago === 'Efectivo') {
    efectivoRecibido = parseFloat(document.getElementById('posEfectivoRecibido').value) || 0;
    if (efectivoRecibido < total) {
      alert('El efectivo recibido es menor al total a pagar.');
      return;
    }
    vuelto = efectivoRecibido - total;
  }

  const venta = {
    id: 'v_' + Date.now(),
    sucursalId: appData.sucursalActiva,
    fecha: new Date().toISOString().split('T')[0],
    clienteId: document.getElementById('posCliente').value || null,
    estilistaId: document.getElementById('posEstilista').value,
    metodoPago: metodoPago,
    efectivoRecibido: metodoPago === 'Efectivo' ? efectivoRecibido : null,
    vuelto: metodoPago === 'Efectivo' ? vuelto : null,
    items: [...carritoPOS],
    total
  };

  carritoPOS.forEach(cItem => {
    if (cItem.tipo === 'producto') {
      const prod = appData.productos.find(p => p.id === cItem.id);
      if (prod) prod.stock = Math.max(0, prod.stock - cItem.cantidad);
    } else if (cItem.tipo === 'servicio') {
      const serv = appData.servicios.find(s => s.id === cItem.id);
      if (serv) serv.usosCount = (serv.usosCount || 0) + cItem.cantidad;
    }
  });

  appData.ventas.push(venta);
  guardarDatos();
  mostrarTicket(venta);
  agradecerPorWhatsApp(venta.clienteId);

  carritoPOS = [];
  const inpEfectivo = document.getElementById('posEfectivoRecibido');
  if (inpEfectivo) inpEfectivo.value = '';
  const lblVuelto = document.getElementById('posVuelto');
  if (lblVuelto) lblVuelto.innerText = '$0.00';
  renderizarCarritoPOS();
}

function agradecerPorWhatsApp(clienteId) {
  const cliente = appData.clientes.find(c => c.id === clienteId);
  if (!cliente || !cliente.telefono) return;

  const sucursal = appData.sucursales.find(s => s.id === appData.sucursalActiva);
  const nombreSucursal = sucursal ? sucursal.nombre : 'Leguend Barber Studio';

  let tel = cliente.telefono.replace(/\D/g, '');
  if (tel.startsWith('09') && tel.length === 10) tel = '593' + tel.slice(1);

  const texto = `¡Hola ${cliente.nombre}! Gracias por confiar en nosotros y visitarnos en ${nombreSucursal}. ✂️`;
  window.open(`https://wa.me/${tel}?text=${encodeURIComponent(texto)}`, '_blank');
}

function mostrarTicket(venta) {
  const sucursal = appData.sucursales.find(s => s.id === venta.sucursalId)?.nombre || '';
  const cliente = appData.clientes.find(c => c.id === venta.clienteId)?.nombre || 'General';
  const estilista = appData.estilistas.find(e => e.id === venta.estilistaId)?.nombre || 'General';

  document.getElementById('ticketSucursal').innerText = sucursal;
  document.getElementById('ticketFechaHora').innerText = venta.fecha || new Date().toLocaleString();
  document.getElementById('ticketCliente').innerText = cliente;
  document.getElementById('ticketEstilista').innerText = estilista;
  document.getElementById('ticketMetodo').innerText = venta.metodoPago;
  document.getElementById('ticketTotal').innerText = venta.total.toFixed(2);

  const efectivoContainer = document.getElementById('ticketEfectivoContainer');
  if (venta.metodoPago === 'Efectivo' && venta.efectivoRecibido != null) {
    document.getElementById('ticketEfectivo').innerText = venta.efectivoRecibido.toFixed(2);
    document.getElementById('ticketVuelto').innerText = venta.vuelto.toFixed(2);
    efectivoContainer.style.display = 'block';
  } else {
    efectivoContainer.style.display = 'none';
  }

  document.getElementById('ticketDetalles').innerHTML = venta.items.map(i => `
    <div style="display:flex; justify-content:space-between;">
      <span>${i.cantidad}x ${i.nombre}</span>
      <span>$${(i.precio * i.cantidad).toFixed(2)}</span>
    </div>
  `).join('');

  abrirModal('modalTicket');
}

function reimprimirTicket(ventaId) {
  const venta = appData.ventas.find(v => v.id === ventaId);
  if (venta) {
    mostrarTicket(venta);
  } else {
    alert('Factura no encontrada');
  }
}

// ESTILISTAS
function calcularEstadisticasEstilista(estilistaId) {
  let totalServicios = 0;
  let totalGanancias = 0;

  appData.ventas.forEach(v => {
    if (v.estilistaId === estilistaId && Array.isArray(v.items)) {
      v.items.forEach(item => {
        if (item.tipo === 'servicio') {
          totalServicios += (item.cantidad || 1);
        }
      });
      totalGanancias += (v.total || 0);
    }
  });

  return { totalServicios, totalGanancias };
}

function renderizarEstilistas() {
  const container = document.getElementById('listaEstilistas');
  if (!container) return;
  const estilistasSucursal = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);

  if (estilistasSucursal.length === 0) {
    container.innerHTML = `
      <div class="card text-center" style="grid-column: 1 / -1; padding: 2rem;">
        <p style="color: var(--text-secondary);">No hay estilistas registrados en esta sucursal.</p>
      </div>`;
    return;
  }

  const totalServiciosSucursal = estilistasSucursal.reduce((acc, est) => {
    return acc + calcularEstadisticasEstilista(est.id).totalServicios;
  }, 0);

  container.innerHTML = estilistasSucursal.map(e => {
    const stats = calcularEstadisticasEstilista(e.id);
    const porcentajeParticipacion = totalServiciosSucursal > 0 
      ? Math.round((stats.totalServicios / totalServiciosSucursal) * 100) 
      : 0;

    return `
      <div class="card text-center">
        <i class="fa-solid fa-circle-user" style="font-size:3rem; color: var(--accent);"></i>
        <h3 style="margin-top:0.5rem;">${e.nombre}</h3>
        <p style="color:var(--text-secondary); font-size:0.85rem;">Cédula: ${e.cedula || 'N/A'}</p>
        <p style="color:var(--text-secondary); font-size:0.85rem;">Nacimiento: ${e.nacimiento || 'N/A'}</p>
        
        <div style="background: var(--bg-primary); padding: 0.75rem; border-radius: 8px; margin: 0.75rem 0; border: 1px solid var(--border-color); text-align: left;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span style="color: var(--text-secondary);">Servicios realizados:</span>
            <strong>${stats.totalServicios} (${porcentajeParticipacion}%)</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-secondary);">Ganancias generadas:</span>
            <strong style="color: var(--emerald);">$${stats.totalGanancias.toFixed(2)}</strong>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:0.5rem; display: flex; justify-content: flex-end; align-items: center;">
          <div style="display: flex; gap: 0.25rem;">
            <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalEstilista('${e.id}')" title="Editar Estilista">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarEstilista('${e.id}')" title="Eliminar Estilista">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function exportarEstilistasExcel() {
  const estilistasSucursal = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);
  if (!estilistasSucursal || estilistasSucursal.length === 0) {
    alert('No hay estilistas registrados en esta sucursal para exportar.');
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Nombre;Cédula;Fecha de Nacimiento;Servicios Realizados;Ganancias Generadas ($)\n";

  estilistasSucursal.forEach(e => {
    const stats = calcularEstadisticasEstilista(e.id);
    const nombre = `"${(e.nombre || '').replace(/"/g, '""')}"`;
    const cedula = `"${(e.cedula || 'N/A').replace(/"/g, '""')}"`;
    const nacimiento = `"${(e.nacimiento || 'N/A').replace(/"/g, '""')}"`;
    const servicios = stats.totalServicios;
    const ganancias = stats.totalGanancias.toFixed(2);

    csvContent += `${nombre};${cedula};${nacimiento};${servicios};${ganancias}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sucursalActual = appData.sucursales.find(s => s.id === appData.sucursalActiva)?.nombre || 'Sucursal';
  const fechaHoy = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Estilistas_${sucursalActual.replace(/\s+/g, '_')}_${fechaHoy}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

function abrirModalEstilista(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const titulo = document.getElementById('modalEstilistaTitulo');
  if (id) {
    titulo.innerText = 'Editar Estilista';
    const estilista = appData.estilistas.find(e => e.id === id);
    if (estilista) {
      document.getElementById('estilistaId').value = estilista.id;
      document.getElementById('estilistaNombre').value = estilista.nombre;
      document.getElementById('estilistaCedula').value = estilista.cedula || '';
      document.getElementById('estilistaNacimiento').value = estilista.nacimiento || '';
    }
  } else {
    titulo.innerText = 'Registrar Estilista';
    document.getElementById('formEstilista').reset();
    document.getElementById('estilistaId').value = '';
  }
  abrirModal('modalEstilista');
}

function guardarEstilista(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const id = document.getElementById('estilistaId').value;
  const nombre = document.getElementById('estilistaNombre').value;
  const cedula = document.getElementById('estilistaCedula').value;
  const nacimiento = document.getElementById('estilistaNacimiento').value;

  if (id) {
    const estilista = appData.estilistas.find(e => e.id === id);
    if (estilista) {
      estilista.nombre = nombre;
      estilista.cedula = cedula;
      estilista.nacimiento = nacimiento;
    }
  } else {
    const nuevo = {
      id: 'e_' + Date.now(),
      sucursalId: appData.sucursalActiva,
      nombre,
      cedula,
      nacimiento
    };
    appData.estilistas.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalEstilista');
  renderizarEstilistas();
  poblarSelects();
}

function eliminarEstilista(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const estilista = appData.estilistas.find(e => e.id === id);
  const nombre = estilista ? estilista.nombre : 'este estilista';

  if (confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
    appData.estilistas = appData.estilistas.filter(e => e.id !== id);
    guardarDatos();
    renderizarEstilistas();
    poblarSelects();
  }
}

// INVENTARIO & SERVICIOS
function cambiarTabInventario(tab, btn) {
  document.querySelectorAll('#mod-inventario .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'productos') {
    document.getElementById('submod-productos').style.display = 'block';
    document.getElementById('submod-servicios').style.display = 'none';
  } else {
    document.getElementById('submod-productos').style.display = 'none';
    document.getElementById('submod-servicios').style.display = 'block';
    renderizarServiciosInventario();
  }
}

function renderizarInventario() {
  const tbody = document.getElementById('listaProductos');
  if (!tbody) return;
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const stockMaxRef = 50;

  tbody.innerHTML = prodsSucursal.map(p => {
    const fecha = p.fechaCreacion || 'N/A';
    const porcentaje = Math.min(100, Math.round((p.stock / stockMaxRef) * 100));
    const esBajo = p.stock <= 5;
    const barClass = esBajo ? 'bg-danger' : (porcentaje < 40 ? 'bg-amber' : 'bg-emerald');

    return `
      <tr>
        <td><strong>${p.nombre}</strong></td>
        <td>${p.categoria}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${fecha}</td>
        <td>
          <div class="stock-container">
            <span class="stock-num">${p.stock} u. (${porcentaje}%)</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill ${barClass}" style="width: ${porcentaje}%;"></div>
            </div>
          </div>
        </td>
        <td>
          ${esBajo 
            ? '<span class="badge-status badge-Cancelada"><i class="fa-solid fa-triangle-exclamation"></i> Bajo (≤5)</span>' 
            : '<span class="badge-status badge-Completada">OK</span>'}
        </td>
        <td>
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalProducto('${p.id}')" title="Editar Producto">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarProducto('${p.id}')" title="Eliminar Producto">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  renderizarServiciosInventario();
}

function comprobarAvisoCompraInventario() {
  const prodsBajos = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva && p.stock <= 5);
  if (prodsBajos.length > 0) {
    const listaHtml = prodsBajos.map(p => `
      <li style="padding: 8px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        <span><strong>${p.nombre}</strong> (${p.categoria})</span>
        <span class="badge-status badge-Cancelada">Quedan ${p.stock} unid.</span>
      </li>
    `).join('');
    
    document.getElementById('listaAvisoCompraProductos').innerHTML = listaHtml;
    abrirModal('modalAvisoCompra');
  }
}

function eliminarProducto(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    appData.productos = appData.productos.filter(p => p.id !== id);
    guardarDatos();
    renderizarInventario();
  }
}

function renderizarServiciosInventario() {
  const tbody = document.getElementById('listaServiciosInventario');
  if (!tbody) return;

  tbody.innerHTML = appData.servicios.map(s => {
    const fecha = s.fechaCreacion || 'N/A';
    const usos = s.usosCount || 0;
    return `
      <tr>
        <td><strong>${s.nombre}</strong></td>
        <td>$${s.precio.toFixed(2)}</td>
        <td>${fecha}</td>
        <td>
          <span class="badge-status badge-Confirmada"><i class="fa-solid fa-chart-line"></i> ${usos} usos</span>
        </td>
        <td>${s.tipo.toUpperCase()}</td>
        <td>
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalServicio('${s.id}')" title="Editar Servicio">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarServicio('${s.id}')" title="Eliminar Servicio">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function eliminarServicio(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (confirm('¿Estás seguro de eliminar este servicio?')) {
    appData.servicios = appData.servicios.filter(s => s.id !== id);
    guardarDatos();
    renderizarServiciosInventario();
    renderizarPOS();
  }
}

// CLIENTES (SIN EMAIL)
function calcularServiciosCliente(clienteId) {
  let contador = 0;
  appData.ventas.forEach(v => {
    if (v.clienteId === clienteId && Array.isArray(v.items)) {
      v.items.forEach(item => {
        if (item.tipo === 'servicio') {
          contador += (item.cantidad || 1);
        }
      });
    }
  });
  return contador;
}

function renderizarClientes() {
  const tbody = document.getElementById('listaClientes');
  if (!tbody) return;
  const busqueda = document.getElementById('buscarCliente').value.toLowerCase();
  const filtroFecha = document.getElementById('filtroFechaCreacion').value;

  const filtrados = appData.clientes.filter(c => {
    const coincideTexto = c.nombre.toLowerCase().includes(busqueda) || c.telefono.includes(busqueda);
    const coincideFecha = filtroFecha ? c.fechaCreacion === filtroFecha : true;
    return coincideTexto && coincideFecha;
  });

  tbody.innerHTML = filtrados.map(c => {
    const totalServicios = calcularServiciosCliente(c.id);
    const metaCortes = 8;
    const pctInt = Math.min(100, Math.round((totalServicios / metaCortes) * 100));
    const esGratis = totalServicios >= metaCortes;

    let badgeFidelidad = '';
    if (esGratis) {
      badgeFidelidad = `
        <button class="btn-loyalty-green" onclick="enviarSmsGratisWhatsApp('${c.id}')" title="¡Corte Gratis Alcanzado! Click para enviar WhatsApp">
          <i class="fa-brands fa-whatsapp"></i> ${pctInt}% (${totalServicios}/${metaCortes}) ¡Corte Gratis!
        </button>`;
    } else {
      badgeFidelidad = `
        <span class="badge-loyalty-progress">
          ${pctInt}% (${totalServicios}/${metaCortes})
        </span>`;
    }

    return `
      <tr>
        <td><strong>${c.nombre}</strong></td>
        <td>${c.telefono}</td>
        <td>${c.nacimiento || 'N/A'}</td>
        <td>${c.fechaCreacion || 'N/A'}</td>
        <td>${badgeFidelidad}</td>
        <td>${c.notas || '-'}</td>
        <td>
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalCliente('${c.id}')" title="Editar Cliente">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarCliente('${c.id}')" title="Eliminar Cliente">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function enviarSmsGratisWhatsApp(clienteId) {
  const cli = appData.clientes.find(c => c.id === clienteId);
  if (!cli) return;

  const numLimpio = cli.telefono.replace(/\D/g, '');
  const mensaje = `¡Hola ${cli.nombre}! 🎉 En Leguend Barber Studio queremos premiar tu preferencia. Has completado tus 10 servicios acumulados y ¡ya tienes un CORTE TOTALMENTE GRATIS! ✂️🔥 Visítanos en tu sucursal más cercana para reclamar tu premio.`;
  const urlWs = `https://wa.me/${numLimpio}?text=${encodeURIComponent(mensaje)}`;

  window.open(urlWs, '_blank');
}

function eliminarCliente(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    appData.clientes = appData.clientes.filter(c => c.id !== id);
    guardarDatos();
    renderizarClientes();
  }
}

// EXPORTAR CLIENTES A EXCEL (SIN EMAIL)
function exportarClientesExcel() {
  if (!appData.clientes || appData.clientes.length === 0) {
    alert('No hay clientes registrados para exportar.');
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Nombre;Teléfono;Fecha de Nacimiento;Fecha de Creación;Servicios Realizados;Notas\n";

  appData.clientes.forEach(c => {
    const totalServ = calcularServiciosCliente(c.id);
    const nombre = `"${(c.nombre || '').replace(/"/g, '""')}"`;
    const telefono = `"${(c.telefono || '').replace(/"/g, '""')}"`;
    const nacimiento = `"${(c.nacimiento || 'N/A').replace(/"/g, '""')}"`;
    const fechaCreacion = `"${(c.fechaCreacion || 'N/A').replace(/"/g, '""')}"`;
    const notas = `"${(c.notas || '-').replace(/"/g, '""')}"`;

    csvContent += `${nombre};${telefono};${nacimiento};${fechaCreacion};${totalServ};${notas}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fechaHoy = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Clientes_Peluqueria_${fechaHoy}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

function exportarVentasExcel() {
  const ventasSucursal = appData.ventas.filter(v => v.sucursalId === appData.sucursalActiva);
  if (!ventasSucursal || ventasSucursal.length === 0) {
    alert('No hay ventas registradas en esta sucursal para exportar.');
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Fecha;Cliente;Estilista;Método de Pago;Total ($)\n";

  ventasSucursal.forEach(v => {
    const cliente = appData.clientes.find(c => c.id === v.clienteId)?.nombre || 'Cliente Ocasional';
    const estilista = appData.estilistas.find(e => e.id === v.estilistaId)?.nombre || 'Sin Asignar';
    const fecha = `"${(v.fecha || '').replace(/"/g, '""')}"`;
    const cliNombre = `"${cliente.replace(/"/g, '""')}"`;
    const estNombre = `"${estilista.replace(/"/g, '""')}"`;
    const metodoPago = `"${(v.metodoPago || '').replace(/"/g, '""')}"`;
    const total = v.total.toFixed(2);

    csvContent += `${fecha};${cliNombre};${estNombre};${metodoPago};${total}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sucursalActual = appData.sucursales.find(s => s.id === appData.sucursalActiva)?.nombre || 'Sucursal';
  const fechaHoy = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Ventas_${sucursalActual.replace(/\s+/g, '_')}_${fechaHoy}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

// MODALES & AUXILIARES
function abrirModal(id) { document.getElementById(id).classList.add('active'); }
function cerrarModal(id) { document.getElementById(id).classList.remove('active'); }

function abrirModalProducto(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const titulo = document.getElementById('modalProductoTitulo');
  if (id) {
    titulo.innerText = 'Editar Producto';
    const prod = appData.productos.find(p => p.id === id);
    if (prod) {
      document.getElementById('prodId').value = prod.id;
      document.getElementById('prodNombre').value = prod.nombre;
      document.getElementById('prodCategoria').value = prod.categoria;
      document.getElementById('prodPrecio').value = prod.precio;
      document.getElementById('prodStock').value = prod.stock;
    }
  } else {
    titulo.innerText = 'Agregar Producto';
    document.getElementById('formProducto').reset();
    document.getElementById('prodId').value = '';
  }
  abrirModal('modalProducto');
}

function abrirModalServicio(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const titulo = document.getElementById('modalServicioTitulo');
  if (id) {
    titulo.innerText = 'Editar Servicio';
    const serv = appData.servicios.find(s => s.id === id);
    if (serv) {
      document.getElementById('servId').value = serv.id;
      document.getElementById('servNombre').value = serv.nombre;
      document.getElementById('servPrecio').value = serv.precio;
    }
  } else {
    titulo.innerText = 'Agregar Servicio';
    document.getElementById('formServicio').reset();
    document.getElementById('servId').value = '';
  }
  abrirModal('modalServicio');
}

function abrirModalCliente(id = null) {
  if (id && !esSuperAdmin) return alert('Requiere permisos de Super Admin para editar clientes');

  const titulo = document.getElementById('modalClienteTitulo');
  if (id) {
    titulo.innerText = 'Editar Cliente';
    const cli = appData.clientes.find(c => c.id === id);
    if (cli) {
      document.getElementById('cliId').value = cli.id;
      document.getElementById('cliNombre').value = cli.nombre;
      document.getElementById('cliTelefono').value = cli.telefono;
      document.getElementById('cliNacimiento').value = cli.nacimiento || '';
      document.getElementById('cliNotas').value = cli.notas || '';
    }
  } else {
    titulo.innerText = 'Registrar Cliente';
    document.getElementById('formCliente').reset();
    document.getElementById('cliId').value = '';
  }
  abrirModal('modalCliente');
}

function abrirModalSucursal() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  abrirModal('modalSucursal');
}

function poblarSelects() {
  const posCli = document.getElementById('posCliente');
  const posEst = document.getElementById('posEstilista');

  const estilistasSucursal = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);

  const cliOpt = appData.clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
  const estOpt = estilistasSucursal.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');

  if (posCli) posCli.innerHTML = `<option value="">Cliente Ocasional</option>` + cliOpt;
  if (posEst) posEst.innerHTML = `<option value="">Sin Asignar</option>` + estOpt;
}

function guardarProducto(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const id = document.getElementById('prodId').value;
  const nombre = document.getElementById('prodNombre').value;
  const categoria = document.getElementById('prodCategoria').value;
  const precio = parseFloat(document.getElementById('prodPrecio').value);
  const stock = parseInt(document.getElementById('prodStock').value);

  if (id) {
    const prod = appData.productos.find(p => p.id === id);
    if (prod) {
      prod.nombre = nombre;
      prod.categoria = categoria;
      prod.precio = precio;
      prod.stock = stock;
    }
  } else {
    const nuevo = {
      id: 'p_' + Date.now(),
      sucursalId: appData.sucursalActiva,
      nombre,
      categoria,
      precio,
      stock,
      fechaCreacion: new Date().toISOString().split('T')[0],
      tipo: 'producto'
    };
    appData.productos.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalProducto');
  renderizarInventario();
}

function guardarServicio(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const id = document.getElementById('servId').value;
  const nombre = document.getElementById('servNombre').value;
  const precio = parseFloat(document.getElementById('servPrecio').value);

  if (id) {
    const serv = appData.servicios.find(s => s.id === id);
    if (serv) {
      serv.nombre = nombre;
      serv.precio = precio;
    }
  } else {
    const nuevo = {
      id: 's_' + Date.now(),
      nombre,
      precio,
      fechaCreacion: new Date().toISOString().split('T')[0],
      usosCount: 0,
      tipo: 'servicio'
    };
    appData.servicios.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalServicio');
  renderizarServiciosInventario();
  renderizarPOS();
}

function guardarCliente(e) {
  e.preventDefault();

  const id = document.getElementById('cliId').value;
  if (id && !esSuperAdmin) {
    return alert('Requiere permisos de Super Admin para modificar información de un cliente existente.');
  }

  const nombre = document.getElementById('cliNombre').value;
  const telefono = document.getElementById('cliTelefono').value;
  const nacimiento = document.getElementById('cliNacimiento').value;
  const notas = document.getElementById('cliNotas').value;

  if (id) {
    const cli = appData.clientes.find(c => c.id === id);
    if (cli) {
      cli.nombre = nombre;
      cli.telefono = telefono;
      cli.nacimiento = nacimiento;
      cli.notas = notas;
    }
  } else {
    const nuevo = {
      id: 'c_' + Date.now(),
      nombre,
      telefono,
      nacimiento,
      fechaCreacion: new Date().toISOString().split('T')[0],
      notas
    };
    appData.clientes.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalCliente');
  renderizarClientes();
  poblarSelects();
}

function setupTema() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
  });
}