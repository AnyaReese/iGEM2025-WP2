// Menu button control
const menuBtn = document.querySelector('.menu_btn');
const menuWrap = document.querySelector('.menu_wrap');

// Menu click event
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuWrap.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !menuWrap.contains(event.target)) {
        menuBtn.classList.remove('active');
        menuWrap.classList.remove('active');
    }
});

// Loading animation control
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading-container');
    const mainContent = document.querySelector('.main-content');
    
    if (loader && mainContent) {
        loader.classList.add('fade-out');
        
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.transition = 'opacity 0.8s ease-in';
        }, 300);
    }
});

// Loading timeout protection
setTimeout(() => {
    const loader = document.querySelector('.loading-container');
    const mainContent = document.querySelector('.main-content');
    
    if (loader && loader.style.display !== 'none') {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.transition = 'opacity 0.8s ease-in';
            }
        }, 300);
    }
}, 20000);

// Scroll progress bar control
window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Dynamically get topbar height
function updateTopbarHeight() {
    const topBar = document.querySelector('.top_bar');
    if (topBar) {
        const height = topBar.offsetHeight;
        document.documentElement.style.setProperty('--topbar-height', `${height}px`);
    }
}

// Update height on page load and window resize
window.addEventListener('load', updateTopbarHeight);
window.addEventListener('resize', updateTopbarHeight);

// Set current page highlight (Actually I set it manually in html)
window.addEventListener('load', function() {
    // Get current page URL
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath); // Debug log
    
    // Remove all cur classes
    document.querySelectorAll('.menu_item').forEach(item => {
        item.classList.remove('cur');
    });
    
    // Check if it's homepage
    if (currentPath.endsWith('/index.html') || currentPath.endsWith('/') || currentPath.endsWith('/AnyaIgem/')) {
        document.querySelector('#home')?.classList.add('cur');
        console.log('Setting home as active');
    } 
    // Check other pages
    else {
        const pageName = currentPath.split('/').pop();
        console.log('Page name:', pageName);
        
        if (pageName === 'description.html' || pageName === 'design.html' || pageName === 'implementation.html' || pageName === 'results.html') {
            document.querySelector('#project')?.classList.add('cur');
        } else if (pageName === 'team.html' || pageName === 'attributions.html' || pageName === 'partnership.html') {
            document.querySelector('#team')?.classList.add('cur');
        }
    }
    
    // Output current active element
    const activeElement = document.querySelector('.menu_item.cur');
    console.log('Active element:', activeElement);
});

// Add Home click event
document.querySelector('#home .title')?.addEventListener('click', () => {
    window.location.href = './index.html';  // or use appropriate path
});
