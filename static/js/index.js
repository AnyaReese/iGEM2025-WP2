// Desc: Main JS file for the index page
const initDualImageEffect = () => {
    const dualImageContainer = document.querySelector('.dual-image-container');
    const frontImage = document.querySelector('.front-image');

    if (!dualImageContainer || !frontImage) return;

    dualImageContainer.addEventListener('mousemove', (e) => {
        const rect = dualImageContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        frontImage.style.setProperty('--mouse-x', `${x}%`);
        frontImage.style.setProperty('--mouse-y', `${y}%`);
    });

    // reset image position when mouse leaves
    dualImageContainer.addEventListener('mouseleave', () => {
        frontImage.style.setProperty('--mouse-x', '50%');
        frontImage.style.setProperty('--mouse-y', '50%');
    });
};

const initGifControl = () => {
    const gifContainer = document.querySelector('.top-gif-container');
    if (!gifContainer) return;

    // create static and gif images
    const staticImg = document.createElement('img');
    const gifImg = document.createElement('img');
    
    // GIF path
    const gifPath = './static/img/icanmove.gif';
    
    // create a temporary image to load the GIF
    const tempGif = new Image();
    tempGif.src = gifPath;
    tempGif.onload = function() {
        // use canvas to get the first frame of the GIF
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        
        // set images src
        staticImg.src = canvas.toDataURL('image/png');
        gifImg.src = gifPath;
    };

    // set class names
    staticImg.className = 'paused-gif';
    gifImg.className = 'playing-gif';
    gifImg.style.display = 'none';  // hide gif image

    // append images to container
    gifContainer.innerHTML = '';  // clear container
    gifContainer.appendChild(staticImg);
    gifContainer.appendChild(gifImg);

    // enable pointer events
    gifContainer.style.pointerEvents = 'auto';

    // toggle play/pause on click
    let isPlaying = false;
    gifContainer.addEventListener('click', () => {
        if (!isPlaying) {
            // play GIF
            staticImg.style.display = 'none';
            gifImg.style.display = 'block';
            isPlaying = true;
        } else {
            // pause GIF
            staticImg.style.display = 'block';
            gifImg.style.display = 'none';
            isPlaying = false;
        }
    });
};

// Initialize dual image effect
window.addEventListener('load', () => {
    initDualImageEffect();
    initGifControl();
});

function playGif(element) {
    // click event
    element.src = "animation.gif";
}
