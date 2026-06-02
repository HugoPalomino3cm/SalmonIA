// Manejo modular de los filtros espectrales por jaula
function setFilterMode(mode, cageId) {
    const container = document.getElementById(cageId);
    if (!container) return;

    // 1. Alternar estado activo solo en los botones de la jaula correspondiente
    const buttons = container.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        btn.classList.toggle('active', text === mode);
    });

    // 2. Aplicar el filtro CSS al canvas específico de esa jaula
    const canvas = container.querySelector('.a-canvas');
    if (canvas) {
        if (mode === 'normal') {
            canvas.style.filter = 'none';
        } 
        else if (mode === 'infrarrojo') {
            canvas.style.filter = 'grayscale(100%) sepia(100%) hue-rotate(320deg) saturate(400%) contrast(150%) brightness(110%)';
        } 
        else if (mode === 'ultravioleta') {
            canvas.style.filter = 'sepia(100%) hue-rotate(240deg) saturate(300%) contrast(150%) brightness(80%)';
        }
    }
}