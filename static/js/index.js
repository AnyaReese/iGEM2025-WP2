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

// Initialize dual image effect
window.addEventListener('load', initDualImageEffect);
