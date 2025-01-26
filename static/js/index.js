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

    // create gif image
    const gifImg = document.createElement('img');
    
    // GIF path and fallback image path
    const gifPath = './static/img/cat2sun.gif';
    const fallbackPath = './static/img/cat2sun-first.png';
    
    // set image src
    gifImg.src = gifPath;

    // set class name
    gifImg.className = 'playing-gif';

    // handle gif loading error
    gifImg.onerror = () => {
        gifImg.src = fallbackPath;
    };

    // append image to container
    gifContainer.innerHTML = '';  // clear container
    gifContainer.appendChild(gifImg);

    // enable pointer events
    gifContainer.style.pointerEvents = 'auto';
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
