document.addEventListener('DOMContentLoaded', function () {
    const weatherForm = document.getElementById('weatherForm');
    const weatherResult = document.getElementById('weatherResult');

    weatherForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const city = document.getElementById('city').value;
        const apiKey = 'c191247fab9d462ca570267684647cc9'; // Replace with your Weatherbit API key

        try {
            const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const weather = data.data[0];
                const icon = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`;
                weatherResult.innerHTML = `
                    <h2>${weather.city_name}</h2>
                    <img src="${icon}" alt="${weather.weather.description}" class="weather-icon">
                    <p>Temperature: ${weather.temp} °C</p>
                    <p>Weather: ${weather.weather.description}</p>
                    <div class="weather-detail">
                        <div>
                            <i class="fas fa-wind"></i>
                            <p>${weather.wind_spd} m/s</p>
                            <p>Wind Speed</p>
                        </div>
                        <div>
                            <i class="fas fa-tint"></i>
                            <p>${weather.rh} %</p>
                            <p>Humidity</p>
                        </div>
                        <div>
                            <i class="fas fa-thermometer-three-quarters"></i>
                            <p>${weather.app_temp} °C</p>
                            <p>Feels Like</p>
                        </div>
                    </div>
                `;
            } else {
                weatherResult.innerHTML = `<p>No weather data found for "${city}".</p>`;
            }
        } catch (error) {
            weatherResult.innerHTML = `<p>An error occurred while fetching weather data.</p>`;
        }
    });
});
