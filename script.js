async function getWeather(){

    const city =
    document.getElementById("city").value;

    const apiKey =
    "88007a581c4472f76cf2557a2ebcb389";

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response =
    await fetch(url);

    const data =
    await response.json();

    if(data.cod != 200){
        alert(data.message);
        return;
    }


    // current weather

    
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const airUrl =
`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

const airResponse = await fetch(airUrl);
const airData = await airResponse.json();

console.log(airData);

    const forecastUrl =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastResponse = await fetch(forecastUrl);
const forecastData = await forecastResponse.json();
const forecastContainer =
document.getElementById("forecast");

forecastContainer.innerHTML = "";

forecastData.list.slice(0,5).forEach(item => {

    const time = new Date(item.dt_txt)
        .toLocaleTimeString([], {
            hour: 'numeric'
        });

    forecastContainer.innerHTML += `
        <div class="hour">
            <p>${time}</p>
            <p>${Math.round(item.main.temp)}°C</p>
        </div>
    `;
});

    document.getElementById("temp")
    .innerText =
    Math.round(data.main.temp) + "°";

    document.getElementById("cityName")
    .innerText =
    data.name;

    document.getElementById("description")
    .innerText =
    data.weather[0].description;

    document.getElementById("humidity")
    .innerText =
    data.main.humidity + "%";

    document.getElementById("wind")
    .innerText =
    data.wind.speed + " km/h";

    document.getElementById("description").innerText =
data.weather[0].description;

    document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

}