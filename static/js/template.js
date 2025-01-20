class Template {
    static async load(options = {}) {
        const {
            title = document.title,
            content = document.querySelector('.main-content').innerHTML
        } = options;

        try {
            // 显示加载动画
            document.body.style.opacity = '0';
            
            // 预加载模板
            const templatePromise = fetch('./template.html').then(res => res.text());
            
            // 同时准备内容
            const mainContent = content;
            
            // 等待模板加载完成
            const template = await templatePromise;
            
            // 替换内容
            const processedTemplate = template
                .replace('{{PAGE_TITLE}}', title)
                .replace('{{MAIN_CONTENT}}', mainContent);
            
            // 一次性更新 DOM
            document.documentElement.innerHTML = processedTemplate;
            
            // 设置当前活动菜单项
            Template.setActiveMenuItem();
            
            // 确保所有资源加载完成后再显示
            window.addEventListener('load', () => {
                document.body.style.opacity = '1';
                document.querySelector('.main-content').style.opacity = '1';
                // 隐藏加载动画
                const loadingContainer = document.querySelector('.loading-container');
                if (loadingContainer) {
                    loadingContainer.style.display = 'none';
                }
            });

        } catch (error) {
            console.error('Error loading template:', error);
            // 发生错误时也要显示页面
            document.body.style.opacity = '1';
        }
    }

    static setActiveMenuItem() {
        const path = window.location.pathname;
        const menuItems = document.querySelectorAll('.menu_item');
        
        menuItems.forEach(item => {
            item.classList.remove('cur');
            if (path.includes('team') && item.id === 'team') {
                item.classList.add('cur');
            } else if (path.includes('project') && item.id === 'project') {
                item.classList.add('cur');
            } else if (path.includes('parts') && item.id === 'parts') {
                item.classList.add('cur');
            } else if (path.includes('experiments') && item.id === 'experiments') {
                item.classList.add('cur');
            } else if (path.includes('human') && item.id === 'human') {
                item.classList.add('cur');
            } else if ((path.includes('index.html') || path === '/') && item.id === 'home') {
                item.classList.add('cur');
            }
        });
    }
}

export default Template;