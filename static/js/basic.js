// 菜单按钮控制
const menuBtn = document.querySelector('.menu_btn');
const menuWrap = document.querySelector('.menu_wrap');

// 菜单点击事件
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuWrap.classList.toggle('active');
});

// 点击外部关闭菜单
document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !menuWrap.contains(event.target)) {
        menuBtn.classList.remove('active');
        menuWrap.classList.remove('active');
    }
});

// 加载动画控制
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

// 加载超时保护
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

// 滚动进度条控制
window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// 动态获取topbar高度
function updateTopbarHeight() {
    const topBar = document.querySelector('.top_bar');
    if (topBar) {
        const height = topBar.offsetHeight;
        document.documentElement.style.setProperty('--topbar-height', `${height}px`);
    }
}

// 页面加载和窗口大小改变时更新高度
window.addEventListener('load', updateTopbarHeight);
window.addEventListener('resize', updateTopbarHeight);
