const _getDOMElem = (id) => { //podkreślnik sugeruje, że ta finkcja ma być używana tylko tutaj
    return document.getElementById(id)
    //będzie zwracać wartości identyfikatorów id np. 'weatherSearchView' itp 
}

export const mapListToDOMElements = listOfId => {
    const _viewElems = {}

    for (const id of listOfId) {
        _viewElems[id] = _getDOMElem(id)
    }

    return _viewElems;
}

