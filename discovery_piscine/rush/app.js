function hideHome() {
    document.getElementById('home').style.display = 'none'
};

function viewCV1(cv) {
    hideHome();
    if (cv === 1)
        showCV1();
    else if (cv === 2)
        showCV2();
};

function showHome() {
    document.getElementById('home').style.display = 'block'
}