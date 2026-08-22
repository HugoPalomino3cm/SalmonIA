# SalmonIA — Sistema Inteligente de Monitoreo Acuícola
**Mitigación de Riesgos Biosanitarios y Telemetría Acuícola en Tiempo Real**

![HTML5](https://img.shields.io/badge/HTML5-Estructura-orange?style=flat-square&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Estilos-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Lógica-yellow?style=flat-square&logo=javascript)
![A-Frame](https://img.shields.io/badge/A--Frame-1.4.2-red?style=flat-square)

🔗 **[Ver demo en vivo](https://hugopalomin3cm.github.io/SalmonIA/)**<br>
🎤 **[Ver pitch](https://youtu.be/7Kl1IRQ7FY4)**

Proyecto desarrollado en la **[Pontificia Universidad Católica de Valparaíso](https://www.pucv.cl/)**, en el marco de la asignatura **"Innovación para mi profesión"**.

🏅 **Mención Honrosa al Mejor Proyecto** por su formulación técnica y comercial.

**SalmonIA** es un **prototipo web** de propuesta de solución para la **mitigación de riesgos biosanitarios** en la industria salmonera. Simula un sistema de monitoreo con visualización inmersiva 360° de unidades de cultivo, filtros espectrales y comportamientos de IA teóricos, con el fin de demostrar la viabilidad del concepto.

## Equipo
- [Ariel Leiva](https://github.com/Ariel-Leiva)
- [Franco Bernal](https://github.com/frankezu)
- [Hugo Palomino](https://github.com/HugoPalomino3cm)

## Estructura del proyecto
```
SalmonIA/
├── index.html          # Landing page del sistema
├── dashboard.html      # Panel de control principal
├── css/
│   ├── shared.css      # Variables y estilos globales
│   ├── index.css       # Estilos de la landing page
│   └── dashboard.css   # Estilos del dashboard
├── javascript/
│   ├── index.js        # Lógica del dashboard (telemetría, alertas, IA)
│   └── filters.js      # Control de filtros espectrales 360°
└── assets/
    ├── jaula1.mp4      # Video 360° Unidad de Cultivo 01
    └── jaula2.mp4      # Video 360° Unidad de Cultivo 02
```

## Funcionalidades del prototipo
> ⚠️ Todas las funcionalidades son simuladas con datos estáticos y comportamientos teóricos. El prototipo busca demostrar la viabilidad del concepto, no reemplazar un sistema productivo.

- **Telemetría simulada**: Temperatura sistémica, saturación de O₂ y salinidad con valores de ejemplo actualizados dinámicamente.
- **Visualización inmersiva 360°**: Reproducción de videos esféricos de jaulas mediante A-Frame, representando cámaras submarinas.
- **Filtros espectrales** *(teórico)*: Interfaz que simula modos de espectro visible, termografía infrarroja y contraste multiespectral.
- **HUD de datos por jaula** *(teórico)*: Panel ocultable con indicadores de carga microbiológica, biomasa, dispensación y uso de antimicrobianos.
- **Gestor IA** *(teórico)*: Concepto de módulo autónomo de ajuste nutricional para maximizar inmunidad y reducir tratamientos farmacológicos.
- **Alertas algorítmicas** *(teórico)*: Flujo de detección de sintomatología patológica con protocolo de aislamiento preventivo mediante ROV.

