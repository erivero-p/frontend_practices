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
        if (increment) {
            shadowSize++;
            if (shadowSize >= maxShadow) increment = false;
        } else {
            shadowSize--;
            if (shadowSize <= 0) increment = true;
        }
    }, interval);
}

function animateNeonFrame(element, maxShadow, interval, blinkTimes, restDuration) {
    let shadowSize = maxShadow;
    let decrement = true;
    let blinkCount = 0;
    let isResting = false;

    const animationInterval = setInterval(() => {
        if (isResting) {
            /* during rest we keep max shadow */
            element.style.boxShadow = `
                0 0 ${maxShadow}px #00ffcc, 
                0 0 ${maxShadow * 2}px #00ffff, 
                0 0 ${maxShadow * 3}px #00ffff`;
            return;
        }
        /* changing box shadow when is not resting */
        element.style.boxShadow = `
            0 0 ${shadowSize}px #00ffcc, 
            0 0 ${shadowSize * 2}px #00ffff, 
            0 0 ${shadowSize * 3}px #00ffff`;
        /* adjusting shadow size incrementing/decrementing */
        if (decrement) {
            shadowSize--;
            if (shadowSize <= 0) {
                decrement = false;
            }
        } else {
            shadowSize++;
            if (shadowSize >= maxShadow) {
                decrement = true;
                blinkCount++;

                if (blinkCount >= blinkTimes) {
                    isResting = true;
                    setTimeout(() => {
                        isResting = false;
                        blinkCount = 0;
                    }, restDuration);
                }
            }
        }
    }, interval);
}


// Obtener elementos a los que se les aplicará el efecto neón
document.addEventListener("DOMContentLoaded", () => {

    const neonText = document.getElementById("neon-text");
    const neonFrame = document.querySelector("div.blinking-neon-frame");

    // Iniciar la animación con un máximo de 10px de sombra y un intervalo de 50ms
    animateNeon(neonText, 10, 100);
    animateNeonFrame(neonFrame, 10, 35, 2, 1000);

});
