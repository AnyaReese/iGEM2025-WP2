document.addEventListener('DOMContentLoaded', function() {
    // Menu items control
    const menuItems = document.querySelectorAll('.menu .t1');
    const menuLinks = document.querySelectorAll('.menu .t2 a');
    const menuBtn = document.querySelector('.menu_btn');
    const menuBg = document.querySelector('.menubg');
    const banner = document.querySelector('.banner');
    const topBar = document.querySelector('.top_bar');

    // calculate key positions
    const bannerBottom = banner.offsetTop + banner.offsetHeight;
    const topBarHeight = topBar.offsetHeight;

    // Listen to scroll events to control sidebar position
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        // When scrolling past the bottom of the banner, fix the sidebar
        if (scrollTop >= bannerBottom - topBarHeight) {
            menuBg.classList.add('fixed');
        } else {
            menuBg.classList.remove('fixed');
        }
    });

    // Menu item click handler
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return;
            
            const wasActive = this.classList.contains('active');
            menuItems.forEach(mi => mi.classList.remove('active'));
            if (!wasActive) this.classList.add('active');
        });
    });

    // Menu link click handler with smooth scroll
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menuLinks.forEach(a => a.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offset = window.innerWidth <= 900 ? 60 : 80; // Consider the height of the top navigation bar
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Automatically close the menu on mobile
                if (window.innerWidth <= 900) {
                    menuBg.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBg.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Scroll spy with Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // highlight the corresponding menu item
                const id = entry.target.id;
                const activeLink = document.querySelector(`.menu .t2 a[href="#${id}"]`);
                
                if (activeLink) {
                    menuLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                    
                    // expand the parent menu item
                    const parentItem = activeLink.closest('.t1');
                    if (parentItem) {
                        menuItems.forEach(item => item.classList.remove('active'));
                        parentItem.classList.add('active');
                    }
                }
                
                // show section animation
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // observe all sections
    document.querySelectorAll('.content section').forEach(section => {
        observer.observe(section);
    });

    // initialize: expand the menu item corresponding to the current page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().replace('.html', '');
    menuItems.forEach(item => {
        const itemText = item.querySelector('span').textContent.toLowerCase();
        if (itemText.includes(pageName)) {
            item.classList.add('active');
        }
    });
});