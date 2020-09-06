import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
    constructor() {
        this.viewElems = {}
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }
    // kluczami będą dotychczasowe wartości identyfikatorów, a wartościami całe elementy HTML

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    errFindingCity = () => {
        this.viewElems.searchInput.style.borderColor = 'red';
        const p = document.createElement('p');
        p.innerText = 'nie znaleziono miasta';
        p.style.color = 'red';
        this.viewElems.searchInput.after(p);
    }

    errRemove = () => {
        console.log(p)
    }


    handleSubmit = () => {
        if (event.type === 'click' || event.key === 'Enter') {
            this.fadeInOut();      
            let query = this.viewElems.searchInput.value; //...przypisujemy wartość (czyli nazwę miasta wpisaną do inputa)
            getWeatherByCity(query) //...i wywołaj funkcję zwracającą żądanie dotyczącą konkretnego miasta (w zmiennej query)
        //która przekazywana jest do parametru 'city' funkcji getWeatherByCity() w pliku apiService.js
            .then(data => { 
            this.displayWeatherData(data);
            this.viewElems.searchInput.style.borderColor = 'black';            
        }).catch(() => {
            this.fadeInOut();
            this.errFindingCity();
        })
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }

    switchView = () => {
        if (this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'block';
            
        } else {
            this.viewElems.weatherForecastView.style.display = 'none';
            this.viewElems.weatherSearchView.style.display = 'flex';
            
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
        const removeP = document.querySelector('p');
        removeP.remove();
        setTimeout(() => {
            this.switchView();
            this.fadeInOut();
        }, 500)
    }

    displayWeatherData = data => {
        this.switchView();
        this.fadeInOut();
        const weather = data.consolidated_weather[0];
        this.viewElems.weatherCity.innerText = data.title;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt = weather.weather_state_name;
        const currentTemp = weather.the_temp.toFixed(2); 
        const maxTemp = weather.max_temp.toFixed(2);
        const minTemp = weather.min_temp.toFixed(2);    
        this.viewElems.weatherCurrentTemp.innerText = `Current temp : ${currentTemp}°C`; 
        this.viewElems.weatherMaxTemp.innerText = `Max temp : ${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText =`Min temp : ${minTemp}°C`;    
    }

} // tu się kończy klasa

document.addEventListener('DOMContentLoaded', new WeatherApp());
