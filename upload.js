let frontSideUploaded = 0;
let sides = ['front', 'back'];
let uploadFrontBtn = document.getElementById('upload_front_btn');
let uploadBackBtn = document.getElementById('upload_back_btn');
let frontArtworkInput = document.getElementById('front_artwork');
let frontTextInput = document.getElementById('front_text');
let backArtworkInput = document.getElementById('back_artwork');
let backTextInput = document.getElementById('back_text');
let fileInputs = [frontArtworkInput, frontTextInput, backArtworkInput, backTextInput];
let buttons = [uploadFrontBtn, uploadBackBtn];

let artwork = new Image();
let text = new Image();
let texture = new Image();

window.addEventListener('load', () => {
    console.log('Window loaded');
    uploadBackBtn.disabled = true;
    uploadBackBtn.classList.add('disabled');
});

fileInputs.forEach(fileInput => fileInput.addEventListener('change', e => uploadImage(e.target)));

function uploadImage(fileInput) {
    console.log('upload', fileInput);
    file = fileInput.files[0];
    // Add file type verification here

    side =  fileInput.id.includes('front') ? 'front' : 'back';
    console.log('side', side);

    if (side == 'back' && frontArtworkInput.files.length == 0 && frontTextInput.files.length == 0) return;

    let reader = new FileReader();
    let image = fileInput.id.includes('artwork') ? artwork : text;

    if (file) {
        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        image.src = reader.result;
        previewType = image == artwork ? 'artwork' : 'text';
        console.log(previewType);
        preview = document.getElementById(previewType);
        preview.src = image.src
        preview.classList.remove('hidden');
    });

    console.log('Upload success');
}

buttons.forEach(btn => btn.addEventListener('click', e => processImage()));

function processImage() {
    let canvas = document.getElementById('canvas');
    texture.src = 'uploads/' + document.getElementById('texture').value + '.jpg';
    texturePreview = document.getElementById('texture_preview');
    texturePreview.src = texture.src;
    texturePreview.classList.remove('hidden');
    texturePreview.width = 276;
    texturePreview.height = 276;

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

    frontSideUploaded = 1;
    // enableBackUpload();
}

function normalizeImage(data) {
    let dataCopy = data; // Create data copy for reference
    console.log(data);

    for (let i = 3; i < data.length; i += 4) {
        if (checkIfAlpha(data, i)) {
            continue;
        }

        if (checkIfWhite(dataCopy[i - 3], dataCopy[i - 2], dataCopy[i - 1])) {
            data = changeColorToAlpha(data, i);
            continue;
        }
    }

    console.log(data);
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

function enableBackUpload() {
    uploadBackBtn.disabled = false;
    document.getElementById('back_upload_container').classList.remove('hidden');
}
