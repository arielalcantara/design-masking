const canvas = document.getElementById('canvas');
// const artwork = new Image();
// const text = new Image();
// const texture = new Image();
let side = 'front';

// Set image sources
if (side == 'front') {
    artwork.src = "uploads/front-artwork.png";
    text.src = "uploads/front-text.png";
} else if (side == 'back') {
    artwork.src = "uploads/back-artwork.png";
    text.src = "uploads/back-text.png";
}

// // Set image sources
// if (side == 'front') {
//     artwork.src = "uploads/front-artwork.png";
//     text.src = "uploads/front-text.png";
// } else if (side == 'back') {
//     artwork.src = "uploads/back-artwork.png";
//     text.src = "uploads/back-text.png";
// }

texture.src = "uploads/gold3.jpg";

// Assign src for img elements
document.getElementById('artwork').src = artwork.src;
document.getElementById('text').src = text.src;

if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const centerOfX = canvas.width / 2;
    const centerOfY = canvas.height / 2;

    // Add loader here or set canvas size to 0
    canvas.width = 0;
    canvas.height = 0;

    artwork.onload = () => {
        text.onload = () => {
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
                // ctx.imageSmoothingEnabled;
                ctx.globalCompositeOperation = 'source-in';
                ctx.drawImage(texture, 0, 0);

                // let imageFeatheredData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                // imageFeatheredData.data = getFeatheredAreas(imageData.data);

                // Draw remaining images
                // ctx.globalCompositeOperation = 'source-in';
                // ctx.putImageData(imageFeatheredData, 0, 0);
                ctx.globalCompositeOperation = 'destination-over';
                ctx.drawImage(artwork, 0, 0);
            }
        }
    }
}

function normalizeImage(data) {
    let dataCopy = data; // Create data copy for reference
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (!checkIfAlphaIndex(i) || checkIfAlpha(data, i)) {
            continue;
        }

        if (checkIfWhite(dataCopy[i - 3], dataCopy[i - 2], dataCopy[i - 1])) {
            data = changeColorToAlpha(data, i);
            continue;
        }

        // if (calculateRGBStandardDeviation(dataCopy[i - 3], dataCopy[i - 2], dataCopy[i - 1]) < 3) {

        // if (!checkIfBlack(dataCopy[i - 3], dataCopy[i - 2], dataCopy[i - 1])) {
        //     data = changeColorToBlack(data, i);
        //     // data[i] = 255;
        //     continue;
        // }
    }

    console.log(data);
    return data;
}

function changeColorToBlack(data, i) { // For removing image feathering
    data[i - 1] = 0;
    data[i - 2] = 0;
    data[i - 3] = 0;
    // for (let j = 1; j < 4; j++) {
    //     data[i - j] = 0;
    // }

    return data;
}

function changeColorToAlpha(data, i) {
    data[i - 1] = 0;
    data[i - 2] = 0;
    data[i - 3] = 0;
    data[i] = 0;
    return data;
}

function checkIfAlphaIndex(index) {
     return ((index + 1) % 4) == 0;
}

function checkIfAlpha(data, i) {
    return data[i] == 0;
}

function checkIfWhite(red, green, blue) {
    return red == 255 && green == 255 && blue == 255;
}

function checkIfBlack(red, green, blue) {
    return (red + green + blue) == 0;
}

function calculateRGBStandardDeviation(red, green, blue) {
    return Math.sqrt((parseInt(red) + parseInt(green) + parseInt(blue)) / 3);
}

// function changeWhiteToAlpha(data) {
//     dataCopy[i]= data; // Create data copy for reference
//     console.log(data);

//     for (let i = 0; i < data.length; i++) {
//         if ((i + 1) % 4 == 0 && data[i] > 0 && (dataCopy[i - 1] + dataCopy[i - 2] + dataCopy[i - 3]) > 300 && calculateRGBStandardDeviation(dataCopy[i - 1], dataCopy[i - 2], dataCopy[i - 3]) > 25) {
//             data[i] = 0;
//         }
//     }

//     console.log(data);
//     return data;
// }
