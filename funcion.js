const audio = document.getElementById('audio');
const btnPlayPause = document.getElementById('play-pause');
const barraProgreso = document.getElementById('barra-progreso');
const tiempoActual = document.getElementById('tiempo-actual');
const tiempoTotal = document.getElementById('tiempo-total');

let reproduciendo = false;

// Configurar audio
audio.src = "cenicienta.mp3"; // Cambia por la URL de tu canción

// Evento cuando se carga la canción
audio.addEventListener('loadedmetadata', () => {
    const minutos = Math.floor(audio.duration / 60);
    const segundos = Math.floor(audio.duration % 60);
    tiempoTotal.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
});

// Actualizar barra de progreso
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        barraProgreso.value = porcentaje;
        
        const minutos = Math.floor(audio.currentTime / 60);
        const segundos = Math.floor(audio.currentTime % 60);
        tiempoActual.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
    }
});

// Botón play/pause
btnPlayPause.addEventListener('click', () => {
    if (reproduciendo) {
        audio.pause();
        btnPlayPause.textContent = '▶';
    } else {
        audio.play();
        btnPlayPause.textContent = '⏸';
    }
    reproduciendo = !reproduciendo;
});

// Barra de progreso clickeable
barraProgreso.addEventListener('input', (e) => {
    const porcentaje = e.target.value;
    const tiempo = (porcentaje / 100) * audio.duration;
    audio.currentTime = tiempo;
});

// Cuando termina la canción
audio.addEventListener('ended', () => {
    reproduciendo = false;
    btnPlayPause.textContent = '▶';
    barraProgreso.value = 0;
    tiempoActual.textContent = '0:00';
});