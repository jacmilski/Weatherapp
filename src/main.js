
const viewElems = {} // obiekt przetrzymujący elementy jako obiekt globalny

const getDOMElem = (id) => {
    return document.getElementById(id)
}

const connectHTMLElems = () => {
     
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');

    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');

    viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElems.weathermaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
    
} /* przekazujemy nazwę id do parametru id funkcji getDOMElem()
którą tu wywołujemy */

const setupListener = () => {

    viewElems.searchInput.addEventListener('keydown', onEnterSubmit); 
    viewElems.searchButton.addEventListener('click', onClickSubmit);
    viewElems.returnToSearchBtn.addEventListener('click', returnToSearch);
};

import { getWeatherByCity } from './apiService.js'

const initializeApp = () => { 
    connectHTMLElems(); // funkcja chwytająca elementy DOM
    setupListener(); // funkcja mająca zadanie nasłuchiwania zdarzeń na wielu elementach
};

const onEnterSubmit = (event) => {
    
    if (event.key === "Enter") {     // jeśli zdarzenie naciśnięcia klawisza dotyczyło klawisza 'Enter...
        fadeInOut();
        let query = viewElems.searchInput.value; //...przypisujemy wartość (czyli nazwę miasta wpisaną do inputa)
        getWeatherByCity(query) //...i wywołaj funkcję zwracającą żądanie dotyczącą konkretnego miasta (w zmiennej query)
        //która przekazywana jest do parametru 'city' funkcji getWeatherByCity() w pliku apiService.js
        .then(data => { 
            console.log(data);
            switchView();
            fadeInOut();
        });
    }
};
const onClickSubmit = () => {
    let query = viewElems.searchInput.value;
    getWeatherByCity(query)
    .then(data => console.log(data));
    switchView();
};

const fadeInOut = () => {
    if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
        viewElems.mainContainer.style.opacity = '0';
    } else {
        viewElems.mainContainer.style.opacity = '1';
    }
}

const switchView = () => {
    if (viewElems.weatherSearchView.style.display !== 'none') {
        viewElems.weatherSearchView.style.display = 'none';
        viewElems.weatherForecastView.style.display = 'block';
        
    } else {
        viewElems.weatherForecastView.style.display = 'none';
        viewElems.weatherSearchView.style.display = 'flex';
        
    }
}

const returnToSearch = () => {
    fadeInOut();
    setTimeout(() => {
        switchView();
        fadeInOut();
    }, 500)
}

document.addEventListener('DOMContentLoaded', initializeApp);