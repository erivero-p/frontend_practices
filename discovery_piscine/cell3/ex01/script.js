const balloon = document.querySelector('#balloon');
let size = 200;
let index = 0;
const colors = ['red', 'green', 'blue'];

function inflateBalloon(amount) {

    size += amount;
    if (size > 420)
        size = 200;
    if (size < 200)
        size = 200;
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
}

balloon.addEventListener('click', function() {
    changeColor(1);
    inflateBalloon(10);
});

function changeColor(sign) {
    index += sign;
    if (index < 0)
        index = 2;
    if (index > 2)
        index = 0;
    balloon.style.backgroundColor = colors[index];
}

balloon.addEventListener('mouseleave', function() {
    changeColor(-1);
    inflateBalloon(-5);
});