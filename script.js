const SUPABASE_URL = 'https://rsfkxwopwtcyjpkstpmp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hJFsLmxBducinC6pH-hDQw_Uxyj24eZ';

let supabaseClient = null;

let appData = {
  sucursalActiva: 'suc_1',
  sucursales: [],
  estilistas: [],
  servicios: [],
  productos: [],
  clientes: [],
  ventas: []
};

let esSuperAdmin = false;
const META_SERVICIOS_GRATIS = 8;

async function cargarDatosDesdeSupabase() {
  try {
    if (typeof supabase !== 'undefined') {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
      console.error("El SDK de Supabase não está cargado.");
      return;
    }

    const [resSuc, resEst, resServ, resProd, resCli, resVentas] = await Promise.all([
      supabaseClient.from('sucursales').select('*'),
      supabaseClient.from('estilistas').select('*'),
      supabaseClient.from('servicios').select('*'),
      supabaseClient.from('productos').select('*'),
      supabaseClient.from('clientes').select('*'),
      supabaseClient.from('ventas').select('*')
    ]);

    if (resSuc.error) throw resSuc.error;

    if (!resSuc.data || resSuc.data.length === 0) {
      await inicializarDatosDefault();
      return cargarDatosDesdeSupabase();
    }

    appData.sucursales = resSuc.data;
    appData.sucursalActiva = appData.sucursalActiva || appData.sucursales[0]?.id;
    appData.estilistas = (resEst.data || []).map(e => ({ ...e, sucursalId: e.sucursal_id }));
    appData.servicios = (resServ.data || []).map(s => ({ ...s, fechaCreacion: s.fecha_creacion, usosCount: s.usos_count }));
    appData.productos = (resProd.data || []).map(p => ({ ...p, sucursalId: p.sucursal_id, fechaCreacion: p.fecha_creacion }));
    
    appData.clientes = (resCli.data || []).map(c => {
      const localCount = parseInt(localStorage.getItem(`fidelidad_${c.id}`) || '0', 10);
      const dbCount = c.servicios_acumulados !== undefined && c.servicios_acumulados !== null ? c.servicios_acumulados : localCount;
      return { 
        ...c, 
        fechaCreacion: c.fecha_creacion,
        serviciosAcumulados: dbCount
      };
    });

    appData.ventas = (resVentas.data || []).map(v => ({ 
      ...v, 
      sucursalId: v.sucursal_id, 
      clienteId: v.cliente_id, 
      estilistaId: v.estilista_id, 
      metodoPago: v.metodo_pago, 
      efectivoRecibido: v.efectivo_recibido 
    }));

  } catch (error) {
    console.error('Error al conectar con Supabase:', error.message);
  }
}

async function inicializarDatosDefault() {
  const defaultSucursales = [
    { id: 'suc_1', nombre: 'Sucursal Central', direccion: 'Av. Principal #101' },
    { id: 'suc_2', nombre: 'Sucursal Norte', direccion: 'Calle Comercial #45' },
    { id: 'suc_3', nombre: 'Sucursal Sur', direccion: 'Av. Las Palmas #88' }
  ];
  const defaultEstilistas = [
    { id: 'e1', sucursal_id: 'suc_1', nombre: 'Carlos Mendoza', cedula: '1712345678', nacimiento: '1988-03-12' },
    { id: 'e2', sucursal_id: 'suc_2', nombre: 'Ana Gómez', cedula: '1723456789', nacimiento: '1992-07-25' },
    { id: 'e3', sucursal_id: 'suc_3', nombre: 'Luis Torres', cedula: '1734567890', nacimiento: '1990-11-05' }
  ];
  const defaultServicios = [
    { id: 's1', nombre: 'Corte Caballero', precio: 12.00, tipo: 'servicio', fecha_creacion: '2026-01-05', usos_count: 42 },
    { id: 's2', nombre: 'Tinte & Peinado', precio: 35.00, tipo: 'servicio', fecha_creacion: '2026-01-08', usos_count: 18 },
    { id: 's3', nombre: 'Perfilado Barba', precio: 8.00, tipo: 'servicio', fecha_creacion: '2026-01-15', usos_count: 30 }
  ];
  const defaultProductos = [
    { id: 'p1', sucursal_id: 'suc_1', nombre: 'Cera Moldeadora', categoria: 'Capilar', precio: 15.00, stock: 8, tipo: 'producto', fecha_creacion: '2026-01-10' },
    { id: 'p2', sucursal_id: 'suc_2', nombre: 'Aceite para Barba', categoria: 'Barba', precio: 18.00, stock: 2, tipo: 'producto', fecha_creacion: '2026-01-12' },
    { id: 'p3', sucursal_id: 'suc_1', nombre: 'Shampoo Especial', categoria: 'Capilar', precio: 22.00, stock: 4, tipo: 'producto', fecha_creacion: '2026-02-01' }
  ];
  const defaultClientes = [
   { id: 'c_imp_1', nombre: 'Erick Morocho', telefono: '0963026507', nacimiento: '2017-10-23', fecha_creacion: '2026-10-05', notas: '' },
   { id: 'c_imp_2', nombre: 'Edwin Caguana', telefono: '0997046998', nacimiento: '2007-05-10', fecha_creacion: '2026-10-04', notas: '' }
  ];

  await supabaseClient.from('sucursales').insert(defaultSucursales);
  await supabaseClient.from('estilistas').insert(defaultEstilistas);
  await supabaseClient.from('servicios').insert(defaultServicios);
  await supabaseClient.from('productos').insert(defaultProductos);
  await supabaseClient.from('clientes').insert(defaultClientes);
}

let carritoPOS = [];
let moduloActual = 'pos';

document.addEventListener('DOMContentLoaded', async () => {
  setupNavegacion();
  setupTema();
  await cargarDatosDesdeSupabase();
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

  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.replaceWith(mobileBtn.cloneNode(true));
    document.getElementById('mobileMenuBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      if (sidebar) sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }
}

function abrirMenuMovil() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function cerrarMenuMovil() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

function activarPestana(btn, targetTab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  moduloActual = targetTab;
  renderizarModulo(moduloActual);
  cerrarMenuMovil();
}

async function validarPasswordSuperAdmin(e) {
  e.preventDefault();
  const inputPass = document.getElementById('superAdminPassInput').value.trim();

  if (!supabaseClient) {
    alert('Error: Supabase no inicializado.');
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('usuarios')
      .select('*')
      .eq('password', inputPass)
      .maybeSingle();

    if (error || !data) {
      alert('Contraseña incorrecta. Inténtalo de nuevo.');
      return;
    }

    esSuperAdmin = true;
    cerrarModal('modalSuperAdminAuth');
    actualizarVisibilidadBotonesAdmin();
    
    const superAdminBtn = document.querySelector('.nav-btn[data-tab="superadmin"]');
    activarPestana(superAdminBtn, 'superadmin');

  } catch (err) {
    console.error('Error al validar Super Admin:', err.message);
    alert('Ocurrió un error al verificar las credenciales.');
  }
}

function cerrarSesionSuperAdmin() {
  if (confirm('¿Deseas cerrar la sesión de Super Admin?')) {
    esSuperAdmin = false;
    actualizarVisibilidadBotonesAdmin();
    const posBtn = document.querySelector('.nav-btn[data-tab="pos"]');
    activarPestana(posBtn, 'pos');
  }
}

function actualizarVisibilidadBotonesAdmin() {
  document.querySelectorAll('.admin-only').forEach(el => {
    if (esSuperAdmin) el.classList.add('unlocked');
    else el.classList.remove('unlocked');
  });

  const badge = document.getElementById('badgeAdminActive');
  const btnCerrarHeader = document.getElementById('btnCerrarSuperAdmin');
  const icon = document.getElementById('adminStatusIcon');
  
  if (esSuperAdmin) {
    if (badge) badge.style.display = 'inline-flex';
    if (btnCerrarHeader) btnCerrarHeader.style.display = 'inline-flex';
    if (icon) { icon.className = 'fa-solid fa-lock-open'; icon.style.color = 'var(--emerald)'; }
  } else {
    if (badge) badge.style.display = 'none';
    if (btnCerrarHeader) btnCerrarHeader.style.display = 'none';
    if (icon) { icon.className = 'fa-solid fa-lock'; icon.style.color = ''; }
  }
}

function renderizarSucursales() {
  const select = document.getElementById('sucursalSelect');
  if (select) {
    select.innerHTML = appData.sucursales.map(s => `
      <option value="${s.id}" ${s.id === appData.sucursalActiva ? 'selected' : ''}>${s.nombre}</option>
    `).join('');
  }
}

function cambiarSucursal(id) {
  appData.sucursalActiva = id;
  renderizarModulo(moduloActual);
}

async function guardarSucursal(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const nueva = {
    id: 'suc_' + Date.now(),
    nombre: document.getElementById('sucursalNombre').value,
    direccion: document.getElementById('sucursalDireccion').value
  };
  await supabaseClient.from('sucursales').insert([nueva]);
  appData.sucursales.push(nueva);
  appData.sucursalActiva = nueva.id;
  cerrarModal('modalSucursal');
  renderizarSucursales();
  renderizarModulo(moduloActual);
}

async function eliminarSucursalActiva() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (appData.sucursales.length <= 1) return alert('No puedes eliminar la última sucursal.');

  if (confirm('¿Estás seguro de eliminar esta sucursal?')) {
    const idEliminar = appData.sucursalActiva;
    await supabaseClient.from('sucursales').delete().eq('id', idEliminar);
    appData.sucursales = appData.sucursales.filter(s => s.id !== idEliminar);
    appData.sucursalActiva = appData.sucursales[0].id;
    renderizarSucursales();
    renderizarModulo(moduloActual);
  }
}

function renderizarModulo(modulo) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
  const activeMod = document.getElementById(`mod-${modulo}`);
  if (activeMod) activeMod.classList.add('active');

  poblarSelects();
  if (modulo === 'pos') renderizarPOS();
  if (modulo === 'estilistas') renderizarEstilistas();
  if (modulo === 'inventario') {
    renderizarInventario();
    renderizarServiciosInventario();
  }
  if (modulo === 'clientes') renderizarClientes();
  if (modulo === 'superadmin') { 
    poblarFiltroReportesSucursal();
    renderizarSuperAdmin(); 
    renderizarDashboard(); 
    actualizarGraficosSuperAdmin();
  }
}

function renderizarDashboard() {
  const hoy = new Date().toISOString().split('T')[0];
  const ventasSuc = appData.ventas.filter(v => v.sucursalId === appData.sucursalActiva);
  const ingresosHoy = ventasSuc.filter(v => v.fecha === hoy).reduce((sum, v) => sum + v.total, 0);
  
  document.getElementById('dashIngresos').innerText = `$${ingresosHoy.toFixed(2)}`;
  document.getElementById('dashEstilistas').innerText = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva).length;
  document.getElementById('dashStockBajo').innerText = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva && p.stock <= 5).length;

  const tbodyVentas = document.getElementById('dashTablaVentas');
  if (tbodyVentas) {
    tbodyVentas.innerHTML = ventasSuc.length === 0 ? `<tr><td colspan="6" class="text-center">Sin facturas recientes</td></tr>` :
      ventasSuc.slice(-15).reverse().map(v => `
        <tr>
          <td>${v.fecha}</td>
          <td>${appData.clientes.find(c => c.id === v.clienteId)?.nombre || 'Ocasional'}</td>
          <td>${appData.estilistas.find(e => e.id === v.estilistaId)?.nombre || 'Sin Asignar'}</td>
          <td>${v.metodoPago}</td>
          <td><strong>$${v.total.toFixed(2)}</strong></td>
          <td><button class="btn btn-primary btn-sm" onclick="reimprimirTicket('${v.id}')"><i class="fa-solid fa-print"></i></button></td>
        </tr>
      `).join('');
  }
}

function cambiarSubmodSuperAdmin(tab, btn) {
  document.querySelectorAll('#mod-superadmin .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('submod-superadmin-global').style.display = tab === 'global' ? 'block' : 'none';
  document.getElementById('submod-superadmin-dashboard').style.display = tab === 'dashboard' ? 'block' : 'none';
  document.getElementById('submod-superadmin-reportes').style.display = tab === 'reportes' ? 'block' : 'none';
  if (tab === 'dashboard') renderizarDashboard();
  if (tab === 'reportes') actualizarGraficosSuperAdmin();
}

function poblarFiltroReportesSucursal() {
  const select = document.getElementById('filtroReporteSucursal');
  if (!select) return;
  select.innerHTML = `<option value="todas">🌐 Todas las Sucursales</option>` +
    appData.sucursales.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
}

function renderizarSuperAdmin() {
  const container = document.getElementById('superAdminContainer');
  if (!container) return;

  let totalCadena = appData.ventas.reduce((sum, v) => sum + v.total, 0);
  document.getElementById('gananciasTotalesCadena').innerText = `$${totalCadena.toFixed(2)}`;

  container.innerHTML = appData.sucursales.map(s => {
    const ventasSuc = appData.ventas.filter(v => v.sucursalId === s.id);
    const totalSucursal = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    const numEstilistas = appData.estilistas.filter(e => e.sucursalId === s.id).length;
    const productosSuc = appData.productos.filter(p => p.sucursalId === s.id);
    const stockBajoSuc = productosSuc.filter(p => p.stock <= 5).length;
    const totalStock = productosSuc.reduce((sum, p) => sum + p.stock, 0);

    return `
      <div class="card" style="border-left: 4px solid var(--accent); margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <h3><i class="fa-solid fa-store" style="color: var(--accent);"></i> ${s.nombre}</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-location-dot"></i> ${s.direccion || 'Sin dirección'}</p>
          </div>
          <div>
            <button class="btn btn-primary btn-sm" onclick="cambiarSucursalYVerPOS('${s.id}')">
              <i class="fa-solid fa-eye"></i> Gestionar Sucursal
            </button>
          </div>
        </div>

        <div class="kpi-grid" style="margin-bottom: 1rem;">
          <div class="kpi-card" style="padding: 0.75rem;">
            <div class="kpi-icon bg-emerald" style="width: 38px; height: 38px; font-size: 1rem;"><i class="fa-solid fa-dollar-sign"></i></div>
            <div class="kpi-info">
              <span>Ventas Totales</span>
              <h3 style="font-size: 1.1rem;">$${totalSucursal.toFixed(2)}</h3>
            </div>
          </div>
          <div class="kpi-card" style="padding: 0.75rem;">
            <div class="kpi-icon bg-purple" style="width: 38px; height: 38px; font-size: 1rem;"><i class="fa-solid fa-user-ninja"></i></div>
            <div class="kpi-info">
              <span>Estilistas</span>
              <h3 style="font-size: 1.1rem;">${numEstilistas}</h3>
            </div>
          </div>
          <div class="kpi-card" style="padding: 0.75rem;">
            <div class="kpi-icon bg-blue" style="width: 38px; height: 38px; font-size: 1rem;"><i class="fa-solid fa-boxes-stacked"></i></div>
            <div class="kpi-info">
              <span>Unidades en Stock</span>
              <h3 style="font-size: 1.1rem;">${totalStock} u.</h3>
            </div>
          </div>
          <div class="kpi-card" style="padding: 0.75rem;">
            <div class="kpi-icon bg-amber" style="width: 38px; height: 38px; font-size: 1rem;"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <div class="kpi-info">
              <span>Stock Bajo (&le; 5)</span>
              <h3 style="font-size: 1.1rem; color: ${stockBajoSuc > 0 ? 'var(--amber)' : 'inherit'};">${stockBajoSuc}</h3>
            </div>
          </div>
        </div>

        <details style="margin-top: 0.5rem; background: var(--bg-primary); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color);">
          <summary style="cursor: pointer; font-weight: 600; font-size: 0.9rem; color: var(--text-secondary);">Ver últimas 5 ventas de esta sucursal</summary>
          <div class="table-responsive" style="margin-top: 0.5rem;">
            <table class="data-table" style="font-size: 0.85rem;">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Estilista</th>
                  <th>Pago</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${ventasSuc.length === 0 ? `<tr><td colspan="5" class="text-center">Sin ventas registradas</td></tr>` : 
                  ventasSuc.slice(-5).reverse().map(v => `
                    <tr>
                      <td>${v.fecha}</td>
                      <td>${appData.clientes.find(c => c.id === v.clienteId)?.nombre || 'Ocasional'}</td>
                      <td>${appData.estilistas.find(e => e.id === v.estilistaId)?.nombre || 'General'}</td>
                      <td>${v.metodoPago}</td>
                      <td><strong>$${v.total.toFixed(2)}</strong></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    `;
  }).join('');
}

function cambiarSucursalYVerPOS(idSucursal) {
  appData.sucursalActiva = idSucursal;
  renderizarSucursales();
  const posBtn = document.querySelector('.nav-btn[data-tab="pos"]');
  activarPestana(posBtn, 'pos');
}

function actualizarGraficosSuperAdmin() {
  const fechaInicio = document.getElementById('reporteFechaInicio').value;
  const fechaFin = document.getElementById('reporteFechaFin').value;
  const filtroSucursal = document.getElementById('filtroReporteSucursal')?.value || 'todas';

  let ventasFiltradas = [...appData.ventas];
  if (filtroSucursal !== 'todas') {
    ventasFiltradas = ventasFiltradas.filter(v => v.sucursalId === filtroSucursal);
  }
  if (fechaInicio) {
    ventasFiltradas = ventasFiltradas.filter(v => v.fecha >= fechaInicio);
  }
  if (fechaFin) {
    ventasFiltradas = ventasFiltradas.filter(v => v.fecha <= fechaFin);
  }

  if (window.repChart1) window.repChart1.destroy();
  if (window.repChart2) window.repChart2.destroy();
  if (window.repChart3) window.repChart3.destroy();

  window.repChart1 = new Chart(document.getElementById('chartServiciosPopulares').getContext('2d'), {
    type: 'pie',
    data: { 
      labels: appData.servicios.map(s => s.nombre), 
      datasets: [{ 
        data: appData.servicios.map(s => s.usosCount || 0), 
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'] 
      }] 
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const estilistasSucursal = filtroSucursal === 'todas' 
    ? appData.estilistas 
    : appData.estilistas.filter(e => e.sucursalId === filtroSucursal);

  const ventasPorEstilista = estilistasSucursal.map(e => {
    return ventasFiltradas
      .filter(v => (v.estilistaId || v.estilista_id) === e.id)
      .reduce((sum, v) => sum + v.total, 0);
  });

  window.repChart2 = new Chart(document.getElementById('chartEstilistasVentas').getContext('2d'), {
    type: 'bar',
    data: { 
      labels: estilistasSucursal.map(e => e.nombre), 
      datasets: [{ 
        label: 'Ventas ($)', 
        data: ventasPorEstilista, 
        backgroundColor: '#3b82f6' 
      }] 
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const ventasPorFecha = {};
  ventasFiltradas.forEach(v => {
    ventasPorFecha[v.fecha] = (ventasPorFecha[v.fecha] || 0) + v.total;
  });

  const fechasOrdenadas = Object.keys(ventasPorFecha).sort();
  const totalesFechas = fechasOrdenadas.map(f => ventasPorFecha[f]);

  window.repChart3 = new Chart(document.getElementById('chartIngresosSemanales').getContext('2d'), {
    type: 'line',
    data: { 
      labels: fechasOrdenadas.length > 0 ? fechasOrdenadas : ['Sin datos'], 
      datasets: [{ 
        label: 'Ingresos ($)', 
        data: totalesFechas.length > 0 ? totalesFechas : [0], 
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.2
      }] 
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderizarPOS() {
  const grid = document.getElementById('posCatalogGrid');
  if (!grid) return;
  const prods = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  grid.innerHTML = [...appData.servicios, ...prods].map(i => `
    <div class="pos-item-card" onclick="agregarAlCarrito('${i.id}')">
      <strong>${i.nombre}</strong>
      <p>$${i.precio.toFixed(2)}</p>
    </div>
  `).join('');
  renderizarCarritoPOS();
}

function filtrarPOSCatalog(tipo, btn) {
  document.querySelectorAll('.pos-tabs .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('posCatalogGrid');
  const prods = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  let items = [...appData.servicios, ...prods];
  if (tipo !== 'todos') items = items.filter(i => i.tipo === tipo);
  grid.innerHTML = items.map(i => `
    <div class="pos-item-card" onclick="agregarAlCarrito('${i.id}')">
      <strong>${i.nombre}</strong>
      <p>$${i.precio.toFixed(2)}</p>
    </div>
  `).join('');
}

function agregarAlCarrito(id) {
  const prods = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const item = [...appData.servicios, ...prods].find(i => i.id === id);
  if (!item) return;
  const existe = carritoPOS.find(i => i.id === id);
  if (existe) existe.cantidad++;
  else carritoPOS.push({ ...item, cantidad: 1 });
  renderizarCarritoPOS();
}

function renderizarCarritoPOS() {
  const container = document.getElementById('cartItemsList');
  if (!container) return;
  if (carritoPOS.length === 0) {
    container.innerHTML = '<p class="empty-msg">No hay ítems</p>';
    document.getElementById('posTotal').innerText = '$0.00';
    return;
  }
  container.innerHTML = carritoPOS.map((i, idx) => `
    <div class="cart-item">
      <div><strong>${i.nombre}</strong><br><small>$${i.precio.toFixed(2)} x ${i.cantidad}</small></div>
      <div><strong>$${(i.precio * i.cantidad).toFixed(2)}</strong> <button class="btn btn-danger" style="padding:2px 6px;" onclick="quitarCarrito(${idx})">&times;</button></div>
    </div>
  `).join('');
  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  document.getElementById('posTotal').innerText = `$${total.toFixed(2)}`;
}

function quitarCarrito(idx) {
  carritoPOS.splice(idx, 1);
  renderizarCarritoPOS();
}

function toggleSeccionEfectivo() {
  const metodo = document.getElementById('posMetodoPago').value;
  document.getElementById('seccionEfectivo').style.display = metodo === 'Efectivo' ? 'block' : 'none';
}

function calcularVuelto() {
  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const efectivo = parseFloat(document.getElementById('posEfectivoRecibido').value) || 0;
  const vuelto = efectivo - total;
  document.getElementById('posVuelto').innerText = `$${Math.max(0, vuelto).toFixed(2)}`;
}

function formatearTelefonoWhatsApp(telefono) {
  if (!telefono) return '';
  let limpio = telefono.replace(/\D/g, '');
  if (limpio.startsWith('0') && limpio.length === 10) {
    limpio = '593' + limpio.substring(1);
  } else if (limpio.length === 9 && limpio.startsWith('9')) {
    limpio = '593' + limpio;
  }
  return limpio;
}

// Búsqueda dinámica de clientes en Caja & POS
function filtrarClientesPOS(query) {
  const dropdown = document.getElementById('posClientDropdown');
  if (!dropdown) return;

  const texto = query.toLowerCase().trim();
  
  if (texto === '') {
    dropdown.innerHTML = '';
    dropdown.classList.add('hidden');
    document.getElementById('posClienteIdSeleccionado').value = '';
    return;
  }

  const coincidencias = appData.clientes.filter(c => 
    c.nombre.toLowerCase().includes(texto) || (c.telefono && c.telefono.includes(texto))
  );

  if (coincidencias.length === 0) {
    dropdown.innerHTML = `<div class="client-dropdown-item" style="color: var(--text-secondary);">No se encontraron clientes</div>`;
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = coincidencias.map(c => {
    const acum = c.serviciosAcumulados || 0;
    const pct = Math.round((acum / META_SERVICIOS_GRATIS) * 100);
    const tag = acum >= META_SERVICIOS_GRATIS ? '🎁 ¡CORTE GRATIS!' : `${pct}% (${acum}/8)`;
    
    return `
      <div class="client-dropdown-item" onclick="seleccionarClientePOS('${c.id}', '${c.nombre.replace(/'/g, "\\'")}')">
        <span><strong>${c.nombre}</strong> (${c.telefono || 'S/N'})</span>
        <small style="opacity: 0.8;">[${tag}]</small>
      </div>
    `;
  }).join('');

  dropdown.classList.remove('hidden');
}

function seleccionarClientePOS(id, nombre) {
  document.getElementById('posBuscadorCliente').value = nombre;
  document.getElementById('posClienteIdSeleccionado').value = id;
  const dropdown = document.getElementById('posClientDropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  const buscador = document.getElementById('posBuscadorCliente');
  const dropdown = document.getElementById('posClientDropdown');
  if (buscador && dropdown && !buscador.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

async function actualizarFidelidadCliente(clienteId, nuevosServicios) {
  if (!clienteId) return false;
  const cliente = appData.clientes.find(c => c.id === clienteId);
  if (!cliente) return false;

  const actual = cliente.serviciosAcumulados || 0;
  const totalAcumulado = Math.min(META_SERVICIOS_GRATIS, actual + nuevosServicios);
  cliente.serviciosAcumulados = totalAcumulado;

  localStorage.setItem(`fidelidad_${clienteId}`, totalAcumulado.toString());
  try {
    await supabaseClient
      .from('clientes')
      .update({ servicios_acumulados: totalAcumulado })
      .eq('id', clienteId);
  } catch (err) {
    console.warn('No se pudo actualizar servicios_acumulados en Supabase:', err.message);
  }

  poblarSelects();
  if (moduloActual === 'clientes') renderizarClientes();

  return totalAcumulado >= META_SERVICIOS_GRATIS;
}

async function canjearCorteGratis(clienteId) {
  const cliente = appData.clientes.find(c => c.id === clienteId);
  if (!cliente) return;

  if (confirm(`¿Confirmas que ${cliente.nombre} ya canjeó su CORTE GRATIS? Su barra volverá a 0%.`)) {
    cliente.serviciosAcumulados = 0;
    localStorage.setItem(`fidelidad_${clienteId}`, '0');
    try {
      await supabaseClient
        .from('clientes')
        .update({ servicios_acumulados: 0 })
        .eq('id', clienteId);
    } catch (err) {
      console.warn('Error al reiniciar fidelidad en BD:', err.message);
    }
    renderizarClientes();
    poblarSelects();
  }
}

function enviarWhatsAppCorteGratis(clienteId) {
  const cliente = appData.clientes.find(c => c.id === clienteId);
  if (!cliente || !cliente.telefono) {
    alert('Este cliente no tiene un número de teléfono válido.');
    return;
  }

  const telefonoWA = formatearTelefonoWhatsApp(cliente.telefono);
  const mensaje = 
`🎉✂️ *¡FELICIDADES ${cliente.nombre.toUpperCase()}!* 💈🎉

Has completado tus *8 servicios (100%)* en *Leguend Barber Studio* y acabas de ganar un *¡CORTE COMPLETAMENTE GRATIS!* 🎁🔥

Presenta este mensaje en cualquiera de nuestras sucursales para reclamar tu premio en tu próxima visita. ¡Gracias por tu fidelidad! 🙌✨`;

  window.open(`https://wa.me/${telefonoWA}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

function enviarWhatsAppAgradecimiento(venta) {
  const clienteId = venta.clienteId || venta.cliente_id;
  const clienteObj = appData.clientes.find(c => c.id === clienteId);

  if (!clienteObj || !clienteObj.telefono) {
    console.warn('No se envió WhatsApp: Cliente ocasional o sin teléfono registrado.');
    return;
  }

  const telefonoWA = formatearTelefonoWhatsApp(clienteObj.telefono);
  if (!telefonoWA) return;

  const sucursalObj = appData.sucursales.find(s => s.id === (venta.sucursalId || venta.sucursal_id));
  const estilistaObj = appData.estilistas.find(e => e.id === (venta.estilistaId || venta.estilista_id));

  const nombreCliente = clienteObj.nombre;
  const nombreSucursal = sucursalObj ? sucursalObj.nombre : 'Leguend Barber Studio';
  const nombreEstilista = estilistaObj ? estilistaObj.nombre : 'Nuestro equipo';
  const metodo = venta.metodoPago || venta.metodo_pago;

  const acumulados = clienteObj.serviciosAcumulados || 0;
  const porcentaje = Math.round((acumulados / META_SERVICIOS_GRATIS) * 100);

  const detalleItems = (venta.items || [])
    .map(item => `• ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toFixed(2)})`)
    .join('\n');

  const textoFidelidad = acumulados >= META_SERVICIOS_GRATIS
    ? `\n🎁 *¡FELICIDADES! Completaste ${acumulados}/8 servicios (100%) y GANASTE UN CORTE GRATIS en tu próxima visita.* 🎉`
    : `\n⭐ *Progreso Corte Gratis:* ${acumulados}/8 servicios (${porcentaje}%)`;

  const mensaje = 
`✂️ *LEGUEND BARBER STUDIO* 💈
¡Hola *${nombreCliente}*! Muchas gracias por tu visita y preferencia. 🙌

Aquí tienes el resumen de tu atención en *${nombreSucursal}*:
📅 *Fecha:* ${venta.fecha}
💇‍♂️ *Atendido por:* ${nombreEstilista}

*Detalle:*
${detalleItems}

💳 *Método de pago:* ${metodo}
💵 *Total pagado:* $${venta.total.toFixed(2)}
${textoFidelidad}

¡Esperamos verte pronto de nuevo! ✨`;

  const url = `https://wa.me/${telefonoWA}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

async function procesarPagoPOS() {
  if (carritoPOS.length === 0) return alert('El carrito está vacío');
  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const clienteId = document.getElementById('posClienteIdSeleccionado').value || null;
  
  const cantidadServiciosComprados = carritoPOS
    .filter(item => item.tipo === 'servicio')
    .reduce((sum, item) => sum + item.cantidad, 0);

  const venta = {
    id: 'v_' + Date.now(),
    sucursal_id: appData.sucursalActiva,
    fecha: new Date().toISOString().split('T')[0],
    cliente_id: clienteId,
    estilista_id: document.getElementById('posEstilista').value || null,
    metodo_pago: document.getElementById('posMetodoPago').value,
    total,
    items: [...carritoPOS]
  };

  await supabaseClient.from('ventas').insert([venta]);
  
  const ventaLocal = { 
    ...venta, 
    sucursalId: venta.sucursal_id, 
    clienteId: venta.cliente_id, 
    estilistaId: venta.estilista_id, 
    metodoPago: venta.metodo_pago 
  };
  appData.ventas.push(ventaLocal);

  let ganoPremio = false;
  if (clienteId && cantidadServiciosComprados > 0) {
    ganoPremio = await actualizarFidelidadCliente(clienteId, cantidadServiciosComprados);
  } else if (clienteId) {
    const cli = appData.clientes.find(c => c.id === clienteId);
    ganoPremio = cli && (cli.serviciosAcumulados || 0) >= META_SERVICIOS_GRATIS;
  }
  
  mostrarTicket(ventaLocal, ganoPremio);
  enviarWhatsAppAgradecimiento(ventaLocal);

  carritoPOS = [];
  document.getElementById('posEfectivoRecibido').value = '';
  document.getElementById('posVuelto').innerText = '$0.00';
  if (document.getElementById('posBuscadorCliente')) document.getElementById('posBuscadorCliente').value = '';
  if (document.getElementById('posClienteIdSeleccionado')) document.getElementById('posClienteIdSeleccionado').value = '';
  renderizarCarritoPOS();
}

function mostrarTicket(v, ganoPremio = false) {
  document.getElementById('ticketSucursal').innerText = appData.sucursales.find(s => s.id === (v.sucursalId || v.sucursal_id))?.nombre || '';
  document.getElementById('ticketFechaHora').innerText = v.fecha;
  
  const clienteId = v.clienteId || v.cliente_id;
  const clienteObj = appData.clientes.find(c => c.id === clienteId);
  document.getElementById('ticketCliente').innerText = clienteObj?.nombre || 'General';
  document.getElementById('ticketEstilista').innerText = appData.estilistas.find(e => e.id === (v.estilistaId || v.estilista_id))?.nombre || 'General';
  document.getElementById('ticketMetodo').innerText = v.metodoPago || v.metodo_pago;
  document.getElementById('ticketTotal').innerText = v.total.toFixed(2);

  const btnWa = document.getElementById('btnTicketWhatsapp');
  if (btnWa) {
    if (clienteObj && clienteObj.telefono) {
      btnWa.style.display = 'inline-flex';
      btnWa.onclick = () => enviarWhatsAppAgradecimiento(v);
    } else {
      btnWa.style.display = 'none';
    }
  }

  const btnPremioWa = document.getElementById('btnTicketPremioWhatsapp');
  const tienePremio = ganoPremio || (clienteObj && (clienteObj.serviciosAcumulados || 0) >= META_SERVICIOS_GRATIS);
  if (btnPremioWa) {
    if (clienteObj && clienteObj.telefono && tienePremio) {
      btnPremioWa.style.display = 'inline-flex';
      btnPremioWa.onclick = () => enviarWhatsAppCorteGratis(clienteObj.id);
    } else {
      btnPremioWa.style.display = 'none';
    }
  }

  abrirModal('modalTicket');
}

function reimprimirTicket(id) {
  const v = appData.ventas.find(x => x.id === id);
  if (v) mostrarTicket(v);
}

function renderizarEstilistas() {
  const container = document.getElementById('listaEstilistas');
  if (!container) return;
  const estSuc = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);
  container.innerHTML = estSuc.length === 0 ? '<p>No hay estilistas.</p>' : estSuc.map(e => `
    <div class="card text-center">
      <h3>${e.nombre}</h3>
      <p>Cédula: ${e.cedula || 'N/A'}</p>
      <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 0.75rem;">
        <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalEstilista('${e.id}')" title="Editar Estilista">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarEstilista('${e.id}')" title="Eliminar Estilista">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

async function guardarEstilista(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const id = document.getElementById('estilistaId').value;
  const nombre = document.getElementById('estilistaNombre').value;
  const cedula = document.getElementById('estilistaCedula').value;
  const nacimiento = document.getElementById('estilistaNacimiento').value;

  if (id) {
    await supabaseClient.from('estilistas').update({ nombre, cedula, nacimiento }).eq('id', id);
    const idx = appData.estilistas.findIndex(x => x.id === id);
    if (idx !== -1) appData.estilistas[idx] = { ...appData.estilistas[idx], nombre, cedula, nacimiento };
  } else {
    const nuevo = { id: 'e_' + Date.now(), sucursal_id: appData.sucursalActiva, nombre, cedula, nacimiento };
    await supabaseClient.from('estilistas').insert([nuevo]);
    appData.estilistas.push({ ...nuevo, sucursalId: nuevo.sucursal_id });
  }
  cerrarModal('modalEstilista');
  renderizarEstilistas();
  poblarSelects();
}

async function eliminarEstilista(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const est = appData.estilistas.find(e => e.id === id);
  if (!est) return;

  if (confirm(`¿Estás seguro de eliminar al estilista "${est.nombre}"?`)) {
    const { error } = await supabaseClient.from('estilistas').delete().eq('id', id);
    if (error) {
      alert('Error al eliminar el estilista: ' + error.message);
      return;
    }
    appData.estilistas = appData.estilistas.filter(e => e.id !== id);
    renderizarEstilistas();
    poblarSelects();
  }
}

function cambiarTabInventario(tab, btn) {
  document.querySelectorAll('#mod-inventario .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('submod-productos').style.display = tab === 'productos' ? 'block' : 'none';
  document.getElementById('submod-servicios').style.display = tab === 'servicios' ? 'block' : 'none';
  if (tab === 'servicios') renderizarServiciosInventario();
}

function renderizarInventario() {
  const tbody = document.getElementById('listaProductos');
  if (!tbody) return;
  tbody.innerHTML = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva).map(p => `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>${p.stock} u.</td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalProducto('${p.id}')" title="Editar Producto">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarProducto('${p.id}')" title="Eliminar Producto">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function guardarProducto(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const id = document.getElementById('prodId').value;
  const nombre = document.getElementById('prodNombre').value;
  const categoria = document.getElementById('prodCategoria').value;
  const precio = parseFloat(document.getElementById('prodPrecio').value);
  const stock = parseInt(document.getElementById('prodStock').value);

  if (id) {
    await supabaseClient.from('productos').update({ nombre, categoria, precio, stock }).eq('id', id);
    const idx = appData.productos.findIndex(x => x.id === id);
    if (idx !== -1) appData.productos[idx] = { ...appData.productos[idx], nombre, categoria, precio, stock };
  } else {
    const nuevo = { id: 'p_' + Date.now(), sucursal_id: appData.sucursalActiva, nombre, categoria, precio, stock, tipo: 'producto' };
    await supabaseClient.from('productos').insert([nuevo]);
    appData.productos.push({ ...nuevo, sucursalId: nuevo.sucursal_id });
  }
  cerrarModal('modalProducto');
  renderizarInventario();
}

async function eliminarProducto(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const prod = appData.productos.find(p => p.id === id);
  if (!prod) return;

  if (confirm(`¿Estás seguro de eliminar el producto "${prod.nombre}"?`)) {
    const { error } = await supabaseClient.from('productos').delete().eq('id', id);
    if (error) {
      alert('Error al eliminar el producto: ' + error.message);
      return;
    }
    appData.productos = appData.productos.filter(p => p.id !== id);
    renderizarInventario();
  }
}

function renderizarServiciosInventario() {
  const tbody = document.getElementById('listaServiciosInventario');
  if (!tbody) return;
  tbody.innerHTML = appData.servicios.map(s => `
    <tr>
      <td>${s.nombre}</td>
      <td>$${s.precio.toFixed(2)}</td>
      <td>${s.usosCount || 0} usos</td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalServicio('${s.id}')" title="Editar Servicio">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarServicio('${s.id}')" title="Eliminar Servicio">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function guardarServicio(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const id = document.getElementById('servId').value;
  const nombre = document.getElementById('servNombre').value;
  const precio = parseFloat(document.getElementById('servPrecio').value);

  if (id) {
    await supabaseClient.from('servicios').update({ nombre, precio }).eq('id', id);
    const idx = appData.servicios.findIndex(x => x.id === id);
    if (idx !== -1) appData.servicios[idx] = { ...appData.servicios[idx], nombre, precio };
  } else {
    const nuevo = { id: 's_' + Date.now(), nombre, precio, tipo: 'servicio' };
    await supabaseClient.from('servicios').insert([nuevo]);
    appData.servicios.push(nuevo);
  }
  cerrarModal('modalServicio');
  renderizarServiciosInventario();
}

async function eliminarServicio(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const serv = appData.servicios.find(s => s.id === id);
  if (!serv) return;

  if (confirm(`¿Estás seguro de eliminar el servicio "${serv.nombre}"?`)) {
    const { error } = await supabaseClient.from('servicios').delete().eq('id', id);
    if (error) {
      alert('Error al eliminar el servicio: ' + error.message);
      return;
    }
    appData.servicios = appData.servicios.filter(s => s.id !== id);
    renderizarServiciosInventario();
  }
}

function renderizarClientes() {
  const tbody = document.getElementById('listaClientes');
  if (!tbody) return;
  const busq = document.getElementById('buscarCliente').value.toLowerCase();
  
  tbody.innerHTML = appData.clientes
    .filter(c => c.nombre.toLowerCase().includes(busq) || (c.telefono && c.telefono.includes(busq)))
    .map(c => {
      const acumulados = Math.min(META_SERVICIOS_GRATIS, c.serviciosAcumulados || 0);
      const porcentaje = Math.round((acumulados / META_SERVICIOS_GRATIS) * 100);
      const completo = acumulados >= META_SERVICIOS_GRATIS;

      const barraColor = completo ? '#25d366' : (porcentaje >= 50 ? 'var(--amber)' : 'var(--accent)');

      const celdaFidelidad = `
        <div class="stock-container" style="min-width: 170px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="stock-num" style="color: ${completo ? '#25d366' : 'var(--text-primary)'};">
              ${porcentaje}% (${acumulados}/${META_SERVICIOS_GRATIS})
            </span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${porcentaje}%; background-color: ${barraColor};"></div>
          </div>
          ${completo ? `
            <div style="display: flex; gap: 0.4rem; margin-top: 6px; flex-wrap: wrap;">
              <button class="btn-loyalty-green" onclick="enviarWhatsAppCorteGratis('${c.id}')" title="Enviar aviso de Corte Gratis por WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> ¡Corte Gratis!
              </button>
              <button class="btn btn-secondary btn-sm" onclick="canjearCorteGratis('${c.id}')" title="Marcar premio como canjeado y reiniciar a 0%">
                <i class="fa-solid fa-rotate-left"></i> Canjear
              </button>
            </div>
          ` : ''}
        </div>
      `;

      return `
        <tr>
          <td><strong>${c.nombre}</strong></td>
          <td>${c.telefono}</td>
          <td>${celdaFidelidad}</td>
          <td>${c.nacimiento || 'N/A'}</td>
          <td>${c.notas || '-'}</td>
          <td>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-primary btn-sm" onclick="abrirModalCliente('${c.id}')" title="Editar Cliente">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarCliente('${c.id}')" title="Eliminar Cliente">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
}

async function guardarCliente(e) {
  e.preventDefault();
  const id = document.getElementById('cliId').value;
  const nombre = document.getElementById('cliNombre').value;
  const telefono = document.getElementById('cliTelefono').value;
  const serviciosAcumulados = Math.min(META_SERVICIOS_GRATIS, Math.max(0, parseInt(document.getElementById('cliServiciosAcumulados').value || '0', 10)));
  const nacimiento = document.getElementById('cliNacimiento').value;
  const notas = document.getElementById('cliNotas').value;

  if (id) {
    localStorage.setItem(`fidelidad_${id}`, serviciosAcumulados.toString());
    await supabaseClient.from('clientes').update({ nombre, telefono, nacimiento, notas, servicios_acumulados: serviciosAcumulados }).eq('id', id);
    const idx = appData.clientes.findIndex(c => c.id === id);
    if (idx !== -1) appData.clientes[idx] = { ...appData.clientes[idx], nombre, telefono, nacimiento, notas, serviciosAcumulados };
  } else {
    const nuevoId = 'c_' + Date.now();
    localStorage.setItem(`fidelidad_${nuevoId}`, serviciosAcumulados.toString());
    const nuevo = { id: nuevoId, nombre, telefono, nacimiento, notas, servicios_acumulados: serviciosAcumulados };
    await supabaseClient.from('clientes').insert([nuevo]);
    appData.clientes.push({ ...nuevo, serviciosAcumulados });
  }
  cerrarModal('modalCliente');
  renderizarClientes();
  poblarSelects();
}

async function eliminarCliente(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const cli = appData.clientes.find(c => c.id === id);
  if (!cli) return;

  if (confirm(`¿Estás seguro de eliminar al cliente "${cli.nombre}"?`)) {
    const { error } = await supabaseClient.from('clientes').delete().eq('id', id);
    if (error) {
      alert('Error al eliminar el cliente: ' + error.message);
      return;
    }
    localStorage.removeItem(`fidelidad_${id}`);
    appData.clientes = appData.clientes.filter(c => c.id !== id);
    renderizarClientes();
    poblarSelects();
  }
}

function abrirModal(id) { document.getElementById(id).classList.add('active'); }
function cerrarModal(id) { document.getElementById(id).classList.remove('active'); }

function abrirModalProducto(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos');
  document.getElementById('modalProductoTitulo').innerText = id ? 'Editar Producto' : 'Agregar Producto';
  if (id) {
    const p = appData.productos.find(x => x.id === id);
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodNombre').value = p.nombre;
    document.getElementById('prodCategoria').value = p.categoria;
    document.getElementById('prodPrecio').value = p.precio;
    document.getElementById('prodStock').value = p.stock;
  } else {
    document.getElementById('prodId').value = '';
    document.getElementById('prodNombre').value = '';
    document.getElementById('prodCategoria').value = '';
    document.getElementById('prodPrecio').value = '';
    document.getElementById('prodStock').value = '';
  }
  abrirModal('modalProducto');
}

function abrirModalServicio(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos');
  document.getElementById('modalServicioTitulo').innerText = id ? 'Editar Servicio' : 'Agregar Servicio';
  if (id) {
    const s = appData.servicios.find(x => x.id === id);
    document.getElementById('servId').value = s.id;
    document.getElementById('servNombre').value = s.nombre;
    document.getElementById('servPrecio').value = s.precio;
  } else {
    document.getElementById('servId').value = '';
    document.getElementById('servNombre').value = '';
    document.getElementById('servPrecio').value = '';
  }
  abrirModal('modalServicio');
}

function abrirModalCliente(id = null) {
  document.getElementById('modalClienteTitulo').innerText = id ? 'Editar Cliente' : 'Registrar Cliente';
  if (id) {
    const c = appData.clientes.find(x => x.id === id);
    document.getElementById('cliId').value = c.id;
    document.getElementById('cliNombre').value = c.nombre;
    document.getElementById('cliTelefono').value = c.telefono;
    document.getElementById('cliServiciosAcumulados').value = c.serviciosAcumulados || 0;
    document.getElementById('cliNacimiento').value = c.nacimiento || '';
    document.getElementById('cliNotas').value = c.notas || '';
  } else {
    document.getElementById('cliId').value = '';
    document.getElementById('cliNombre').value = '';
    document.getElementById('cliTelefono').value = '';
    document.getElementById('cliServiciosAcumulados').value = '0';
    document.getElementById('cliNacimiento').value = '';
    document.getElementById('cliNotas').value = '';
  }
  abrirModal('modalCliente');
}

function abrirModalEstilista(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos');
  document.getElementById('modalEstilistaTitulo').innerText = id ? 'Editar Estilista' : 'Registrar Estilista';
  if (id) {
    const e = appData.estilistas.find(x => x.id === id);
    document.getElementById('estilistaId').value = e.id;
    document.getElementById('estilistaNombre').value = e.nombre;
    document.getElementById('estilistaCedula').value = e.cedula;
    document.getElementById('estilistaNacimiento').value = e.nacimiento;
  } else {
    document.getElementById('estilistaId').value = '';
    document.getElementById('estilistaNombre').value = '';
    document.getElementById('estilistaCedula').value = '';
    document.getElementById('estilistaNacimiento').value = '';
  }
  abrirModal('modalEstilista');
}

function abrirModalSucursal() {
  if (!esSuperAdmin) return alert('Requiere permisos');
  abrirModal('modalSucursal');
}

function poblarSelects() {
  const posEst = document.getElementById('posEstilista');
  const estSuc = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);

  const buscadorCli = document.getElementById('posBuscadorCliente');
  const inputIdCli = document.getElementById('posClienteIdSeleccionado');
  if (buscadorCli) buscadorCli.value = '';
  if (inputIdCli) inputIdCli.value = '';

  if (posEst) {
    posEst.innerHTML = `<option value="">Sin Asignar</option>` + 
      estSuc.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');
  }
}

function setupTema() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
  });
}