const stockCharts = document.getElementById('stockCharts');

// List of stocks you want to track
const stocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];

// Function to fetch stock data and render charts
async function getStockData() {
    stockCharts.innerHTML = ''; // Clear the container for new charts

    for (const stock of stocks) {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=cqsa29hr01quefaihqf0cqsa29hr01quefaihqfg`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const prices = [
                data.pc ?? 0,
                data.o ?? 0,
                data.h ?? 0,
                data.l ?? 0,
                data.c ?? 0
            ];

            const chartElement = document.createElement('canvas');
            chartElement.id = `chart-${stock}`;
            stockCharts.appendChild(chartElement);

            new Chart(chartElement, {
                type: 'line',
                data: {
                    labels: ['Previous Close', 'Open', 'High', 'Low', 'Current'],
                    datasets: [{
                        label: `${stock} Stock Price`,
                        data: prices,
                        borderColor: prices[4] >= prices[0] ? 'green' : 'red',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Ensure aspect ratio is maintained
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }
}

// Refresh stock data every 60 seconds
setInterval(getStockData, 60000);

// Initial load
getStockData();
