//Basic globals
const apiKey = "32c873ef9169fc82e9615322fb3782c7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

//Search program
const weatherIcon = document.getElementById('weatherIcon');
const searchBox = document.querySelector('.search input');
let srcButton = document.querySelector('button');


//Main sauce
let city = document.querySelector('.info h2');
let temperature = document.querySelector('.info h1');
let wind = document.getElementById('windspeed');
let humidity = document.getElementById('humidity');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');

// Manchester Display:
async function manchester () {
    const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=manchester&appid=32c873ef9169fc82e9615322fb3782c7&units=metric`)).json();

        

        city.innerHTML = data.name;  
        temperature.innerHTML = Math.round(data.main.temp) + "°C";  
        wind.innerHTML = "Wind Speed:" + " " + data.wind.speed + "km/h";
        humidity.innerHTML = "Humidity:"+ " " + data.main.humidity + "%";

        if(data.weather[0].main == 'Clouds') {
            weatherIcon.src = "images/clouds.png"
        } else if(data.weather[0].main == 'Clear') {
            weatherIcon.src = "images/clear.png"
        } else if(data.weather[0].main == 'Rain') {
            weatherIcon.src = "images/rain.png"
        } else if(data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "images/drizzle.png"
        } else if(data.weather[0].main == 'Mist') {
            weatherIcon.src = "images/mist.png"
        } 

        const feelsLike = document.getElementById('feels');
        feelsLike.innerHTML = `Feels Like: ${Math.round(data.main.feels_like)} °C`
        const highest = document.getElementById('highest');
        highest.innerHTML = `Highest: ${Math.round(data.main.temp_max)} °C`
        const lowest = document.getElementById('lowest');
        lowest.innerHTML = `Lowest: ${Math.round(data.main.temp_min)} °C`
        const pressure = document.getElementById('pressure');
        pressure.innerHTML = `Pressure: ${data.main.pressure} Pa`

        const sunriseTime = new Date (data.sys.sunrise * 1000);
        sunrise.innerHTML = `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`

        const sunsetTime = new Date (data.sys.sunset * 1000);
        sunset.innerHTML = `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`

}

manchester();

//Search location function
async function checkWeather (place) {
    const data = await (await fetch(apiUrl + place + `&appid=${apiKey}`)).json();

    console.log(data)

        city.innerHTML = data.name;  
        temperature.innerHTML = Math.round(data.main.temp) + "°C";  
        wind.innerHTML = "Wind Speed:" + " " + data.wind.speed + "km/h";
        humidity.innerHTML = "Humidity:"+ " " + data.main.humidity + "%";

        if(data.weather[0].main == 'Clouds') {
            weatherIcon.src = "images/clouds.png"
        } else if(data.weather[0].main == 'Clear') {
            weatherIcon.src = "images/clear.png"
        } else if(data.weather[0].main == 'Rain') {
            weatherIcon.src = "images/rain.png"
        } else if(data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "images/drizzle.png"
        } else if(data.weather[0].main == 'Mist') {
            weatherIcon.src = "images/mist.png"
        } 

        const feelsLike = document.getElementById('feels');
        feelsLike.innerHTML = `Feels Like: ${Math.round(data.main.feels_like)} °C`
        const highest = document.getElementById('highest');
        highest.innerHTML = `Highest: ${Math.round(data.main.temp_max)} °C`
        const lowest = document.getElementById('lowest');
        lowest.innerHTML = `Lowest: ${Math.round(data.main.temp_min)} °C`
        const pressure = document.getElementById('pressure');
        pressure.innerHTML = `Pressure: ${data.main.pressure} Pa`

        const sunriseTime = new Date ((data.sys.sunrise + data.timezone) * 1000);
        sunrise.innerHTML = `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`

        const sunsetTime = new Date ((data.sys.sunset + data.timezone) * 1000);
        sunset.innerHTML = `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`

}
//Button activator
srcButton.addEventListener('click', ()=>{
    checkWeather(searchBox.value.toLowerCase());  
});


//Popular cities: 

const cities = ['tokyo', 'sydney', 'paris', 'chicago', 'warsaw', 'berlin'];

async function popularCities () {

    for(let i = 0; i < cities.length; i++) {
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=32c873ef9169fc82e9615322fb3782c7&units=metric`)).json();
        
        let weather = document.createElement('img');
        weather.classList = 'popularimages';

    
        
        if(data.weather[0].main == 'Clouds') {
            weather.src = 'images/clouds.png'
        } else if(data.weather[0].main == 'Clear') {
            weather.src = 'images/clear.png'
        } else if(data.weather[0].main == 'Drizzle') {
            weather.src = 'images/drizzle.png'
        } else if(data.weather[0].main == 'Rain') {
            weather.src = 'images/rain.png'
        } else if(data.weather[0].main == 'Snow') {
            weather.src = 'images/snow.png'
        }


        const parentElement = document.getElementById('popularCities');

        const flexdiv = document.createElement('div');
        flexdiv.classList = 'flexmagic';

        const item1 = document.createElement('div');
        item1.classList = 'item1';

        const place = document.createElement('p');
        place.classList = 'popularname';
        place.innerHTML = `${cities[i].toUpperCase()}`;
        
        const item2 = document.createElement('div');
        item2.classList = 'item2'

        const citytemp = document.createElement('p');
        citytemp.classList = `populartemperature`;
        citytemp.innerHTML = Math.round(data.main.temp) + "°C";

        parentElement.appendChild(flexdiv);

        item1.appendChild(place);
        item2.appendChild(citytemp);
        item2.appendChild(weather);
        flexdiv.appendChild(item1);
        flexdiv.appendChild(item2);

    }


}

popularCities()



