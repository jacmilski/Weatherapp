export const getWeatherByCity = (city) => {
    return fetch(`https://www.metaweather.com/api/location/search/?query=${city}` //tu przychodzi stream
    )
    .then(respons => respons.json() // stream zamieniony na obiekt json
    ) 
    .then(data => { //obiekt json zwraca nam tablicę (wcześniej sprawdzono)
        const woeid = data[0].woeid; // 1 el tablicy jest obiektem, z niego wyciągamy to co jest we właściwości 'woeid'
        // i przypisujemy do zmiennej
        return fetch(`https://www.metaweather.com/api/location/${woeid}/`)
        .then(resp => resp.json())
        .then(data => data)
    }); // powtarzamy całą operację dla obiektu woeid
};
