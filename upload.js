let frontSideUploaded = 0;
let sides = ['front', 'back'];
let frontArtworkFile = document.getElementById('front_artwork');

frontArtworkFile.addEventListener('change', (e) => {
    console.log(e);
});

const UPLOAD_FRONT_BTN = document.getElementById('upload_front_btn');
UPLOAD_FRONT_BTN.addEventListener('click', () => {
    uploadImage('front');
});

const UPLOAD_BACK_BTN = document.getElementById('upload_back_btn');
UPLOAD_BACK_BTN.addEventListener('click', () => {
    uploadImage('back');
});

function uploadImage(side) {
    let frontArtworkFile = document.getElementById('front_artwork').files[0];
    let frontTextFile = document.getElementById('front_text').files[0];
    let backArtworkFile = document.getElementById('back_artwork').files[0];
    let backTextFile = document.getElementById('back_text').files[0];
    let files = {
        front: {
            artwork: frontArtworkFile,
            text: frontTextFile
        },
        back: {
            artwork: backArtworkFile,
            text: backTextFile
        }
    };

    if (side && side.length > 0 && sides.includes(side)) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();

        formData.append('side', side);
        formData.append('artwork', files[side].artwork);
        formData.append('text', files[side].text);

        xhr.open('POST', 'upload.php');
        xhr.send(formData);
        // return;
    }
}
