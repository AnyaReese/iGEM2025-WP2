// MathJax loading
const loadMathJax = () => {
    if (document.querySelector('.math-block')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.id = 'MathJax-script';
        script.async = true;
        document.head.appendChild(script);
    }
};

// Chart.js loading
const loadChartJS = () => {
    if (document.querySelector('.chart-container')) {
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(chartScript);

        const dataLabelsScript = document.createElement('script');
        dataLabelsScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels';
        document.head.appendChild(dataLabelsScript);

        // 等待两个脚本都加载完成后初始化图表
        Promise.all([
            new Promise(resolve => chartScript.onload = resolve),
            new Promise(resolve => dataLabelsScript.onload = resolve)
        ]).then(() => {
            Chart.register(ChartDataLabels);
            initCharts();
        });
    }
};

// Chart configuration
const chartConfig = {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [{
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        resizeDelay: 0,
        onResize: function(chart, size) {
            chart.resize();
        }
    }
};

const pieConfig = {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        resizeDelay: 0,
        onResize: function(chart, size) {
            chart.resize();
        }
    }
};

const aqp0Config = {
    human: {
        type: 'pie',
        data: {
            labels: ['L', 'A', 'G', 'V', 'F', 'S', 'T', 'R', 'P', 'Q', 'N', 'E', 'I', 'Y', 'H', 'M', 'W', 'C', 'D', 'K'],
            datasets: [{
                data: [12.33, 11.0, 9.0, 8.0, 6.67, 6.0, 4.67, 3.33, 4.33, 3.0, 3.0, 2.67, 2.67, 2.67, 2.0, 2.0, 1.67, 0.67, 1.0, 1.0],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',  // L - Soft blue
                    'rgba(230, 126, 34, 0.8)',  // A - Soft orange
                    'rgba(46, 204, 113, 0.8)',  // G - Soft green
                    'rgba(231, 76, 60, 0.8)',   // V - Soft red
                    'rgba(155, 89, 182, 0.8)',  // F - Soft purple
                    'rgba(121, 85, 72, 0.8)',   // S - Soft brown
                    'rgba(255, 105, 180, 0.8)', // T - Soft pink
                    'rgba(189, 195, 199, 0.8)', // R - Soft gray
                    'rgba(149, 165, 166, 0.8)', // P - Soft dark gray
                    'rgba(0, 206, 209, 0.8)',   // Q - Soft cyan
                    'rgba(26, 188, 156, 0.8)',  // N - Soft sea green
                    'rgba(39, 174, 96, 0.8)',   // E - Soft emerald
                    'rgba(241, 196, 15, 0.8)',  // I - Soft yellow
                    'rgba(211, 84, 0, 0.8)',    // Y - Soft dark orange
                    'rgba(52, 73, 94, 0.8)',    // H - Soft dark blue
                    'rgba(127, 140, 141, 0.8)', // M - Soft medium gray
                    'rgba(149, 165, 166, 0.8)', // W - Soft light gray
                    'rgba(22, 160, 133, 0.8)',  // C - Soft teal
                    'rgba(41, 128, 185, 0.8)',  // D - Soft sky blue
                    'rgba(142, 68, 173, 0.8)'   // K - Soft light purple
                ],
                borderWidth: 1,
                borderColor: 'rgba(72, 79, 121, 0.95)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    top: 30
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Human AQP0 Amino Acid Frequency',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 20,
                        family: 'system-ui, -apple-system, sans-serif',
                        weight: '600',
                        color: '#333'
                    }
                },
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        padding: 10,
                        boxWidth: 12,
                        boxHeight: 12,
                        usePointStyle: false,
                    },
                    maxHeight: 100
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        // 只显示大于5%的数值
                        return value > 5 ? value + '%' : '';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            }
        }
    },
    sheep: {
        type: 'pie',
        data: {
            labels: ['L', 'A', 'G', 'V', 'F', 'S', 'T', 'R', 'P', 'Q', 'N', 'E', 'I', 'Y', 'H', 'M', 'W', 'C', 'D', 'K'],
            datasets: [{
                data: [12.67, 10.67, 8.67, 8.67, 6.33, 5.67, 5.0, 4.33, 4.33, 2.67, 2.67, 3.0, 3.0, 2.67, 2.0, 1.33, 1.67, 0.67, 0.67, 1.0],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',  // L - Soft blue
                    'rgba(230, 126, 34, 0.8)',  // A - Soft orange
                    'rgba(46, 204, 113, 0.8)',  // G - Soft green
                    'rgba(231, 76, 60, 0.8)',   // V - Soft red
                    'rgba(155, 89, 182, 0.8)',  // F - Soft purple
                    'rgba(121, 85, 72, 0.8)',   // S - Soft brown
                    'rgba(255, 105, 180, 0.8)', // T - Soft pink
                    'rgba(189, 195, 199, 0.8)', // R - Soft gray
                    'rgba(149, 165, 166, 0.8)', // P - Soft dark gray
                    'rgba(0, 206, 209, 0.8)',   // Q - Soft cyan
                    'rgba(26, 188, 156, 0.8)',  // N - Soft sea green
                    'rgba(39, 174, 96, 0.8)',   // E - Soft emerald
                    'rgba(241, 196, 15, 0.8)',  // I - Soft yellow
                    'rgba(211, 84, 0, 0.8)',    // Y - Soft dark orange
                    'rgba(52, 73, 94, 0.8)',    // H - Soft dark blue
                    'rgba(127, 140, 141, 0.8)', // M - Soft medium gray
                    'rgba(149, 165, 166, 0.8)', // W - Soft light gray
                    'rgba(22, 160, 133, 0.8)',  // C - Soft teal
                    'rgba(41, 128, 185, 0.8)',  // D - Soft sky blue
                    'rgba(142, 68, 173, 0.8)'   // K - Soft light purple
                ],
                borderWidth: 1,
                borderColor: 'rgba(72, 79, 121, 0.95)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    top: 30
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sheep AQP0 Amino Acid Frequency',
                    padding: {
                        bottom: 10
                    },
                    font: {
                        size: 20,
                        family: 'system-ui, -apple-system, sans-serif',
                        weight: '600',
                        color: '#333'
                    }
                },
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        padding: 10,
                        boxWidth: 12,
                        boxHeight: 12,
                        usePointStyle: false,
                    },
                    maxHeight: 100
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        return value > 5 ? value + '%' : '';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            }
        }
    }
};

// Initialize charts
const initCharts = () => {
    console.log('Initializing charts...');
    const humanCtx = document.getElementById('humanAQP0Chart')?.getContext('2d');
    const sheepCtx = document.getElementById('sheepAQP0Chart')?.getContext('2d');
    
    if (humanCtx && sheepCtx) {
        console.log('Creating charts...');
        const humanChart = new Chart(humanCtx, aqp0Config.human);
        const sheepChart = new Chart(sheepCtx, aqp0Config.sheep);

        window.addEventListener('resize', () => {
            humanChart.resize();
            sheepChart.resize();
        });
    } else {
        console.log('Canvas contexts not found');
    }
};

// Initialize after page load
window.addEventListener('load', () => {
    console.log('Page loaded');
    loadMathJax();
    loadChartJS();
});
