document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key

    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const weatherInfo = document.getElementById('weatherInfo');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location.trim() === '') {
            alert('Please enter a location');
            return;
        }
        getWeatherData(location);
    });

    async function getWeatherData(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod !== 200) {
                weatherInfo.textContent = data.message;
                return;
            }
            displayWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        weatherInfo.innerHTML = `<p>Location: ${name}</p>
                                 <p>Temperature: ${temperature}°C</p>
                                 <p>Description: ${description}</p>`;
    }
});
