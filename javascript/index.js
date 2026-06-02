// Lógica general e interacciones operacionales del Dashboard

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