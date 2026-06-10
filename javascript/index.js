/* =========================================
   1. MÓDULO DE SIMULACIÓN DE SENSORES
========================================= */
class AquacultureSensors {
    constructor() {
        const statsElements = document.querySelectorAll('.quick-stats span');
        
        if (statsElements.length >= 2) {
            this.tempElement = statsElements[0];
            this.o2Element = statsElements[1];
            
            this.currentTemp = 12.4; 
            this.currentO2 = 8.2;    
            
            this.intervalId = null;
        }
    }

    fluctuate() {
        const tempDelta = (Math.random() * 0.3) - 0.15;
        const o2Delta = (Math.random() * 0.4) - 0.2;

        this.currentTemp += tempDelta;
        this.currentO2 += o2Delta;

        this.currentTemp = this.clamp(this.currentTemp, 10.0, 14.5);
        this.currentO2 = this.clamp(this.currentO2, 6.5, 9.5);

        this.updateUI();
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    updateUI() {
        if (this.tempElement && this.o2Element) {
            this.tempElement.textContent = `Temp. General: ${this.currentTemp.toFixed(1)} °C`;
            this.o2Element.textContent = `O₂ Promedio: ${this.currentO2.toFixed(1)} mg/L`;
        }
    }

    start(intervalMs = 3500) {
        if (!this.tempElement) return;

        this.stop(); 
        this.updateUI();
        this.intervalId = setInterval(() => this.fluctuate(), intervalMs);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

/* =========================================
   2. INTERACCIONES OPERACIONALES
========================================= */
// Despliegue de mitigación biológica (Jaula 2)
function deployProbiotics() {
    const btn = document.getElementById('btn-probiotics');
    if (!btn) return;

    btn.innerText = '✓ Desplegando Probióticos...';
    btn.style.background = 'var(--success)';
    btn.disabled = true;

    setTimeout(() => {
        // 1. Actualizar el banner de estado superior de la Jaula 2
        const statusBadge = document.getElementById('status-j2');
        statusBadge.innerText = 'ESTABILIZADO';
        statusBadge.className = 'status-badge success';

        // 2. Volver el contenedor a estilo normal
        document.getElementById('cage-2').classList.remove('alert-layout');

        // 3. Modificar el HUD sobre el video
        document.getElementById('hud-data-j2').innerHTML = `
            <p>ESTADO: CONTRARRESTADO</p>
            <p style="color: var(--success)">Probióticos activos (94% absorción)</p>
        `;

        // 4. Limpiar el panel de acciones inferior
        document.getElementById('prediction-panel-j2').innerHTML = `
            <p class="meta-text" style="color: var(--success)">✓ Intervención exitosa. Carga bacteriana en descenso controlado.</p>
        `;
    }, 1200);
}

/* =========================================
   3. INICIALIZACIÓN AL CARGAR LA PÁGINA
========================================= */
// Iniciar fluctuación de sensores
document.addEventListener('DOMContentLoaded', () => {
    const sensorMonitor = new AquacultureSensors();
    // Actualiza los datos cada 3.5 segundos
    sensorMonitor.start(3500); 
});

// Forzar reproducción de videos (Autoplay)
window.addEventListener('load', () => {
    // Buscar todos los videos en la página
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // 1. Intentar forzar el play mediante código
        let playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Éxito: El navegador permitió el autoplay
                console.log("Video reproduciéndose correctamente.");
            }).catch(error => {
                // Fallo: El navegador bloqueó el autoplay por seguridad.
                console.warn("Autoplay bloqueado. Esperando interacción...");
                
                // 2. Si lo bloquea, reproducirlo automáticamente 
                // en cuanto el usuario haga su PRIMER clic en cualquier parte de la pantalla.
                document.body.addEventListener('click', () => {
                    video.play();
                }, { once: true }); // El "once: true" asegura que este evento solo se dispare una vez
            });
        }
    });
});