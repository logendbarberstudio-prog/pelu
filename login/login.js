function procesarLogin(event) {
  event.preventDefault();

  const usuarioInput = document.getElementById('usuario').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const btnLogin = document.getElementById('btnLogin');
  const btnText = document.getElementById('btnLoginText');
  const btnIcon = document.getElementById('btnLoginIcon');

  // Validaciones directas en pantalla
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

  // Activar estado de carga en el botón
  btnLogin.disabled = true;
  btnIcon.className = "fa-solid fa-spinner fa-spin";
  btnText.textContent = "Verificando...";

  // Credenciales por defecto
  const USUARIO_CORRECTO = "admin";
  const PASSWORD_CORRECTO = "123456";

  setTimeout(() => {
    if (usuarioInput === USUARIO_CORRECTO && passwordInput === PASSWORD_CORRECTO) {
      mostrarAlerta('¡Credenciales correctas! Redirigiendo al panel principal...', 'success');
      
      localStorage.setItem('sessionActive', 'true');
      localStorage.setItem('loggedUser', usuarioInput);

      setTimeout(() => {
        window.location.href = '../pelu.html';
      }, 1200);

    } else {
      mostrarAlerta('Usuario o contraseña incorrectos. Verifica tus datos e intentalo de nuevo.', 'danger');
      
      // Restaurar el botón en caso de error
      btnLogin.disabled = false;
      btnIcon.className = "fa-solid fa-right-to-bracket";
      btnText.textContent = "Iniciar Sesión";
    }
  }, 800);
}

// Función para mostrar mensajes de estado con íconos descriptivos
function mostrarAlerta(mensaje, tipo) {
  const alertMsg = document.getElementById('alertMessage');
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

  if (passInput.type === 'password') {
    passInput.type = 'text';
    eyeIcon.className = 'fa-solid fa-eye-slash';
  } else {
    passInput.type = 'password';
    eyeIcon.className = 'fa-solid fa-eye';
  }
}

function recuperarPassword(e) {
  e.preventDefault();
  mostrarAlerta('Para restablecer tu contraseña, contacta directamente con el Administrador del Sistema.', 'warning');
}

// Control del botón flotante para ir arriba en dispositivos móviles
window.addEventListener('scroll', () => {
  const btnScroll = document.getElementById('btnScrollTop');
  if (window.scrollY > 150) {
    btnScroll.classList.add('visible');
  } else {
    btnScroll.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}