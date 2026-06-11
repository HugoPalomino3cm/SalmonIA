/* =========================================
   1. MÓDULO DE SIMULACIÓN DE SENSORES
========================================= */
class AquacultureSensors {
    constructor() {
        this.tempElement = document.getElementById('stat-temp');
        this.o2Element = document.getElementById('stat-o2');
        this.salElement = document.getElementById('stat-salinity');
        
        this.currentTemp = 11.2; 
        this.currentO2 = 8.5;    
        this.currentSal = 32.4;
        
        this.currentBactJ1 = 120;
        this.currentBioJ1 = 1250.0;
        
        this.currentBactJ2 = 125; 
        this.currentBioJ2 = 1280.0;

        this.currentFeedJ1 = 14.5;
        this.currentFeedJ2 = 14.2;

        this.intervalId = null;
        this.salmonQuarantined = false;

        this.logs = [
            "IA Nutricional: Ajustando raciones en tiempo real para maximizar inmunidad natural y evitar tratamientos farmacológicos.",
            "IA Nutricional: Patrón de nado nominal. Suministro de alimento dosificado algorítmicamente.",
            "IA Nutricional: Distribución de alimento optimizada. Reducción de desperdicios en 4.2%.",
            "Condiciones biosanitarias estables. Sin eventos anómalos en el último ciclo de monitoreo (48h)."
        ];
        this.logIndex = 0;
    }

    fluctuate() {
        // Temperatura, O2 y Salinidad general
        this.currentTemp += (Math.random() * 0.1) - 0.05;
        this.currentO2 += (Math.random() * 0.2) - 0.1;
        this.currentSal += (Math.random() * 0.04) - 0.02;

        this.currentTemp = this.clamp(this.currentTemp, 9.5, 12.5);
        this.currentO2 = this.clamp(this.currentO2, 7.5, 9.5);
        this.currentSal = this.clamp(this.currentSal, 31.0, 34.0);

        // Jaula 1 - Variación normal (UFC y Biomasa)
        this.currentBactJ1 += Math.floor((Math.random() * 7) - 3);
        this.currentBactJ1 = this.clamp(this.currentBactJ1, 100, 150);
        
        this.currentBioJ1 += (Math.random() * 0.2) - 0.1;
        this.currentBioJ1 = this.clamp(this.currentBioJ1, 1245.0, 1255.0);

        // Jaula 2 - Carga bacteriana y Biomasa (normal)
        this.currentBactJ2 += Math.floor((Math.random() * 7) - 3);
        this.currentBactJ2 = this.clamp(this.currentBactJ2, 100, 150);

        this.currentBioJ2 += (Math.random() * 0.2) - 0.1;
        this.currentBioJ2 = this.clamp(this.currentBioJ2, 1275.0, 1285.0);

        // Alimentación (IA)
        this.currentFeedJ1 += (Math.random() * 0.4) - 0.2;
        this.currentFeedJ1 = this.clamp(this.currentFeedJ1, 13.5, 15.5);

        this.currentFeedJ2 += (Math.random() * 0.4) - 0.2;
        this.currentFeedJ2 = this.clamp(this.currentFeedJ2, 13.5, 15.5);

        // Rotar logs
        if (Math.random() > 0.7) {
            this.logIndex = (this.logIndex + 1) % this.logs.length;
        }

        this.updateUI();
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    updateUI() {
        if (this.tempElement) this.tempElement.textContent = `Temperatura Sistémica: ${this.currentTemp.toFixed(1)} °C`;
        if (this.o2Element) this.o2Element.textContent = `Saturación O₂: ${this.currentO2.toFixed(1)} mg/L`;
        if (this.salElement) this.salElement.textContent = `Salinidad: ${this.currentSal.toFixed(1)} PSU`;

        // Obtener elementos en tiempo real en caso de que cambien en el DOM
        const bactJ1 = document.getElementById('stat-bact-j1');
        const bioJ1 = document.getElementById('stat-bio-j1');
        const bactJ2 = document.getElementById('stat-bact-j2');
        const bioJ2 = document.getElementById('stat-bio-j2');

        const feedJ1 = document.getElementById('stat-feed-j1');
        const feedJ2 = document.getElementById('stat-feed-j2');
        const globalLog = document.getElementById('global-log');

        if (bactJ1) bactJ1.textContent = `Carga Microbiológica: ${Math.round(this.currentBactJ1)} UFC/ml`;
        if (bioJ1) bioJ1.textContent = `Biomasa Total: ${this.currentBioJ1.toFixed(1)} TON`;

        if (bactJ2) bactJ2.textContent = `Carga Microbiológica: ${Math.round(this.currentBactJ2)} UFC/ml`;
        if (bioJ2) bioJ2.textContent = `Biomasa Total: ${this.currentBioJ2.toFixed(1)} TON`;

        if (feedJ1) feedJ1.textContent = `Dispensación IA: ${this.currentFeedJ1.toFixed(1)} kg/min`;
        if (feedJ2) feedJ2.textContent = `Dispensación IA: ${this.currentFeedJ2.toFixed(1)} kg/min`;

        if (globalLog) globalLog.textContent = this.logs[this.logIndex];
    }

    setSalmonQuarantined() {
        this.salmonQuarantined = true;
        this.updateUI(); // Forzar actualización visual inmediata
    }

    start(intervalMs = 3500) {
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
// Llevar a cuarentena al salmón enfermo (Jaula 2)
function quarantineSalmon() {
    const btn = document.getElementById('btn-quarantine');
    if (!btn) return;

    btn.innerText = 'Inicializando Protocolo...';
    btn.style.background = 'var(--success)';
    btn.disabled = true;

    setTimeout(() => {
        // 1. Actualizar el banner de estado superior de la Jaula 2
        const statusBadge = document.getElementById('status-j2');
        statusBadge.innerText = 'ESTADO NOMINAL';
        statusBadge.className = 'status-badge success';
        statusBadge.style.background = ''; // Dejar que la clase CSS maneje el color

        // 2. Volver el contenedor a estilo normal
        document.getElementById('cage-2').classList.remove('alert-layout');

        // 3. Limpiar el panel de acciones inferior
        document.getElementById('prediction-panel-j2').innerHTML = `
            <p class="meta-text" style="color: var(--success)">Operación de aislamiento concluida satisfactoriamente. Restableciendo parámetros de monitoreo estándar.</p>
        `;

        // 5. Notificar a la simulación
        if (window.sensorMonitor) {
            window.sensorMonitor.setSalmonQuarantined();
        }

    }, 1500);
}

/* =========================================
   3. INICIALIZACIÓN AL CARGAR LA PÁGINA
========================================= */
// Iniciar fluctuación de sensores
document.addEventListener('DOMContentLoaded', () => {
    window.sensorMonitor = new AquacultureSensors();
    // Actualiza los datos cada 3.5 segundos
    window.sensorMonitor.start(3500); 
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