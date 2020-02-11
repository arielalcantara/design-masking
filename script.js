const canvas = document.getElementById('canvas');
const artwork = new Image();
const text = new Image();
let side = 'front';

if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const centerOfX = canvas.width / 2;
    const centerOfY = canvas.height / 2;

    // Add loader here or set canvas size to 0
    canvas.width = 0;
    canvas.height = 0;
    console.log(canvas.width, canvas.height);

    let width = 150;
    let height = 100;

    if (side == 'front') {
        artwork.src = "uploads/front-artwork.png";
        text.src = "uploads/front-text.png";
    } else if (side == 'back') {
        artwork.src = "uploads/back-artwork.png";
        text.src = "uploads/back-text.png";
    }

    const centerPosX = centerOfX - (width / 2);
    const centerPosY = centerOfY - (height / 2);

    artwork.onload = () => {
        text.onload = () => {
            // Set canvas size
            canvas.height = artwork.height;
            canvas.width = artwork.width;

            let grad = ctx.createLinearGradient(0, 0, 500, 0);
            grad.addColorStop(0, "yellow");
            grad.addColorStop(0.5, "brown");
            grad.addColorStop(1, "yellow");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(text, 0, 0);

            ctx.globalCompositeOperation = 'destination-over';
            ctx.drawImage(artwork, 0, 0);
        }
    }
}
