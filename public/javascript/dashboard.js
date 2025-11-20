let mySingleChart, myPolarChart

// eslint-disable-next-line no-unused-vars
function drawDashboardChart(drawDashboardChart) {
    const barchartLabels = []
    const barchartValues = []

    const piechartLabels = []
    const piechartValues = []

    drawDashboardChart.forEach((data) => {
        barchartLabels.push(data.issued_at)
        barchartValues.push(data.total_amount)

        piechartLabels.push(data.issued_at)
        piechartValues.push(data.total_amount)
    })

    mySingleChart = new Chart(document.getElementById('singelBarChart'), {
        type: 'bar',
        data: {
            labels: barchartLabels,
            datasets: [
                {
                    label: 'Daily sales',
                    data: barchartValues,
                    borderWidth: '0',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    })

    myPolarChart = new Chart(document.getElementById('polarChart'), {
        type: 'polarArea',
        data: {
            labels: piechartLabels,
            datasets: [
                {
                    data: piechartValues,
                    backgroundColor: Array(5).fill('rgba(0, 123, 255, 0.5)'),
                },
            ],
        },
        options: {
            responsive: true,
        },
    })
}
