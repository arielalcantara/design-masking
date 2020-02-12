const canvas = document.getElementById('canvas');
const artwork = new Image();
const text = new Image();
const texture = new Image();
let side = 'front';

// Set image sources
if (side == 'front') {
    artwork.src = "uploads/front-artwork.png";
    text.src = "uploads/front-text.png";
} else if (side == 'back') {
    artwork.src = "uploads/back-artwork.png";
    text.src = "uploads/back-text.png";
}

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
    console.log(canvas.width, canvas.height);

    artwork.onload = () => {
        text.onload = () => {
            texture.onload = () => {
                // Set canvas size
                canvas.height = artwork.height;
                canvas.width = artwork.width;

                // Draw images
                ctx.drawImage(text, 0, 0);
                ctx.globalCompositeOperation = 'source-in';
                ctx.drawImage(texture, 0, 0);
                ctx.globalCompositeOperation = 'destination-over';
                ctx.drawImage(artwork, 0, 0);
            }
        }
    }
}
