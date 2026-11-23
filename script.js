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

const ENCABEZADOS_MODULO = {
  pos: {
    titulo: 'Punto de Venta - Caja',
    subtitulo: 'Facturación y cobranza'
  },
  clientes: {
    titulo: 'Gestión de Clientes',
    subtitulo: 'Directorio, fidelidad y recompensas'
  },
  estilistas: {
    titulo: 'Gestión de Estilistas',
    subtitulo: 'Equipo de trabajo de la sucursal'
  },
  inventario: {
    titulo: 'Inventario & Servicios',
    subtitulo: 'Control de productos y catálogo de servicios'
  },
  superadmin: {
    titulo: 'Panel Super Admin',
    subtitulo: 'Control multi-sucursal, facturación y reportes'
  }
};

function actualizarEncabezadoModulo(modulo) {
  const pageTitle = document.getElementById('pageTitle');
  const pageSubTitle = document.getElementById('pageSubTitle');
  const info = ENCABEZADOS_MODULO[modulo] || ENCABEZADOS_MODULO.pos;

  if (pageTitle) pageTitle.innerText = info.titulo;
  if (pageSubTitle) pageSubTitle.innerText = info.subtitulo;
}

async function cargarDatosDesdeSupabase() {
  try {
    if (typeof supabase !== 'undefined') {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
      console.error("El SDK de Supabase no está cargado.");
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

    // Selecciona 'suc_1' si existe; de lo contrario toma la primera sucursal disponible
    const suc1 = appData.sucursales.find(s => String(s.id) === 'suc_1');
    const activaValida = appData.sucursales.some(s => String(s.id) === String(appData.sucursalActiva));
    if (!activaValida) {
      appData.sucursalActiva = suc1 ? suc1.id : appData.sucursales[0]?.id;
    }

    let estilistasRaw = resEst.data || [];

    // Si no hay estilistas en la sucursal activa (o en suc_1), inserta por defecto de forma segura
    const idSucursal1 = suc1 ? suc1.id : appData.sucursalActiva;
    const tieneEstilistasSuc1 = estilistasRaw.some(
      e => String(e.sucursal_id ?? e.sucursalId ?? '') === String(idSucursal1)
    );

    if (!tieneEstilistasSuc1 && idSucursal1) {
      const defaultEstSuc1 = [
        {
          id: 'e_suc1_' + Date.now() + '_1',
          sucursal_id: idSucursal1,
          nombre: 'Carlos Mendoza',
          cedula: '1712345678',
          telefono: '0991112233',
          nacimiento: '1988-03-12'
        },
        {
          id: 'e_suc1_' + Date.now() + '_2',
          sucursal_id: idSucursal1,
          nombre: 'Javier Rojas',
          cedula: '1719876543',
          telefono: '0994445566',
          nacimiento: '1991-06-18'
        }
      ];

      const { data: insertados, error: errEst } = await supabaseClient
        .from('estilistas')
        .insert(defaultEstSuc1)
        .select();

      if (!errEst && Array.isArray(insertados) && insertados.length > 0) {
        estilistasRaw = [...estilistasRaw, ...insertados];
      } else {
        estilistasRaw = [...estilistasRaw, ...defaultEstSuc1];
      }
    }

    appData.estilistas = estilistasRaw.map(e => ({
      ...e,
      sucursalId: e.sucursal_id ?? e.sucursalId ?? idSucursal1,
      telefono: e.telefono || e.celular || e.phone || ''
    }));

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
    { id: 'e1', sucursal_id: 'suc_1', nombre: 'Carlos Mendoza', cedula: '1712345678', telefono: '0991112233', nacimiento: '1988-03-12' },
    { id: 'e2', sucursal_id: 'suc_2', nombre: 'Ana Gómez', cedula: '1723456789', telefono: '0992223344', nacimiento: '1992-07-25' },
    { id: 'e3', sucursal_id: 'suc_3', nombre: 'Luis Torres', cedula: '1734567890', telefono: '0993334455', nacimiento: '1990-11-05' }
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
  if (btn) btn.classList.add('active');
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
      <option value="${s.id}" ${String(s.id) === String(appData.sucursalActiva) ? 'selected' : ''}>${s.nombre}</option>
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
  actualizarEncabezadoModulo(modulo);

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
    poblarFiltroEstilistasAdminSucursal();
    renderizarSuperAdmin(); 
    renderizarDashboard(); 
    actualizarGraficosSuperAdmin();
    renderizarEstilistasSuperAdmin();
  }
}

function filtrarVentasPorRango(ventas, fechaInicio, fechaFin) {
  return ventas.filter(v => {
    if (fechaInicio && v.fecha < fechaInicio) return false;
    if (fechaFin && v.fecha > fechaFin) return false;
    return true;
  });
}

function limpiarFiltroFechas(seccion) {
  if (seccion === 'global') {
    const inicio = document.getElementById('globalFechaInicio');
    const fin = document.getElementById('globalFechaFin');
    if (inicio) inicio.value = '';
    if (fin) fin.value = '';
    renderizarSuperAdmin();
  } else if (seccion === 'dashboard') {
    const inicio = document.getElementById('dashFechaInicio');
    const fin = document.getElementById('dashFechaFin');
    if (inicio) inicio.value = '';
    if (fin) fin.value = '';
    renderizarDashboard();
  } else if (seccion === 'estilistas_admin') {
    const inicio = document.getElementById('estAdminFechaInicio');
    const fin = document.getElementById('estAdminFechaFin');
    if (inicio) inicio.value = '';
    if (fin) fin.value = '';
    renderizarEstilistasSuperAdmin();
  }
}

function renderizarDashboard() {
  const fechaInicio = document.getElementById('dashFechaInicio')?.value || '';
  const fechaFin = document.getElementById('dashFechaFin')?.value || '';
  const hayFiltroFecha = Boolean(fechaInicio || fechaFin);

  const ventasSucBase = appData.ventas.filter(v => String(v.sucursalId) === String(appData.sucursalActiva));
  const ventasSuc = hayFiltroFecha
    ? filtrarVentasPorRango(ventasSucBase, fechaInicio, fechaFin)
    : ventasSucBase;

  const hoy = new Date().toISOString().split('T')[0];
  const labelIngresos = document.getElementById('dashLabelIngresos');
  let montoIngresos = 0;

  if (hayFiltroFecha) {
    montoIngresos = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    if (labelIngresos) labelIngresos.innerText = 'Ingresos Filtrados (Sucursal Activa)';
  } else {
    montoIngresos = ventasSucBase.filter(v => v.fecha === hoy).reduce((sum, v) => sum + v.total, 0);
    if (labelIngresos) labelIngresos.innerText = 'Ingresos Hoy (Sucursal Activa)';
  }

  document.getElementById('dashIngresos').innerText = `$${montoIngresos.toFixed(2)}`;
  document.getElementById('dashEstilistas').innerText = appData.estilistas.filter(e => String(e.sucursalId) === String(appData.sucursalActiva)).length;
  document.getElementById('dashStockBajo').innerText = appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva) && p.stock <= 5).length;

  const tbodyVentas = document.getElementById('dashTablaVentas');
  if (tbodyVentas) {
    tbodyVentas.innerHTML = ventasSuc.length === 0
      ? `<tr><td colspan="6" class="text-center">Sin facturas en el rango seleccionado</td></tr>`
      : ventasSuc.slice().reverse().slice(0, 25).map(v => `
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

/* =========================================================
   CIERRE DE CAJA: GENERAR PDF CON TODAS LAS VENTAS Y ELIMINAR HISTORIAL
   ========================================================= */

function obtenerVentasParaCierre(alcance) {
  if (alcance === 'todas') {
    return [...appData.ventas];
  }
  return appData.ventas.filter(
    v => String(v.sucursalId ?? v.sucursal_id) === String(appData.sucursalActiva)
  );
}

function obtenerDescripcionAlcanceCierre(alcance) {
  if (alcance === 'todas') {
    return 'Todas las Sucursales';
  }
  const suc = appData.sucursales.find(s => String(s.id) === String(appData.sucursalActiva));
  return suc ? suc.nombre : `Sucursal (${appData.sucursalActiva})`;
}

function abrirModalCierreCaja() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const alcance = document.getElementById('alcanceCierreCaja')?.value || 'sucursal';
  const ventasCierre = obtenerVentasParaCierre(alcance);

  if (ventasCierre.length === 0) {
    return alert('No hay ventas registradas en el historial para realizar el cierre de caja.');
  }

  const totalCierre = ventasCierre.reduce((sum, v) => sum + Number(v.total || 0), 0);
  const ahora = new Date();
  const fechaHoy = ahora.toISOString().split('T')[0];
  const horaActual = ahora.toLocaleTimeString('es-EC', { hour12: false });

  document.getElementById('cierreResumenAlcance').innerText = obtenerDescripcionAlcanceCierre(alcance);
  document.getElementById('cierreResumenFechaHora').innerText = `${fechaHoy} ${horaActual}`;
  document.getElementById('cierreResumenCantidad').innerText = `${ventasCierre.length} venta(s)`;
  document.getElementById('cierreResumenTotal').innerText = `$${totalCierre.toFixed(2)}`;
  document.getElementById('cierreFechaInput').value = fechaHoy;
  document.getElementById('cierreObservaciones').value = '';

  abrirModal('modalCierreCaja');
}

function generarPDFCierreCaja({ ventas, alcanceTexto, fechaCierre, horaCierre, observaciones }) {
  const jsPDFClass = window.jspdf?.jsPDF;
  if (!jsPDFClass) {
    throw new Error('No se pudo cargar la librería jsPDF. Verifica tu conexión a internet.');
  }

  const doc = new jsPDFClass({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Encabezado
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('LEGUEND BARBER STUDIO - REPORTE DE CIERRE DE CAJA', 14, 12);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Alcance: ${alcanceTexto}`, 14, 21);
  doc.text(`Fecha de Cierre de Caja: ${fechaCierre}   |   Hora: ${horaCierre}`, pageWidth - 14, 21, { align: 'right' });

  // Resumen financiero
  const totalGeneral = ventas.reduce((sum, v) => sum + Number(v.total || 0), 0);
  const totalEfectivo = ventas
    .filter(v => String(v.metodoPago ?? v.metodo_pago).toLowerCase() === 'efectivo')
    .reduce((sum, v) => sum + Number(v.total || 0), 0);
  const totalTransferencia = ventas
    .filter(v => String(v.metodoPago ?? v.metodo_pago).toLowerCase() === 'transferencia')
    .reduce((sum, v) => sum + Number(v.total || 0), 0);
  const totalOtros = Math.max(0, totalGeneral - totalEfectivo - totalTransferencia);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN DE CAJA', 14, 36);

  doc.setFont('helvetica', 'normal');
  doc.text(`Total de Ventas: ${ventas.length}`, 14, 42);
  doc.text(`Efectivo: $${totalEfectivo.toFixed(2)}`, 68, 42);
  doc.text(`Transferencia: $${totalTransferencia.toFixed(2)}`, 118, 42);
  if (totalOtros > 0) {
    doc.text(`Otros: $${totalOtros.toFixed(2)}`, 178, 42);
  }
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL CIERRE: $${totalGeneral.toFixed(2)}`, pageWidth - 14, 42, { align: 'right' });

  let startYTable = 48;
  if (observaciones && observaciones.trim() !== '') {
    doc.setFont('helvetica', 'bold');
    doc.text('Observaciones:', 14, 48);
    doc.setFont('helvetica', 'normal');
    doc.text(observaciones.trim(), 42, 48);
    startYTable = 54;
  }

  // Filas de ventas
  const filas = ventas.map((v, idx) => {
    const sucId = v.sucursalId ?? v.sucursal_id;
    const cliId = v.clienteId ?? v.cliente_id;
    const estId = v.estilistaId ?? v.estilista_id;
    const metodo = v.metodoPago ?? v.metodo_pago ?? 'N/A';

    const sucNombre = appData.sucursales.find(s => String(s.id) === String(sucId))?.nombre || sucId || 'N/A';
    const cliNombre = appData.clientes.find(c => String(c.id) === String(cliId))?.nombre || 'Ocasional';
    const estNombre = appData.estilistas.find(e => String(e.id) === String(estId))?.nombre || 'Sin Asignar';
    const detalle = Array.isArray(v.items) && v.items.length > 0
      ? v.items.map(i => `${i.cantidad}x ${i.nombre} ($${Number(i.precio || 0).toFixed(2)})`).join(', ')
      : 'Sin detalle de ítems';

    return [
      String(idx + 1),
      v.fecha || '',
      sucNombre,
      cliNombre,
      estNombre,
      detalle,
      metodo,
      `$${Number(v.total || 0).toFixed(2)}`
    ];
  });

  if (typeof doc.autoTable === 'function') {
    doc.autoTable({
      startY: startYTable,
      head: [['#', 'Fecha Venta', 'Sucursal', 'Cliente', 'Estilista', 'Detalle', 'Método Pago', 'Total']],
      body: filas,
      foot: [['', '', '', '', '', '', 'TOTAL GENERAL:', `$${totalGeneral.toFixed(2)}`]],
      theme: 'grid',
      styles: { fontSize: 8.5, cellPadding: 2.5, overflow: 'linebreak' },
      headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
      footStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 24 },
        2: { cellWidth: 34 },
        3: { cellWidth: 36 },
        4: { cellWidth: 34 },
        5: { cellWidth: 85 },
        6: { cellWidth: 26 },
        7: { cellWidth: 26, halign: 'right' }
      }
    });
  } else {
    let y = startYTable + 6;
    doc.setFontSize(8.5);
    filas.forEach(f => {
      doc.text(`${f[0]} | ${f[1]} | ${f[2]} | ${f[3]} | ${f[6]} | ${f[7]}`, 14, y);
      y += 6;
    });
  }

  const slugAlcance = alcanceTexto.replace(/[^a-zA-Z0-9_-]+/g, '_');
  const nombreArchivo = `Cierre_Caja_${slugAlcance}_${fechaCierre}.pdf`;
  doc.save(nombreArchivo);
}

async function ejecutarCierreCaja() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const btnConfirmar = document.getElementById('btnConfirmarCierreCaja');
  const alcance = document.getElementById('alcanceCierreCaja')?.value || 'sucursal';
  const fechaCierre = document.getElementById('cierreFechaInput')?.value || new Date().toISOString().split('T')[0];
  const observaciones = document.getElementById('cierreObservaciones')?.value || '';
  const horaCierre = new Date().toLocaleTimeString('es-EC', { hour12: false });

  const ventasAEliminar = obtenerVentasParaCierre(alcance);
  if (ventasAEliminar.length === 0) {
    cerrarModal('modalCierreCaja');
    return alert('No hay ventas para cerrar.');
  }

  const confirmacionFinal = confirm(
    `¿Confirmas el cierre de caja con fecha ${fechaCierre}?\n\n` +
    `• Se generará el PDF de ${ventasAEliminar.length} venta(s).\n` +
    `• Se ELIMINARÁ permanentemente este historial de ventas de la base de datos.`
  );
  if (!confirmacionFinal) return;

  try {
    if (btnConfirmar) btnConfirmar.disabled = true;

    // 1. Generar y descargar PDF antes de borrar
    generarPDFCierreCaja({
      ventas: ventasAEliminar,
      alcanceTexto: obtenerDescripcionAlcanceCierre(alcance),
      fechaCierre,
      horaCierre,
      observaciones
    });

    // 2. Eliminar ventas en Supabase
    if (alcance === 'todas') {
      const ids = ventasAEliminar.map(v => v.id).filter(Boolean);
      if (ids.length > 0) {
        const { error } = await supabaseClient.from('ventas').delete().in('id', ids);
        if (error) {
          const { error: errFallback } = await supabaseClient.from('ventas').delete().neq('id', '');
          if (errFallback) throw errFallback;
        }
      }
      appData.ventas = [];
    } else {
      const sucId = appData.sucursalActiva;
      const { error } = await supabaseClient.from('ventas').delete().eq('sucursal_id', sucId);
      if (error) {
        const idsSuc = ventasAEliminar.map(v => v.id).filter(Boolean);
        const { error: errById } = await supabaseClient.from('ventas').delete().in('id', idsSuc);
        if (errById) throw errById;
      }
      appData.ventas = appData.ventas.filter(
        v => String(v.sucursalId ?? v.sucursal_id) !== String(sucId)
      );
    }

    cerrarModal('modalCierreCaja');
    renderizarSuperAdmin();
    renderizarDashboard();
    actualizarGraficosSuperAdmin();
    renderizarEstilistasSuperAdmin();

    alert(`Cierre de caja (${fechaCierre}) completado. Se descargó el PDF y se limpió el historial de ventas.`);
  } catch (err) {
    console.error('Error durante el cierre de caja:', err);
    alert(`Ocurrió un error al cerrar la caja: ${err.message || err}`);
  } finally {
    if (btnConfirmar) btnConfirmar.disabled = false;
  }
}

function cambiarSubmodSuperAdmin(tab, btn) {
  document.querySelectorAll('#mod-superadmin .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('submod-superadmin-global').style.display = tab === 'global' ? 'block' : 'none';
  document.getElementById('submod-superadmin-dashboard').style.display = tab === 'dashboard' ? 'block' : 'none';
  document.getElementById('submod-superadmin-reportes').style.display = tab === 'reportes' ? 'block' : 'none';
  document.getElementById('submod-superadmin-estilistas_admin').style.display = tab === 'estilistas_admin' ? 'block' : 'none';

  if (tab === 'global') renderizarSuperAdmin();
  if (tab === 'dashboard') renderizarDashboard();
  if (tab === 'reportes') actualizarGraficosSuperAdmin();
  if (tab === 'estilistas_admin') renderizarEstilistasSuperAdmin();
}

function poblarFiltroReportesSucursal() {
  const select = document.getElementById('filtroReporteSucursal');
  if (!select) return;
  select.innerHTML = `<option value="todas">🌐 Todas las Sucursales</option>` +
    appData.sucursales.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
}

function poblarFiltroEstilistasAdminSucursal() {
  const select = document.getElementById('filtroEstilistasAdminSucursal');
  if (!select) return;
  select.innerHTML = `<option value="todas">🌐 Todas las Sucursales</option>` +
    appData.sucursales.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
}

function renderizarEstilistasSuperAdmin() {
  const tbody = document.getElementById('tablaEstilistasSuperAdmin');
  if (!tbody) return;

  const fechaInicio = document.getElementById('estAdminFechaInicio')?.value || '';
  const fechaFin = document.getElementById('estAdminFechaFin')?.value || '';
  const filtroSucursal = document.getElementById('filtroEstilistasAdminSucursal')?.value || 'todas';

  const ventasFiltradas = filtrarVentasPorRango(appData.ventas, fechaInicio, fechaFin);
  const estilistasFiltrados = filtroSucursal === 'todas'
    ? appData.estilistas
    : appData.estilistas.filter(e => String(e.sucursalId) === String(filtroSucursal));

  if (estilistasFiltrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center">No hay estilistas registrados en esta selección</td></tr>`;
    return;
  }

  tbody.innerHTML = estilistasFiltrados.map(e => {
    const suc = appData.sucursales.find(s => String(s.id) === String(e.sucursalId));
    const ventasEst = ventasFiltradas.filter(v => String(v.estilistaId || v.estilista_id) === String(e.id));
    const totalGenerado = ventasEst.reduce((sum, v) => sum + v.total, 0);

    return `
      <tr>
        <td><strong>${e.nombre}</strong></td>
        <td>${e.cedula || 'N/A'}</td>
        <td>${e.telefono || 'N/A'}</td>
        <td>${suc ? suc.nombre : e.sucursalId}</td>
        <td>${e.nacimiento || 'N/A'}</td>
        <td>${ventasEst.length}</td>
        <td><strong style="color: var(--emerald);">$${totalGenerado.toFixed(2)}</strong></td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-primary btn-sm" onclick="abrirModalEstilista('${e.id}')" title="Editar Estilista">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="eliminarEstilista('${e.id}')" title="Eliminar Estilista">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderizarSuperAdmin() {
  const container = document.getElementById('superAdminContainer');
  if (!container) return;

  const fechaInicio = document.getElementById('globalFechaInicio')?.value || '';
  const fechaFin = document.getElementById('globalFechaFin')?.value || '';
  const ventasGlobales = filtrarVentasPorRango(appData.ventas, fechaInicio, fechaFin);

  const totalCadena = ventasGlobales.reduce((sum, v) => sum + v.total, 0);
  document.getElementById('gananciasTotalesCadena').innerText = `$${totalCadena.toFixed(2)}`;

  container.innerHTML = appData.sucursales.map(s => {
    const ventasSuc = ventasGlobales.filter(v => String(v.sucursalId) === String(s.id));
    const totalSucursal = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    const numEstilistas = appData.estilistas.filter(e => String(e.sucursalId) === String(s.id)).length;
    const productosSuc = appData.productos.filter(p => String(p.sucursalId) === String(s.id));
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
                ${ventasSuc.length === 0 ? `<tr><td colspan="5" class="text-center">Sin ventas en el rango seleccionado</td></tr>` : 
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

  let ventasFiltradas = filtrarVentasPorRango(appData.ventas, fechaInicio, fechaFin);
  if (filtroSucursal !== 'todas') {
    ventasFiltradas = ventasFiltradas.filter(v => String(v.sucursalId) === String(filtroSucursal));
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
    : appData.estilistas.filter(e => String(e.sucursalId) === String(filtroSucursal));

  const ventasPorEstilista = estilistasSucursal.map(e => {
    return ventasFiltradas
      .filter(v => String(v.estilistaId || v.estilista_id) === String(e.id))
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
  const prods = appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva));
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
  const prods = appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva));
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
  const prods = appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva));
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
  let totalAcumulado;

  if (actual >= META_SERVICIOS_GRATIS) {
    totalAcumulado = nuevosServicios >= META_SERVICIOS_GRATIS 
      ? META_SERVICIOS_GRATIS 
      : nuevosServicios;
  } else {
    totalAcumulado = Math.min(META_SERVICIOS_GRATIS, actual + nuevosServicios);
  }

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

  const sucursalObj = appData.sucursales.find(s => String(s.id) === String(venta.sucursalId || venta.sucursal_id));
  const estilistaObj = appData.estilistas.find(e => String(e.id) === String(venta.estilistaId || venta.estilista_id));

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
    : `\n⭐ *Progreso Corte Gratis:* ${acumulados}/8 servicios (${porcentaje}%)\n* Caducidad del premio* (En 6 meses desde su ultimo servicio) `;

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
  document.getElementById('ticketSucursal').innerText = appData.sucursales.find(s => String(s.id) === String(v.sucursalId || v.sucursal_id))?.nombre || '';
  document.getElementById('ticketFechaHora').innerText = v.fecha;
  
  const clienteId = v.clienteId || v.cliente_id;
  const clienteObj = appData.clientes.find(c => c.id === clienteId);
  document.getElementById('ticketCliente').innerText = clienteObj?.nombre || 'General';
  document.getElementById('ticketEstilista').innerText = appData.estilistas.find(e => String(e.id) === String(v.estilistaId || v.estilista_id))?.nombre || 'General';
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
  const estSuc = appData.estilistas.filter(e => String(e.sucursalId) === String(appData.sucursalActiva));
  container.innerHTML = estSuc.length === 0 ? '<p>No hay estilistas en esta sucursal.</p>' : estSuc.map(e => `
    <div class="card text-center">
      <h3>${e.nombre}</h3>
      <p>Cédula: ${e.cedula || 'N/A'}</p>
      <p>Teléfono: ${e.telefono || 'N/A'}</p>
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
  const telefono = document.getElementById('estilistaTelefono').value.trim();
  const nacimiento = document.getElementById('estilistaNacimiento').value;

  if (id) {
    const { error } = await supabaseClient.from('estilistas').update({ nombre, cedula, telefono, nacimiento }).eq('id', id);
    if (error && error.message && error.message.toLowerCase().includes('telefono')) {
      const { error: errFallback } = await supabaseClient.from('estilistas').update({ nombre, cedula, nacimiento }).eq('id', id);
      if (errFallback) {
        alert('Error al actualizar estilista: ' + errFallback.message);
        return;
      }
    } else if (error) {
      alert('Error al actualizar estilista: ' + error.message);
      return;
    }

    const idx = appData.estilistas.findIndex(x => x.id === id);
    if (idx !== -1) appData.estilistas[idx] = { ...appData.estilistas[idx], nombre, cedula, telefono, nacimiento };
  } else {
    const nuevo = { id: 'e_' + Date.now(), sucursal_id: appData.sucursalActiva, nombre, cedula, telefono, nacimiento };
    const { error } = await supabaseClient.from('estilistas').insert([nuevo]);
    if (error && error.message && error.message.toLowerCase().includes('telefono')) {
      const { telefono: _tel, ...sinTelefono } = nuevo;
      const { error: errFallback } = await supabaseClient.from('estilistas').insert([sinTelefono]);
      if (errFallback) {
        alert('Error al guardar estilista: ' + errFallback.message);
        return;
      }
    } else if (error) {
      alert('Error al guardar estilista: ' + error.message);
      return;
    }

    appData.estilistas.push({ ...nuevo, sucursalId: nuevo.sucursal_id });
  }
  cerrarModal('modalEstilista');
  renderizarEstilistas();
  if (moduloActual === 'superadmin') renderizarEstilistasSuperAdmin();
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
    if (moduloActual === 'superadmin') renderizarEstilistasSuperAdmin();
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
  tbody.innerHTML = appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva)).map(p => `
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
    document.getElementById('estilistaTelefono').value = e.telefono || '';
    document.getElementById('estilistaNacimiento').value = e.nacimiento;
  } else {
    document.getElementById('estilistaId').value = '';
    document.getElementById('estilistaNombre').value = '';
    document.getElementById('estilistaCedula').value = '';
    document.getElementById('estilistaTelefono').value = '';
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
  const estSuc = appData.estilistas.filter(e => String(e.sucursalId) === String(appData.sucursalActiva));

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

/* =========================================================
   EXPORTACIÓN DE DATOS A EXCEL (.XLSX) CON SHEETJS
   ========================================================= */

function verificarLibreriaExcel() {
  if (typeof XLSX === 'undefined') {
    alert('La librería de Excel aún no se ha cargado. Verifica tu conexión a internet e inténtalo de nuevo.');
    return false;
  }
  return true;
}

function obtenerFechaArchivo() {
  return new Date().toISOString().split('T')[0];
}

function determinarTipoItemVenta(item) {
  if (item.tipo === 'producto' || item.tipo === 'servicio') return item.tipo;
  if (appData.productos.some(p => p.id === item.id)) return 'producto';
  if (appData.servicios.some(s => s.id === item.id)) return 'servicio';
  return 'servicio';
}

function exportarExcelClientes() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (!verificarLibreriaExcel()) return;
  if (appData.clientes.length === 0) return alert('No hay clientes registrados para exportar.');

  const datos = appData.clientes.map(c => {
    const acum = c.serviciosAcumulados || 0;
    const pct = Math.round((acum / META_SERVICIOS_GRATIS) * 100);
    return {
      'ID Cliente': c.id,
      'Nombre Completo': c.nombre,
      'Teléfono': c.telefono || 'N/A',
      'Servicios Acumulados': `${acum} / ${META_SERVICIOS_GRATIS}`,
      'Progreso Fidelidad (%)': `${pct}%`,
      'Estado Premio': acum >= META_SERVICIOS_GRATIS ? 'Corte Gratis Disponible' : 'En progreso',
      'Fecha Nacimiento': c.nacimiento || 'N/A',
      'Notas': c.notas || ''
    };
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(datos);
  XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
  XLSX.writeFile(wb, `Clientes_LeguendBarber_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelEstilistas() {
  if (!verificarLibreriaExcel()) return;
  if (appData.estilistas.length === 0) return alert('No hay estilistas registrados para exportar.');

  const sucActiva = appData.sucursales.find(s => String(s.id) === String(appData.sucursalActiva));

  const mapearEstilista = (e) => {
    const suc = appData.sucursales.find(s => String(s.id) === String(e.sucursalId));
    const totalVentas = appData.ventas
      .filter(v => String(v.estilistaId || v.estilista_id) === String(e.id))
      .reduce((sum, v) => sum + v.total, 0);

    return {
      'ID': e.id,
      'Nombre Completo': e.nombre,
      'Cédula': e.cedula || 'N/A',
      'Teléfono': e.telefono || 'N/A',
      'Fecha Nacimiento': e.nacimiento || 'N/A',
      'Sucursal': suc ? suc.nombre : e.sucursalId,
      'Ventas Generadas ($)': Number(totalVentas.toFixed(2))
    };
  };

  const wb = XLSX.utils.book_new();

  const estSucursal = appData.estilistas.filter(e => String(e.sucursalId) === String(appData.sucursalActiva)).map(mapearEstilista);
  if (estSucursal.length > 0) {
    const wsSuc = XLSX.utils.json_to_sheet(estSucursal);
    XLSX.utils.book_append_sheet(wb, wsSuc, (sucActiva?.nombre || 'Sucursal Actual').substring(0, 31));
  }

  const todosEstilistas = appData.estilistas.map(mapearEstilista);
  const wsTodos = XLSX.utils.json_to_sheet(todosEstilistas);
  XLSX.utils.book_append_sheet(wb, wsTodos, 'Todos los Estilistas');

  XLSX.writeFile(wb, `Estilistas_LeguendBarber_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelInventario() {
  if (!verificarLibreriaExcel()) return;
  if (appData.productos.length === 0) return alert('No hay productos registrados para exportar.');

  const sucActiva = appData.sucursales.find(s => String(s.id) === String(appData.sucursalActiva));

  const mapearProducto = (p) => {
    const suc = appData.sucursales.find(s => String(s.id) === String(p.sucursalId));
    return {
      'ID': p.id,
      'Producto': p.nombre,
      'Categoría': p.categoria || 'General',
      'Precio Unitario ($)': Number(p.precio.toFixed(2)),
      'Stock Disponible': p.stock,
      'Valor Total Stock ($)': Number((p.precio * p.stock).toFixed(2)),
      'Estado Stock': p.stock <= 5 ? 'Stock Bajo' : 'Normal',
      'Sucursal': suc ? suc.nombre : p.sucursalId
    };
  };

  const wb = XLSX.utils.book_new();

  const prodsSuc = appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva)).map(mapearProducto);
  if (prodsSuc.length > 0) {
    const wsSuc = XLSX.utils.json_to_sheet(prodsSuc);
    XLSX.utils.book_append_sheet(wb, wsSuc, (sucActiva?.nombre || 'Sucursal Actual').substring(0, 31));
  }

  const todosProds = appData.productos.map(mapearProducto);
  const wsTodos = XLSX.utils.json_to_sheet(todosProds);
  XLSX.utils.book_append_sheet(wb, wsTodos, 'Inventario Global');

  XLSX.writeFile(wb, `Inventario_LeguendBarber_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelServicios() {
  if (!verificarLibreriaExcel()) return;
  if (appData.servicios.length === 0) return alert('No hay servicios registrados para exportar.');

  const datos = appData.servicios.map(s => ({
    'ID': s.id,
    'Nombre del Servicio': s.nombre,
    'Precio ($)': Number(s.precio.toFixed(2)),
    'Popularidad (Usos)': s.usosCount || 0
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(datos);
  XLSX.utils.book_append_sheet(wb, ws, 'Servicios');
  XLSX.writeFile(wb, `Servicios_LeguendBarber_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelControlSucursales() {
  if (!verificarLibreriaExcel()) return;

  const fechaInicio = document.getElementById('globalFechaInicio')?.value || '';
  const fechaFin = document.getElementById('globalFechaFin')?.value || '';
  const ventasFiltradas = filtrarVentasPorRango(appData.ventas, fechaInicio, fechaFin);

  const resumen = appData.sucursales.map(s => {
    const ventasSuc = ventasFiltradas.filter(v => String(v.sucursalId) === String(s.id));
    const totalVentas = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    const numEstilistas = appData.estilistas.filter(e => String(e.sucursalId) === String(s.id)).length;
    const prodsSuc = appData.productos.filter(p => String(p.sucursalId) === String(s.id));
    const totalUnidades = prodsSuc.reduce((sum, p) => sum + p.stock, 0);
    const stockBajo = prodsSuc.filter(p => p.stock <= 5).length;
    const valorInventario = prodsSuc.reduce((sum, p) => sum + (p.precio * p.stock), 0);

    return {
      'ID Sucursal': s.id,
      'Sucursal': s.nombre,
      'Dirección': s.direccion || 'Sin dirección',
      'Rango Fechas': (fechaInicio || fechaFin) ? `${fechaInicio || 'Inicio'} a ${fechaFin || 'Hoy'}` : 'Todas las fechas',
      'Transacciones': ventasSuc.length,
      'Ingresos Totales ($)': Number(totalVentas.toFixed(2)),
      'Estilistas': numEstilistas,
      'Unidades en Stock': totalUnidades,
      'Productos Stock Bajo': stockBajo,
      'Valor Inventario ($)': Number(valorInventario.toFixed(2))
    };
  });

  const detalleVentas = ventasFiltradas.map(v => {
    const suc = appData.sucursales.find(s => String(s.id) === String(v.sucursalId || v.sucursal_id));
    const cli = appData.clientes.find(c => c.id === (v.clienteId || v.cliente_id));
    const est = appData.estilistas.find(e => String(e.id) === String(v.estilistaId || v.estilista_id));
    return {
      'Fecha': v.fecha,
      'Sucursal': suc ? suc.nombre : (v.sucursalId || 'N/A'),
      'Cliente': cli ? cli.nombre : 'Ocasional',
      'Estilista': est ? est.nombre : 'General',
      'Método Pago': v.metodoPago || v.metodo_pago,
      'Total ($)': Number(v.total.toFixed(2))
    };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(resumen), 'Resumen Sucursales');
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(detalleVentas.length ? detalleVentas : [{ Mensaje: 'Sin ventas en el rango' }]),
    'Ventas Consolidadas'
  );
  XLSX.writeFile(wb, `Control_Sucursales_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelDashboardFacturacion() {
  if (!verificarLibreriaExcel()) return;

  const fechaInicio = document.getElementById('dashFechaInicio')?.value || '';
  const fechaFin = document.getElementById('dashFechaFin')?.value || '';
  const hayFiltroFecha = Boolean(fechaInicio || fechaFin);

  const sucActiva = appData.sucursales.find(s => String(s.id) === String(appData.sucursalActiva));
  const ventasSucBase = appData.ventas.filter(v => String(v.sucursalId) === String(appData.sucursalActiva));
  const ventasSuc = hayFiltroFecha
    ? filtrarVentasPorRango(ventasSucBase, fechaInicio, fechaFin)
    : ventasSucBase;

  const totalIngresos = ventasSuc.reduce((sum, v) => sum + v.total, 0);
  const totalEfectivo = ventasSuc.filter(v => (v.metodoPago || v.metodo_pago) === 'Efectivo').reduce((sum, v) => sum + v.total, 0);
  const totalTransferencia = ventasSuc.filter(v => (v.metodoPago || v.metodo_pago) === 'Transferencia').reduce((sum, v) => sum + v.total, 0);

  const kpis = [{
    'Sucursal': sucActiva ? sucActiva.nombre : appData.sucursalActiva,
    'Rango Fechas': hayFiltroFecha ? `${fechaInicio || 'Inicio'} a ${fechaFin || 'Hoy'}` : 'Histórico Completo',
    'Total Facturas': ventasSuc.length,
    'Ingresos Efectivo ($)': Number(totalEfectivo.toFixed(2)),
    'Ingresos Transferencia ($)': Number(totalTransferencia.toFixed(2)),
    'Ingresos Totales ($)': Number(totalIngresos.toFixed(2)),
    'Estilistas Activos': appData.estilistas.filter(e => String(e.sucursalId) === String(appData.sucursalActiva)).length,
    'Productos Stock Bajo': appData.productos.filter(p => String(p.sucursalId) === String(appData.sucursalActiva) && p.stock <= 5).length
  }];

  const facturas = ventasSuc.slice().reverse().map(v => {
    const cli = appData.clientes.find(c => c.id === (v.clienteId || v.cliente_id));
    const est = appData.estilistas.find(e => String(e.id) === String(v.estilistaId || v.estilista_id));
    const detalle = Array.isArray(v.items)
      ? v.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')
      : '';

    return {
      'ID Factura': v.id,
      'Fecha': v.fecha,
      'Cliente': cli ? cli.nombre : 'Ocasional',
      'Estilista': est ? est.nombre : 'Sin Asignar',
      'Método de Pago': v.metodoPago || v.metodo_pago,
      'Detalle': detalle,
      'Total ($)': Number(v.total.toFixed(2))
    };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(kpis), 'Resumen Dashboard');
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(facturas.length ? facturas : [{ Mensaje: 'Sin facturas en el rango seleccionado' }]),
    'Facturas Sucursal'
  );
  XLSX.writeFile(wb, `Facturacion_${(sucActiva?.nombre || 'Sucursal').replace(/\s+/g, '_')}_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelDashboardProductos() {
  if (!verificarLibreriaExcel()) return;

  const fechaInicio = document.getElementById('dashFechaInicio')?.value || '';
  const fechaFin = document.getElementById('dashFechaFin')?.value || '';
  const hayFiltroFecha = Boolean(fechaInicio || fechaFin);

  const sucActiva = appData.sucursales.find(s => String(s.id) === String(appData.sucursalActiva));
  const ventasSucBase = appData.ventas.filter(v => String(v.sucursalId) === String(appData.sucursalActiva));
  const ventasSuc = hayFiltroFecha
    ? filtrarVentasPorRango(ventasSucBase, fechaInicio, fechaFin)
    : ventasSucBase;

  const detalleProductos = [];
  const resumenPorProducto = {};

  ventasSuc.forEach(v => {
    if (!Array.isArray(v.items)) return;
    const cli = appData.clientes.find(c => c.id === (v.clienteId || v.cliente_id));
    const est = appData.estilistas.find(e => String(e.id) === String(v.estilistaId || v.estilista_id));

    v.items.forEach(item => {
      if (determinarTipoItemVenta(item) !== 'producto') return;
      const subtotal = Number((item.precio * item.cantidad).toFixed(2));
      const prodCatalogo = appData.productos.find(p => p.id === item.id);

      detalleProductos.push({
        'ID Factura': v.id,
        'Fecha': v.fecha,
        'Sucursal': sucActiva ? sucActiva.nombre : appData.sucursalActiva,
        'Producto': item.nombre,
        'Categoría': item.categoria || prodCatalogo?.categoria || 'General',
        'Cantidad': item.cantidad,
        'Precio Unitario ($)': Number(item.precio.toFixed(2)),
        'Subtotal ($)': subtotal,
        'Cliente': cli ? cli.nombre : 'Ocasional',
        'Estilista': est ? est.nombre : 'Sin Asignar',
        'Método de Pago': v.metodoPago || v.metodo_pago
      });

      if (!resumenPorProducto[item.nombre]) {
        resumenPorProducto[item.nombre] = {
          'Producto': item.nombre,
          'Categoría': item.categoria || prodCatalogo?.categoria || 'General',
          'Unidades Vendidas': 0,
          'Total Facturado ($)': 0
        };
      }
      resumenPorProducto[item.nombre]['Unidades Vendidas'] += item.cantidad;
      resumenPorProducto[item.nombre]['Total Facturado ($)'] = Number(
        (resumenPorProducto[item.nombre]['Total Facturado ($)'] + subtotal).toFixed(2)
      );
    });
  });

  const resumenArray = Object.values(resumenPorProducto);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(resumenArray.length ? resumenArray : [{ Mensaje: 'Sin ventas de productos en el rango seleccionado' }]),
    'Resumen Productos'
  );
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(detalleProductos.length ? detalleProductos : [{ Mensaje: 'Sin detalle de productos en el rango seleccionado' }]),
    'Facturación Productos'
  );
  XLSX.writeFile(wb, `Facturacion_Productos_${(sucActiva?.nombre || 'Sucursal').replace(/\s+/g, '_')}_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelDashboardServicios() {
  if (!verificarLibreriaExcel()) return;

  const fechaInicio = document.getElementById('dashFechaInicio')?.value || '';
  const fechaFin = document.getElementById('dashFechaFin')?.value || '';
  const hayFiltroFecha = Boolean(fechaInicio || fechaFin);

  const sucActiva = appData.sucursales.find(s => String(s.id) === String(appData.sucursalActiva));
  const ventasSucBase = appData.ventas.filter(v => String(v.sucursalId) === String(appData.sucursalActiva));
  const ventasSuc = hayFiltroFecha
    ? filtrarVentasPorRango(ventasSucBase, fechaInicio, fechaFin)
    : ventasSucBase;

  const detalleServicios = [];
  const resumenPorServicio = {};

  ventasSuc.forEach(v => {
    if (!Array.isArray(v.items)) return;
    const cli = appData.clientes.find(c => c.id === (v.clienteId || v.cliente_id));
    const est = appData.estilistas.find(e => String(e.id) === String(v.estilistaId || v.estilista_id));

    v.items.forEach(item => {
      if (determinarTipoItemVenta(item) !== 'servicio') return;
      const subtotal = Number((item.precio * item.cantidad).toFixed(2));

      detalleServicios.push({
        'ID Factura': v.id,
        'Fecha': v.fecha,
        'Sucursal': sucActiva ? sucActiva.nombre : appData.sucursalActiva,
        'Servicio': item.nombre,
        'Cantidad': item.cantidad,
        'Precio Unitario ($)': Number(item.precio.toFixed(2)),
        'Subtotal ($)': subtotal,
        'Cliente': cli ? cli.nombre : 'Ocasional',
        'Estilista': est ? est.nombre : 'Sin Asignar',
        'Método de Pago': v.metodoPago || v.metodo_pago
      });

      if (!resumenPorServicio[item.nombre]) {
        resumenPorServicio[item.nombre] = {
          'Servicio': item.nombre,
          'Cantidad Realizada': 0,
          'Total Facturado ($)': 0
        };
      }
      resumenPorServicio[item.nombre]['Cantidad Realizada'] += item.cantidad;
      resumenPorServicio[item.nombre]['Total Facturado ($)'] = Number(
        (resumenPorServicio[item.nombre]['Total Facturado ($)'] + subtotal).toFixed(2)
      );
    });
  });

  const resumenArray = Object.values(resumenPorServicio);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(resumenArray.length ? resumenArray : [{ Mensaje: 'Sin ventas de servicios en el rango seleccionado' }]),
    'Resumen Servicios'
  );
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(detalleServicios.length ? detalleServicios : [{ Mensaje: 'Sin detalle de servicios en el rango seleccionado' }]),
    'Facturación Servicios'
  );
  XLSX.writeFile(wb, `Facturacion_Servicios_${(sucActiva?.nombre || 'Sucursal').replace(/\s+/g, '_')}_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelReportesEstadisticas() {
  if (!verificarLibreriaExcel()) return;

  const fechaInicio = document.getElementById('reporteFechaInicio')?.value || '';
  const fechaFin = document.getElementById('reporteFechaFin')?.value || '';
  const filtroSucursal = document.getElementById('filtroReporteSucursal')?.value || 'todas';

  let ventasFiltradas = filtrarVentasPorRango(appData.ventas, fechaInicio, fechaFin);
  if (filtroSucursal !== 'todas') {
    ventasFiltradas = ventasFiltradas.filter(v => String(v.sucursalId) === String(filtroSucursal));
  }

  const hojaServicios = appData.servicios.map(s => ({
    'Servicio': s.nombre,
    'Precio ($)': Number(s.precio.toFixed(2)),
    'Cantidad Usos': s.usosCount || 0
  }));

  const estilistasSuc = filtroSucursal === 'todas'
    ? appData.estilistas
    : appData.estilistas.filter(e => String(e.sucursalId) === String(filtroSucursal));

  const hojaEstilistas = estilistasSuc.map(e => {
    const suc = appData.sucursales.find(s => String(s.id) === String(e.sucursalId));
    const ventasEst = ventasFiltradas.filter(v => String(v.estilistaId || v.estilista_id) === String(e.id));
    const total = ventasEst.reduce((sum, v) => sum + v.total, 0);
    return {
      'Estilista': e.nombre,
      'Teléfono': e.telefono || 'N/A',
      'Sucursal': suc ? suc.nombre : e.sucursalId,
      'Servicios/Ventas Realizadas': ventasEst.length,
      'Total Ventas ($)': Number(total.toFixed(2))
    };
  });

  const ventasPorFecha = {};
  ventasFiltradas.forEach(v => {
    ventasPorFecha[v.fecha] = (ventasPorFecha[v.fecha] || 0) + v.total;
  });
  const hojaFechas = Object.keys(ventasPorFecha).sort().map(f => ({
    'Fecha': f,
    'Ingresos ($)': Number(ventasPorFecha[f].toFixed(2))
  }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(hojaServicios.length ? hojaServicios : [{ Mensaje: 'Sin datos' }]), 'Servicios Populares');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(hojaEstilistas.length ? hojaEstilistas : [{ Mensaje: 'Sin datos' }]), 'Ventas por Estilista');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(hojaFechas.length ? hojaFechas : [{ Mensaje: 'Sin datos' }]), 'Ingresos por Fecha');
  XLSX.writeFile(wb, `Reportes_Estadisticas_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelEstilistasSuperAdmin() {
  if (!verificarLibreriaExcel()) return;

  const fechaInicio = document.getElementById('estAdminFechaInicio')?.value || '';
  const fechaFin = document.getElementById('estAdminFechaFin')?.value || '';
  const filtroSucursal = document.getElementById('filtroEstilistasAdminSucursal')?.value || 'todas';

  const ventasFiltradas = filtrarVentasPorRango(appData.ventas, fechaInicio, fechaFin);
  const estilistasFiltrados = filtroSucursal === 'todas'
    ? appData.estilistas
    : appData.estilistas.filter(e => String(e.sucursalId) === String(filtroSucursal));

  if (estilistasFiltrados.length === 0) return alert('No hay estilistas en la selección actual para exportar.');

  const datos = estilistasFiltrados.map(e => {
    const suc = appData.sucursales.find(s => String(s.id) === String(e.sucursalId));
    const ventasEst = ventasFiltradas.filter(v => String(v.estilistaId || v.estilista_id) === String(e.id));
    const totalGenerado = ventasEst.reduce((sum, v) => sum + v.total, 0);

    return {
      'ID': e.id,
      'Estilista': e.nombre,
      'Cédula': e.cedula || 'N/A',
      'Teléfono': e.telefono || 'N/A',
      'Sucursal': suc ? suc.nombre : e.sucursalId,
      'Fecha Nacimiento': e.nacimiento || 'N/A',
      'Rango Evaluado': (fechaInicio || fechaFin) ? `${fechaInicio || 'Inicio'} a ${fechaFin || 'Hoy'}` : 'Todas las fechas',
      'Cantidad Atenciones': ventasEst.length,
      'Ventas Generadas ($)': Number(totalGenerado.toFixed(2))
    };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(datos), 'Rendimiento Estilistas');
  XLSX.writeFile(wb, `Estilistas_SuperAdmin_${obtenerFechaArchivo()}.xlsx`);
}

function exportarExcelSuperAdmin() {
  if (!verificarLibreriaExcel()) return;

  const wb = XLSX.utils.book_new();

  const resumenSucursales = appData.sucursales.map(s => {
    const ventasSuc = appData.ventas.filter(v => String(v.sucursalId) === String(s.id));
    const totalVentas = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    const numEstilistas = appData.estilistas.filter(e => String(e.sucursalId) === String(s.id)).length;
    const prodsSuc = appData.productos.filter(p => String(p.sucursalId) === String(s.id));
    const totalUnidades = prodsSuc.reduce((sum, p) => sum + p.stock, 0);
    const valorInventario = prodsSuc.reduce((sum, p) => sum + (p.precio * p.stock), 0);

    return {
      'ID Sucursal': s.id,
      'Sucursal': s.nombre,
      'Dirección': s.direccion || 'Sin dirección',
      'Total Transacciones': ventasSuc.length,
      'Ingresos Totales ($)': Number(totalVentas.toFixed(2)),
      'Estilistas Activos': numEstilistas,
      'Unidades en Stock': totalUnidades,
      'Valor Inventario ($)': Number(valorInventario.toFixed(2))
    };
  });
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(resumenSucursales), 'Resumen Sucursales');

  const datosVentas = appData.ventas.map(v => {
    const suc = appData.sucursales.find(s => String(s.id) === String(v.sucursalId || v.sucursal_id));
    const cli = appData.clientes.find(c => c.id === (v.clienteId || v.cliente_id));
    const est = appData.estilistas.find(e => String(e.id) === String(v.estilistaId || v.estilista_id));
    const detalle = Array.isArray(v.items)
      ? v.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')
      : '';

    return {
      'ID Venta': v.id,
      'Fecha': v.fecha,
      'Sucursal': suc ? suc.nombre : (v.sucursalId || 'N/A'),
      'Cliente': cli ? cli.nombre : 'Ocasional',
      'Estilista': est ? est.nombre : 'Sin Asignar',
      'Método de Pago': v.metodoPago || v.metodo_pago || 'N/A',
      'Detalle': detalle,
      'Total ($)': Number(v.total.toFixed(2))
    };
  });
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(datosVentas.length ? datosVentas : [{ Mensaje: 'Sin ventas registradas' }]),
    'Ventas y Facturas'
  );

  const datosClientes = appData.clientes.map(c => {
    const acum = c.serviciosAcumulados || 0;
    return {
      'ID': c.id,
      'Nombre': c.nombre,
      'Teléfono': c.telefono || 'N/A',
      'Servicios Acumulados': `${acum}/${META_SERVICIOS_GRATIS}`,
      'Fidelidad (%)': `${Math.round((acum / META_SERVICIOS_GRATIS) * 100)}%`,
      'Fecha Nacimiento': c.nacimiento || 'N/A',
      'Notas': c.notas || ''
    };
  });
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(datosClientes.length ? datosClientes : [{ Mensaje: 'Sin clientes' }]),
    'Clientes'
  );

  const datosEstilistas = appData.estilistas.map(e => {
    const suc = appData.sucursales.find(s => String(s.id) === String(e.sucursalId));
    const ventasEst = appData.ventas
      .filter(v => String(v.estilistaId || v.estilista_id) === String(e.id))
      .reduce((sum, v) => sum + v.total, 0);
    return {
      'ID': e.id,
      'Nombre': e.nombre,
      'Cédula': e.cedula || 'N/A',
      'Teléfono': e.telefono || 'N/A',
      'Fecha Nacimiento': e.nacimiento || 'N/A',
      'Sucursal': suc ? suc.nombre : e.sucursalId,
      'Ventas Totales ($)': Number(ventasEst.toFixed(2))
    };
  });
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(datosEstilistas.length ? datosEstilistas : [{ Mensaje: 'Sin estilistas' }]),
    'Estilistas'
  );

  const datosProductos = appData.productos.map(p => {
    const suc = appData.sucursales.find(s => String(s.id) === String(p.sucursalId));
    return {
      'ID': p.id,
      'Producto': p.nombre,
      'Categoría': p.categoria || 'General',
      'Precio ($)': Number(p.precio.toFixed(2)),
      'Stock': p.stock,
      'Valor Total ($)': Number((p.precio * p.stock).toFixed(2)),
      'Sucursal': suc ? suc.nombre : p.sucursalId
    };
  });
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(datosProductos.length ? datosProductos : [{ Mensaje: 'Sin productos' }]),
    'Inventario Productos'
  );

  const datosServicios = appData.servicios.map(s => ({
    'ID': s.id,
    'Servicio': s.nombre,
    'Precio ($)': Number(s.precio.toFixed(2)),
    'Usos': s.usosCount || 0
  }));
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(datosServicios.length ? datosServicios : [{ Mensaje: 'Sin servicios' }]),
    'Servicios'
  );

  XLSX.writeFile(wb, `Reporte_Completo_SuperAdmin_${obtenerFechaArchivo()}.xlsx`);
}