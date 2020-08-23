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
    viewElems.searchButton.addEventListener('click', onClickSubmit)
};


const initializeApp = () => { 
    connectHTMLElems(); // funkcja chwytająca elementy DOM
    setupListener(); // funkcja mająca zadanie nasłuchiwania zdarzeń na wielu elementach
};

const onEnterSubmit = () => {};
const onClickSubmit = () => {};



document.addEventListener('DOMContentLoaded', initializeApp);