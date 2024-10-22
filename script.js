document.addEventListener('DOMContentLoaded', function () {
    // Crop Yield Prediction Chart (Line Chart)
    const cropYieldCtx = document.getElementById('cropYieldChart').getContext('2d');
    const cropYieldChart = new Chart(cropYieldCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            datasets: [{
                label: 'Wheat Yield (Tons)',
                data: [30, 45, 50, 40, 60, 70, 90, 100],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }, {
                label: 'Corn Yield (Tons)',
                data: [25, 35, 40, 50, 55, 65, 80, 95],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Yield (Tons)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    // Market Trends Chart (Bar Chart)
    const marketTrendsCtx = document.getElementById('marketTrendsChart').getContext('2d');
    const marketTrendsChart = new Chart(marketTrendsCtx, {
        type: 'bar',
        data: {
            labels: ['Wheat', 'Corn', 'Rice', 'Soybeans', 'Barley'],
            datasets: [{
                label: 'Price Per Ton (USD)',
                data: [200, 180, 220, 240, 190],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Crops'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    // FullCalendar Initialization
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        events: []  // This is where events will be added dynamically
    });

    calendar.render();

    // Event listener for the crop event form
    document.getElementById('cropEventForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const cropName = document.getElementById('cropName').value;
        const eventType = document.getElementById('eventType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        calendar.addEvent({
            title: cropName + ' - ' + eventType,
            start: startDate,
            end: endDate,
            color: eventType === 'Sowing' ? 'green' : 'orange',
            allDay: true
        });

        document.getElementById('cropEventForm').reset();
    });

    // Image Upload and Preview
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const imageUploadForm = document.getElementById('imageUploadForm');

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        const maxSize = 2 * 1024 * 1024;

        if (file && file.type.startsWith('image/') && file.size <= maxSize) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" class="img-fluid" alt="Uploaded Image">`;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Invalid image file or file size too large.');
            imageInput.value = '';
        }
    });

    imageUploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const file = imageInput.files[0];

        if (file) {
            alert('Image uploaded successfully!');
        } else {
            alert('Please select an image to upload.');
        }
    });

    // Fetch weather data using WeatherAPI
    const weatherAPIKey = '3c65ac913f0d4855a18172439241810';  // Replace with your WeatherAPI key
    const city = 'Mumbai';  // Change this to any city you want to check
    fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Current temperature in ${city}: ${data.current.temp_c}°C`);
            document.getElementById('weatherInfo').innerText = `Current temperature in ${city}: ${data.current.temp_c}°C`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
