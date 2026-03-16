// ========================================
// CONFIGURACIÓN INICIAL
// ========================================

// Credenciales válidas para iniciar sesión
const VALID_USERNAME = "Lennin";
const VALID_PASSWORD = "1234";

// ========================================
// OBTENER REFERENCIAS A ELEMENTOS HTML
// ========================================

// Elementos del login
const loginContainer = document.getElementById('login-container');  // Contenedor del login
const mainContainer = document.getElementById('main-container');    // Contenedor del dashboard
const loginForm = document.getElementById('login-form');            // Formulario de login
const loginError = document.getElementById('login-error');          // Mensaje de error

// Botones y elementos de tiempo
const randomBtn = document.getElementById('random-simulate');       // Botón "Simular valores"
const timestampSpan = document.getElementById('timestamp');         // Texto de hora actualizada
const timeDisplay = document.getElementById('time-display');        // Reloj en estadísticas

// Elementos del sensor de humedad
const humedadSlider = document.getElementById('humedad-slider');    // Slider de humedad
const humedadValor = document.getElementById('humedad-valor');      // Número que muestra el valor
const ledHumedad = document.getElementById('led-humedad');          // LED de humedad
const humedadProgress = document.getElementById('humedad-progress'); // Barra de progreso

// Elementos del sensor de temperatura
const tempSlider = document.getElementById('temp-slider');          // Slider de temperatura
const tempValor = document.getElementById('temp-valor');            // Número que muestra el valor
const ledTemp = document.getElementById('led-temp');                // LED de temperatura
const tempProgress = document.getElementById('temp-progress');      // Barra de progreso

// ========================================
// FUNCIONES
// ========================================

/**
 * Actualiza la hora en la interfaz
 * Se llama cada segundo y cuando cambian los valores
 */
function actualizarTimestamp() {
    const ahora = new Date();  // Obtiene fecha y hora actual
    const hora = ahora.getHours().toString().padStart(2, '0');      // Hora con 2 dígitos
    const minutos = ahora.getMinutes().toString().padStart(2, '0'); // Minutos con 2 dígitos
    const segundos = ahora.getSeconds().toString().padStart(2, '0'); // Segundos con 2 dígitos
    
    // Actualiza los dos lugares donde se muestra la hora
    timestampSpan.textContent = `Última actualización: ${hora}:${minutos}:${segundos}`;
    timeDisplay.textContent = `${hora}:${minutos}`;
}

/**
 * Actualiza el sensor de humedad
 * Lee el valor del slider y cambia el LED según el valor
 */
function actualizarHumedad() {
    // Obtiene el valor actual del slider (como número entero)
    const valor = parseInt(humedadSlider.value);
    
    // Muestra el valor en el número grande
    humedadValor.textContent = valor;
    
    // Actualiza la barra de progreso (ancho = porcentaje)
    humedadProgress.style.width = valor + '%';
    
    // CAMBIO DE COLOR DEL LED SEGÚN EL VALOR
    if (valor <= 8) {
        // Valor muy bajo (≤8%) -> LED rojo (crítico)
        ledHumedad.className = 'led red';
    } else if (valor <= 20) {
        // Valor medio-bajo (9-20%) -> LED amarillo (alerta)
        ledHumedad.className = 'led yellow';
    } else {
        // Valor normal (>20%) -> LED verde
        ledHumedad.className = 'led green';
    }
    
    // Actualiza la hora para mostrar que hubo un cambio
    actualizarTimestamp();
}

/**
 * Actualiza el sensor de temperatura
 * Lee el valor del slider y cambia el LED según el valor
 */
function actualizarTemperatura() {
    // Obtiene el valor actual del slider (como número decimal)
    const valor = parseFloat(tempSlider.value);
    
    // Muestra el valor con 1 decimal
    tempValor.textContent = valor.toFixed(1);
    
    // Calcula el porcentaje para la barra (0-50°C → 0-100%)
    const porcentaje = (valor / 50) * 100;
    tempProgress.style.width = porcentaje + '%';
    
    // CAMBIO DE COLOR DEL LED SEGÚN LA TEMPERATURA
    if (valor >= 30) {
        // Temperatura alta (≥30°C) -> LED rojo (calor extremo)
        ledTemp.className = 'led red';
    } else if (valor <= 10) {
        // Temperatura baja (≤10°C) -> LED amarillo (frío)
        ledTemp.className = 'led yellow';
    } else {
        // Temperatura normal (11-29°C) -> LED verde
        ledTemp.className = 'led green';
    }
    
    // Actualiza la hora
    actualizarTimestamp();
}

// ========================================
// EVENTOS (lo que pasa cuando el usuario interactúa)
// ========================================

// Cuando se mueve el slider de humedad, se actualiza el sensor
humedadSlider.addEventListener('input', actualizarHumedad);

// Cuando se mueve el slider de temperatura, se actualiza el sensor
tempSlider.addEventListener('input', actualizarTemperatura);

// Cuando se hace clic en el botón "Simular valores"
randomBtn.addEventListener('click', () => {
    // Genera números aleatorios
    const nuevaHumedad = Math.floor(Math.random() * 101);      // 0 a 100
    const nuevaTemp = (Math.random() * 50).toFixed(1);         // 0 a 50, con 1 decimal
    
    // Asigna los valores a los sliders
    humedadSlider.value = nuevaHumedad;
    tempSlider.value = nuevaTemp;
    
    // Actualiza todo con los nuevos valores
    actualizarHumedad();
    actualizarTemperatura();
});

// Cuando se envía el formulario de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Evita que la página se recargue
    
    // Obtiene lo que el usuario escribió
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Verifica si son correctos
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Credenciales correctas: oculta login y muestra dashboard
        loginContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        
        // Cambia el nombre en la esquina superior derecha
        document.querySelector('.user-profile span').textContent = username;
        
        // Inicializa los valores del dashboard
        actualizarHumedad();
        actualizarTemperatura();
        actualizarTimestamp();
    } else {
        // Credenciales incorrectas: muestra mensaje de error
        loginError.textContent = 'Usuario o contraseña incorrectos';
    }
});

// ========================================
// ACTUALIZACIÓN AUTOMÁTICA
// ========================================

// Actualiza la hora cada segundo (1000 milisegundos)
setInterval(actualizarTimestamp, 1000);
