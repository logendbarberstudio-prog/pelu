// ==========================================
// CONFIGURACIÓN DE SUPABASE PARA LOGIN
// ==========================================
const SUPABASE_URL = 'https://rsfkxwopwtcyjpkstpmp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hJFsLmxBducinC6pH-hDQw_Uxyj24eZ';

let supabaseClient = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error("El SDK de Supabase no se ha cargado correctamente en el HTML.");
  }

  window.addEventListener('scroll', () => {
    const btnScroll = document.getElementById('btnScrollTop');
    if (btnScroll) {
      if (window.scrollY > 150) {
        btnScroll.classList.add('visible');
      } else {
        btnScroll.classList.remove('visible');
      }
    }
  });
});

async function procesarLogin(event) {
  event.preventDefault();

  const usuarioInput = document.getElementById('usuario').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const btnLogin = document.getElementById('btnLogin');
  const btnText = document.getElementById('btnLoginText');
  const btnIcon = document.getElementById('btnLoginIcon');

  if (!usuarioInput) {
    mostrarAlerta('Por favor, ingresa tu usuario o correo electrónico.', 'warning');
    document.getElementById('usuario').focus();
    return;
  }

  if (!passwordInput) {
    mostrarAlerta('Por favor, ingresa tu contraseña.', 'warning');
    document.getElementById('password').focus();
    return;
  }

  if (!supabaseClient) {
    mostrarAlerta('Error: El cliente de Supabase no está inicializado.', 'danger');
    return;
  }

  btnLogin.disabled = true;
  btnIcon.className = "fa-solid fa-spinner fa-spin";
  btnText.textContent = "Verificando en base de datos...";

  try {
    const { data, error } = await supabaseClient
      .from('usuarios')
      .select('*')
      .eq('usuario', usuarioInput)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Usuario no encontrado.');
    }

    if (data.password === passwordInput) {
      mostrarAlerta('¡Credenciales correctas! Redirigiendo al panel principal...', 'success');
      
      localStorage.setItem('sessionActive', 'true');
      localStorage.setItem('loggedUser', data.usuario);
      localStorage.setItem('userRole', data.rol || 'admin');

      setTimeout(() => {
        window.location.href = 'pelu.html';
      }, 1200);

    } else {
      throw new Error('Contraseña incorrecta.');
    }

  } catch (err) {
    console.error('Error de autenticación:', err.message);
    mostrarAlerta('Usuario o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.', 'danger');
    
    btnLogin.disabled = false;
    btnIcon.className = "fa-solid fa-right-to-bracket";
    btnText.textContent = "Iniciar Sesión";
  }
}

function mostrarAlerta(mensaje, tipo) {
  const alertMsg = document.getElementById('alertMessage');
  if (!alertMsg) return;
  alertMsg.className = `alert alert-${tipo}`;
  
  let icon = 'fa-circle-info';
  if (tipo === 'danger') icon = 'fa-triangle-exclamation';
  if (tipo === 'success') icon = 'fa-circle-check';
  if (tipo === 'warning') icon = 'fa-circle-exclamation';

  alertMsg.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${mensaje}</span>`;
}

function togglePasswordVisibility() {
  const passInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');

  if (passInput && eyeIcon) {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      eyeIcon.className = 'fa-solid fa-eye-slash';
    } else {
      passInput.type = 'password';
      eyeIcon.className = 'fa-solid fa-eye';
    }
  }
}

function recuperarPassword(e) {
  e.preventDefault();
  mostrarAlerta('Para restablecer tu contraseña, contacta directamente con el Administrador del Sistema.', 'warning');
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}