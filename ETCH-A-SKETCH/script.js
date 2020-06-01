// Selectors
const blackBtn = document.querySelector('#black');
const darkenBtn = document.querySelector('#darken');
const randomBtn = document.querySelector('#random');
const resetBtn = document.querySelector('#reset');
const container = document.querySelector('.container');

// Event listeners
document.addEventListener('DOMContentLoaded', resetGrid(16))
blackBtn.addEventListener('click', blackGrid);
darkenBtn.addEventListener('click', darkenGrid);
randomBtn.addEventListener('click', randomGrid);
resetBtn.addEventListener('click', function() {
    let num = prompt('Enter your grid size', '16');

    // if num is empty, assign a default value (16)
    num = num === '' ? 16 : num;

    resetGrid(num);
})

// Functions
function blackGrid() { colorMode('black'); }
function darkenGrid() { colorMode('darken'); }
function randomGrid() { colorMode('random'); }

function colorMode(mode) {
    const divs = document.querySelectorAll('.container div');

    switch (mode) {
        case 'black':
            divs.forEach(pixel => pixel.removeEventListener('mouseover', randomPixel));
            divs.forEach(pixel => pixel.removeEventListener('mouseover', darkenPixel));
            divs.forEach(pixel => pixel.addEventListener('mouseover', blackPixel));
            randomBtn.classList.remove('active');
            darkenBtn.classList.remove('active');
            blackBtn.classList.add('active');
            break;
        case 'darken':
            divs.forEach(pixel => pixel.removeEventListener('mouseover', blackPixel));
            divs.forEach(pixel => pixel.removeEventListener('mouseover', randomPixel));
            divs.forEach(pixel => pixel.addEventListener('mouseover', darkenPixel));
            blackBtn.classList.remove('active');
            randomBtn.classList.remove('active');
            darkenBtn.classList.add('active');
            break;
        case 'random':
            divs.forEach(pixel => pixel.removeEventListener('mouseover', blackPixel));
            divs.forEach(pixel => pixel.removeEventListener('mouseover', darkenPixel));
            divs.forEach(pixel => pixel.addEventListener('mouseover', randomPixel));
            blackBtn.classList.remove('active');
            darkenBtn.classList.remove('active');
            randomBtn.classList.add('active');
            break;
    }
}

function blackPixel(e) {
    e.target.classList.remove('darken');
    e.target.style.backgroundColor = 'rgb(0, 0, 0)';
    e.target.style.border = 'none';
}

function darkenPixel(e) {
    if (!e.target.classList.contains('darken')) {
        e.target.style.backgroundColor = darkenColor('rgb(255, 255, 255)');
        e.target.classList.add('darken');
    }

    else {
        e.target.style.backgroundColor = darkenColor(e.target.style.backgroundColor);
    }

    e.target.style.border = 'none';
}

function randomPixel(e) {
    e.target.classList.remove('darken');
    e.target.style.backgroundColor = 
        `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    e.target.style.border = 'none';
}

function resetGrid(num = 16) {
    container.innerHTML = '';

    container.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;

    for (let rows = 0; rows < num; rows++) {
        for (let cols = 0; cols < num; cols++) {
            const div = document.createElement('div');
            container.appendChild(div);
        }
    }

    blackGrid();
}

function darkenColor(color) {
    const colorValues = color.slice(4, color.length - 1).split(', ');

    let amt = Math.round(2.55 * 10);

    let R = colorValues[0] - amt;
    let G = colorValues[1] - amt;
    let B = colorValues[2] - amt;

    return `rgb(${R}, ${G}, ${B})`;
}
