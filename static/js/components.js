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
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.defer = true;
        document.head.appendChild(script);
        script.onload = initCharts;
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

// Initialize charts
const initCharts = () => {
    const ctx = document.getElementById('myChart')?.getContext('2d');
    const pieCtx = document.getElementById('pieChart')?.getContext('2d');
    
    if (ctx && pieCtx) {
        const lineChart = new Chart(ctx, chartConfig);
        const pieChart = new Chart(pieCtx, pieConfig);

        window.addEventListener('resize', () => {
            lineChart.resize();
            pieChart.resize();
        });
    }
};

// Initialize after page load
window.addEventListener('load', () => {
    loadMathJax();
    loadChartJS();
});
