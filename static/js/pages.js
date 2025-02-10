document.addEventListener('DOMContentLoaded', function() {
    // Menu items control
    const menuItems = document.querySelectorAll('.sidebar .t1');
    const menuLinks = document.querySelectorAll('.sidebar .t2 a');
    const sidebarBg = document.querySelector('.sidebarBg');
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
            const pageTitleBottom = pageTitle ? pageTitle.getBoundingClientRect().bottom + window.scrollY : 0;
            const topBarHeight = topBar ? topBar.offsetHeight : 60;
            const footer = document.querySelector('#footer');
            const viewportBottom = scrollTop + window.innerHeight;
            const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity;

            // add anti-shake
            const threshold = 5; // add a buffer zone
            
            if (scrollTop >= (pageTitleBottom - topBarHeight - threshold)) {
                if (!sidebarBg.classList.contains('fixed')) {
                    sidebarBg.classList.add('fixed');
                }
                // 只有当viewport底部接触到footer时才设置footer高度
                if (footer && viewportBottom >= footerTop) {
                    document.documentElement.style.setProperty('--footer-height', `${footer.offsetHeight}px`);
                } else {
                    document.documentElement.style.setProperty('--footer-height', '0px');
                }
            } else {
                if (sidebarBg.classList.contains('fixed')) {
                    sidebarBg.classList.remove('fixed');
                    document.documentElement.style.setProperty('--footer-height', '0px');
                }
            }
        }
    }, { passive: true });

    // Menu item click handler - PC only
    if (window.innerWidth > 900) {
        menuItems.forEach(item => {
            // check if sidebar item has subitems
            const hasSubmenu = item.querySelector('.t2') !== null;
            
            if (hasSubmenu) {
                const titleSpan = item.querySelector('span');
                if (titleSpan) {
                    titleSpan.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const wasActive = item.classList.contains('active');
                        
                        // close other sidebar
                        menuItems.forEach(mi => {
                            if (mi !== item) {
                                mi.classList.remove('active');
                                // remove all links' active state
                                const links = mi.querySelectorAll('a');
                                links.forEach(link => link.classList.remove('active'));
                            }
                        });
                        
                        // toggle active state
                        item.classList.toggle('active');
                        
                        // if collapse menu, remove the link's active state
                        if (!item.classList.contains('active')) {
                            const links = item.querySelectorAll('a');
                            links.forEach(link => link.classList.remove('active'));
                        }
                    });
                }
            } else {
                // for items without submenu, add click handler
                const link = item.querySelector('a');
                if (link) {
                    link.addEventListener('click', function(e) {
                        // remove all other highlights
                        menuItems.forEach(mi => {
                            mi.classList.remove('active');
                            const links = mi.querySelectorAll('a');
                            links.forEach(l => l.classList.remove('active'));
                        });
                        
                        // set current item's highlight
                        item.classList.add('active');
                        this.classList.add('active');
                    });
                }
            }
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
                    const viewportHeight = window.innerHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    const scrollToPosition = targetPosition - (viewportHeight * 0.15); // 定位到视窗15%的位置
                    
                    window.scrollTo({
                        top: scrollToPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Reference link click handler with smooth scroll
    const refLinks = document.querySelectorAll('.content sup a');
    refLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetRef = document.getElementById(targetId);
            if (targetRef) {
                const viewportHeight = window.innerHeight;
                const targetPosition = targetRef.getBoundingClientRect().top + window.scrollY;
                const scrollToPosition = targetPosition - (viewportHeight * 0.15); // 保持一致的定位比例
                
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll spy with Intersection Observer
    const observerOptions = {
        threshold: 0,
        rootMargin: '-20% 0px -20% 0px'
    };

    // find the nearest header
    function findNearestHeader() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.3;
        const sections = Array.from(document.querySelectorAll('.content section[id]'));
        
        // sort by position in the document
        sections.sort((a, b) => {
            const posA = a.getBoundingClientRect().top + window.scrollY;
            const posB = b.getBoundingClientRect().top + window.scrollY;
            return posA - posB;
        });

        // find the first section before the current scroll position
        let currentSection = null;
        for (let section of sections) {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (sectionTop <= scrollPosition) {
                currentSection = section;
            } else {
                break;
            }
        }

        return currentSection;
    }

    // update sidebar highlight
    function updateSidebarHighlight(section) {
        if (!section) return;

        const id = section.id;
        const activeLink = document.querySelector(`.sidebar .t2 a[href="#${id}"]`);
        const activeT1Link = document.querySelector(`.sidebar .t1 > a[href="#${id}"]`);

        // clear all highlights and add inactive
        menuLinks.forEach(link => {
            link.classList.remove('active');
            link.classList.add('inactive');
        });
        menuItems.forEach(item => {
            item.classList.remove('active');
            item.classList.add('inactive');
        });

        if (activeLink) {
            // if t2
            activeLink.classList.add('active');
            activeLink.classList.remove('inactive');
            const parentItem = activeLink.closest('.t1');
            if (parentItem) {
                parentItem.classList.add('active');
                parentItem.classList.remove('inactive');
            }
        } else if (activeT1Link) {
            // if t1
            activeT1Link.classList.add('active');
            activeT1Link.classList.remove('inactive');
            const parentItem = activeT1Link.closest('.t1');
            if (parentItem) {
                parentItem.classList.add('active');
                parentItem.classList.remove('inactive');
            }
        }
    }

    // listen to scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const currentSection = findNearestHeader();
            updateSidebarHighlight(currentSection);
        });
    }, { passive: true });

    // initialize: execute once
    const initialSection = findNearestHeader();
    updateSidebarHighlight(initialSection);

    // initialize: expand the menu item corresponding to the current page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().replace('.html', '');
    menuItems.forEach(item => {
        const clickTarget = item.querySelector('span, a');
        if (!clickTarget) return;
        
        // if is a link, only handle active state
        if (clickTarget.tagName.toLowerCase() === 'a') {
            // handle active state
            clickTarget.addEventListener('click', function(e) {
                menuItems.forEach(mi => {
                    mi.classList.remove('active');
                    mi.classList.add('inactive');
                });
                item.classList.add('active');
                item.classList.remove('inactive');
            });
        } else {
            // span tag keep the original expand/collapse function
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;
                
                const wasActive = this.classList.contains('active');
                menuItems.forEach(mi => {
                    mi.classList.remove('active');
                    mi.classList.add('inactive');
                });
                if (!wasActive) {
                    this.classList.add('active');
                    this.classList.remove('inactive');
                }
            });
        }
    });

    // add collapse and expand button
    const collapseBtn = document.querySelector('.sidebar-collapse-btn');
    const expandBtn = document.querySelector('.sidebar-expand-btn');
    const content = document.querySelector('.content');
    let wasMobileView = false; // add a flag to track if mobile view has been entered

    function toggleMenu(collapsed) {
        // console.log('Toggling menu:', collapsed);
        
        if (collapsed) {
            sidebarBg.classList.add('collapsed');
            content.classList.add('full-width');
        } else {
            sidebarBg.classList.remove('collapsed');
            content.classList.remove('full-width');
        }
        
        // force repaint
        sidebarBg.offsetHeight;
        
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
        collapseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(true);
        });

        // expand button click event
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
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

    // parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const content = document.querySelector('.content');
        const footer = document.querySelector('#footer');
        const viewportHeight = window.innerHeight;
        
        // calculate footer position
        const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : content.scrollHeight;
        const viewportBottom = scrolled + viewportHeight;
        
        // reset when just touching the footer
        if (Math.ceil(viewportBottom) >= Math.floor(footerTop)) {
            requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--scroll-offset', '0px');
                document.documentElement.style.setProperty('--scroll-rotation', '0deg');
            });
            return;
        }
        
        // normal scroll offset calculation
        const rate = scrolled * 0.3;
        requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
            document.documentElement.style.setProperty('--scroll-rotation', `${scrolled * 0.1}deg`);
        });
    });

    // get and set the actual height of content
    function updateContentHeight() {
        const contentHeight = content.scrollHeight;
        document.documentElement.style.setProperty('--content-height', `${contentHeight}px`);
    }

    // initialize the height
    updateContentHeight();

    // recalculate when window size changes
    window.addEventListener('resize', updateContentHeight);

    // Section collapse functionality
    const sections = document.querySelectorAll('.content section');
    
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const collapseBtn = section.querySelector('.section-collapse-btn');
        
        if (header && collapseBtn) {
            // 点击整个header都可以触发折叠
            header.addEventListener('click', (e) => {
                // 防止点击按钮时触发两次
                if (!e.target.closest('.section-collapse-btn')) {
                    toggleSection(section);
                }
            });
            
            // 单独的按钮点击事件
            collapseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSection(section);
            });
        }
    });

    function toggleSection(section) {
        section.classList.toggle('collapsed');
        
        // 保存状态到localStorage
        const sectionId = section.id;
        if (sectionId) {
            localStorage.setItem(
                `section-${sectionId}-collapsed`,
                section.classList.contains('collapsed')
            );
        }
    }

    // 页面加载时恢复折叠状态
    sections.forEach(section => {
        const sectionId = section.id;
        if (sectionId) {
            const isCollapsed = localStorage.getItem(`section-${sectionId}-collapsed`) === 'true';
            if (isCollapsed) {
                section.classList.add('collapsed');
            }
        }
    });

    // 处理所有section的折叠
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // 阻止事件冒泡，避免触发父section的折叠
            e.stopPropagation();
            
            const content = this.nextElementSibling;
            const btn = this.querySelector('.section-collapse-btn');
            
            content.classList.toggle('collapsed');
            btn.classList.toggle('collapsed');
        });
    });

    // 特别处理父section的折叠
    const parentSection = document.querySelector('.parent-section');
    if (parentSection) {
        const parentHeader = parentSection.querySelector('.section-header');
        parentHeader.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const btn = this.querySelector('.section-collapse-btn');
            
            // 折叠父section时同时影响所有子section
            content.classList.toggle('collapsed');
            btn.classList.toggle('collapsed');
        });
    }
});