const param = {
	url : 'https://api.openweathermap.org/data/2.5/',
	appid : 'eef20ab020ebdd299d235e0bdffc7f9e'
}
const cities =  {
	2643743 : "London",
	756135 : "Warsaw",
	699839 : "Nova Kakhovka",
	292223 : "Dubai",
	616051 : "Yerevan",
	611717 : "Tbilisi",
	1835847 : "Seoul",
	1850147 : "Tokyo",
	702550 : "Lviv"

}

function element() {

    let select = document.createElement("select");
    select.id = "city";
    select.style.fontSize = '21px';
    select.style.backgroundColor = 'rgba(167, 158, 158, 0.4)';
    select.style.width = '400px';
    select.style.height = '50px';


    for (let key in cities) {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = cities[key];
        select.append(option);
        option.style.textAlign = 'center';
        option.style.fontSize = '21px';
    }
    document.querySelector('.out').append(select);
    getWeather(); 
}

element();

function getWeather() {
    const cityId  = document.querySelector('#city').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
		return weather.json();
	}).then(showWeather);
}

function showWeather(data) {
	document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '&deg';
	document.querySelector('.disclaimer').innerHTML = data.weather[0]['description'];
	document.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
	document.querySelector('.wind').innerHTML = 'Wind direction: ' + data.wind.deg;
	document.querySelector('.speed').innerHTML = 'Wind speed : ' + data.wind.speed + ' m/s';
	document.querySelector('.pressure').innerHTML = 'Pressure: ' + data.main.pressure + ' millibars';
	
}
getWeather(); 
document.querySelector('#city').onchange = getWeather;
