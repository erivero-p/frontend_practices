// Función para animar el efecto neón en un elemento
function animateNeon(element, maxShadow, interval) {
    let shadowSize = 0;
    let increment = true;

    setInterval(() => {
        // Cambia el tamaño de la sombra
        element.style.textShadow = `
            0 0 ${shadowSize}px #00ffcc, 
            0 0 ${shadowSize * 2}px #00ffcc, 
            0 0 ${shadowSize * 3}px #00ffff, 
            0 0 ${shadowSize * 4}px #00ffff`;

       /*  element.style.boxShadow = `
            0 0 ${shadowSize}px #00ffcc, 
            0 0 ${shadowSize * 2}px #00ffff, 
            0 0 ${shadowSize * 3}px #00ffff`;
 */
        // Ajusta el incremento o decremento del tamaño de sombra
        if (increment) {
            shadowSize++;
            if (shadowSize >= maxShadow) increment = false;
        } else {
            shadowSize--;
            if (shadowSize <= 0) increment = true;
        }
    }, interval);
}

// Obtener elementos a los que se les aplicará el efecto neón
document.addEventListener("DOMContentLoaded", () => {
    const neonText = document.querySelector("h5.custom-text");
    const neonFrame = document.querySelector("div.gif-neon-frame");

    // Iniciar la animación con un máximo de 10px de sombra y un intervalo de 50ms
    animateNeon(neonText, 10, 100);
    animateNeon(neonFrame, 10, 50);
});
