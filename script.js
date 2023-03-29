const userColor = document.getElementById('user-color');
const modeSelection = document.getElementById('mode-selection');
const generateButton = document.getElementById('generate');
const colorContainer = document.getElementById('color-scheme-container');
const colorCodeContainer = document.getElementById('color-code-container');
const colorModes = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]


colorModes.forEach(colorMode => {
    let option = document.createElement('option');
    option.value = colorMode;
    option.textContent = colorMode;
    modeSelection.appendChild(option);
})


async function getColorScheme() {
    const BASE_URL = 'https://www.thecolorapi.com/scheme?hex=';
    const color = userColor.value.slice(1);
    const mode = modeSelection.value;
    try {

        const url = `${BASE_URL}${color}&mode=${mode}&count=5`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        const colorScheme = await data.colors.map(color => color.hex.value);
       
        return colorScheme;

    } catch (error) {
        console.log(error);
    }

}

generateButton.addEventListener('click', generateHtml);

async function generateHtml() {
    colorContainer.innerHTML = '';
    colorCodeContainer.innerHTML = '';
    try {
        let colorScheme = await getColorScheme();
        colorScheme.forEach(color => {
            let div = document.createElement('div');
            div.classList.add('color');
            div.style.backgroundColor = `${color}`;
            colorContainer.appendChild(div);
            let p = document.createElement('p');
            p.textContent = `${color}`;
            colorCodeContainer.appendChild(p);
            console.log(color);
        })

    } catch (error) {
        console.log(error);
    }
}

userColor.value = '#F55A5A';
modeSelection.value = 'monochrome';

generateHtml();

