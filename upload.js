let uploadBtn = document.getElementById('upload_front_btn');
let artworkInput = document.getElementById('front_artwork');
let textInput = document.getElementById('front_text');
let fileInputs = [artworkInput, textInput];

let artwork = new Image();
let text = new Image();
let texture = new Image();

fileInputs.forEach(fileInput => fileInput.addEventListener('change', e => uploadImage(e.target)));

function uploadImage(fileInput) {
    file = fileInput.files[0];

    let reader = new FileReader();
    let image = fileInput.id.includes('artwork') ? artwork : text;

    if (file) {
        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        image.src = reader.result;
        previewType = image == artwork ? 'artwork' : 'text';
        preview = document.getElementById(previewType);
        preview.src = image.src
        preview.classList.remove('hidden');
    });
}

uploadBtn.addEventListener('click', e => processImage());

function processImage() {
    let canvas = document.getElementById('canvas');
    texture.src = 'assets/images/' + document.getElementById('texture').value + '.jpg';
    texturePreview = document.getElementById('texture_preview');
    texturePreview.src = texture.src;
    texturePreview.classList.remove('hidden');
    texturePreview.width = artwork.height;
    texturePreview.height = artwork.height;

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        texture.onload = () => {
            // Set canvas size
            canvas.height = artwork.height;
            canvas.width = artwork.width;

            // Draw text image
            ctx.drawImage(text, 0, 0);

            // Process drawn image (white to alpha)
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            imageData.data = normalizeImage(imageData.data);
            ctx.putImageData(imageData, 0, 0);
            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(texture, 0, 0);

            // Draw remaining images
            ctx.globalCompositeOperation = 'destination-over';
            ctx.drawImage(artwork, 0, 0);

            canvas.classList.remove('hidden');
        }
    }
}

function normalizeImage(data) {
    let dataCopy = [...data]; // Create data copy for reference

    for (let i = 3; i < data.length; i += 4) {
        if (checkIfAlpha(data, i)) {
            continue;
        }

        if (checkIfWhite(dataCopy[i - 3], dataCopy[i - 2], dataCopy[i - 1])) {
            data = changeColorToAlpha(data, i);
            continue;
        }
    }

    return data;
}

function changeColorToAlpha(data, i) {
    data[i] = 0;
    return data;
}

function checkIfAlpha(data, i) {
    return data[i] == 0;
}

function checkIfWhite(red, green, blue) {
    return red == 255 && green == 255 && blue == 255;
}
