document.addEventListener('DOMContentLoaded', function() {
    // Menu items control
    const menuItems = document.querySelectorAll('.sidebar .t1');
    const menuLinks = document.querySelectorAll('.sidebar .t2 a');
    // const menuBtn = document.querySelector('.menu_btn');
    const menuBg = document.querySelector('.menubg');
    const pageTitle = document.querySelector('.page-title-bg');
    const topBar = document.querySelector('.top_bar');
    // const menuWrap = document.querySelector('.menu_wrap');

    // calculate key positions
    const pageTitleBottom = pageTitle ? pageTitle.offsetTop + pageTitle.offsetHeight : 0;
    const topBarHeight = topBar.offsetHeight;

    // Listen to scroll events to control sidebar position - PC only
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 900) {
            const scrollTop = window.scrollY;
            if (scrollTop >= pageTitleBottom - topBarHeight) {
                menuBg.classList.add('fixed');
            } else {
                menuBg.classList.remove('fixed');
            }
        }
    });

    // Menu item click handler - PC only
    if (window.innerWidth > 900) {
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;
                
                const wasActive = this.classList.contains('active');
                menuItems.forEach(mi => mi.classList.remove('active'));
                if (!wasActive) this.classList.add('active');
            });
        });
    }

    // Menu link click handler with smooth scroll - PC only
    if (window.innerWidth > 900) {
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                menuLinks.forEach(a => a.classList.remove('active'));
                this.classList.add('active');

                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offset = 80;
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll spy with Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const activeLink = document.querySelector(`.sidebar .t2 a[href="#${id}"]`);
            const activeT1Link = document.querySelector(`.sidebar .t1 > a[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                // handle the entering view
                if (activeLink) {
                    // handle the submenu
                    menuLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                    
                    // expand the parent menu item
                    const parentItem = activeLink.closest('.t1');
                    if (parentItem) {
                        menuItems.forEach(item => item.classList.remove('active'));
                        parentItem.classList.add('active');
                    }
                } else if (activeT1Link) {
                    // handle the big title
                    menuLinks.forEach(link => link.classList.remove('active'));
                    menuItems.forEach(item => item.classList.remove('active'));
                    
                    // highlight the current t1 item
                    const parentItem = activeT1Link.closest('.t1');
                    if (parentItem) {
                        parentItem.classList.add('active');
                    }
                    activeT1Link.classList.add('active');
                }
            } else {
                // handle the leaving view
                if (activeLink) {
                    activeLink.classList.remove('active');
                } else if (activeT1Link) {
                    activeT1Link.classList.remove('active');
                    const parentItem = activeT1Link.closest('.t1');
                    if (parentItem) {
                        parentItem.classList.remove('active');
                    }
                }
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

    // add collapse and expand button
    const collapseBtn = document.querySelector('.menu-collapse-btn');
    const expandBtn = document.querySelector('.menu-expand-btn');
    const content = document.querySelector('.content');
    let wasMobileView = false; // add a flag to track if mobile view has been entered

    function toggleMenu(collapsed) {
        if (collapsed) {
            menuBg.classList.add('collapsed');
            content.classList.add('full-width');
        } else {
            menuBg.classList.remove('collapsed');
            content.classList.remove('full-width');
        }
        localStorage.setItem('menuCollapsed', collapsed);
    }

    // check if from link
    const isFromLink = document.referrer.includes(window.location.host);
    
    if (collapseBtn) {
        // get collapse state from localStorage
        const isCollapsed = localStorage.getItem('menuCollapsed') === 'true';
        
        // initialize collapse state: if from link, expand; otherwise use saved state
        if (window.innerWidth <= 900) {
            toggleMenu(true);
        } else if (isFromLink) {
            toggleMenu(false);  // expand when from link
        } else {
            toggleMenu(isCollapsed);  // use saved state
        }

        // collapse button click event
        collapseBtn.addEventListener('click', () => {
            toggleMenu(true);
        });

        // expand button click event
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                toggleMenu(false);
            });
        }
    }

    // handle window size change
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 900) {
            wasMobileView = true; // mark as mobile view entered
            toggleMenu(true);
            menuItems.forEach(item => item.classList.remove('active'));
        } else if (isFromLink) {
            // expand when from link and desktop
            toggleMenu(false);
        } else {
            if (wasMobileView) {
                // expand when from mobile and desktop
                toggleMenu(false);
                wasMobileView = false;
            } else {
                // use saved state
                const isCollapsed = localStorage.getItem('menuCollapsed') === 'true';
                toggleMenu(isCollapsed);
            }
        }
    });

    // Set CSS variables for dynamic heights
    function updateHeights() {
        const bannerHeight = pageTitle ? pageTitle.offsetHeight : 300;
        const topBarHeight = topBar ? topBar.offsetHeight : 60;
        
        document.documentElement.style.setProperty('--banner-height', bannerHeight + 'px');
        document.documentElement.style.setProperty('--topbar-height', topBarHeight + 'px');
    }

    // Initialize heights on load
    updateHeights();

    // Recalculate on window resize
    window.addEventListener('resize', updateHeights);

    // Recalculate after image load (as it may affect banner height)
    if (pageTitle) {
        const bannerImg = pageTitle.querySelector('img');
        if (bannerImg) {
            bannerImg.addEventListener('load', updateHeights);
        }
    }
});