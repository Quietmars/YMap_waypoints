import React, { useState, useContext } from "react";
import './style.sass'
import { ctx } from "../../store"


export const Input = () => {

    const { store, updStore } = useContext(ctx)
    const [inputValue, setInputValue] = useState('')

    const setValue = (e) => {
        e.preventDefault();
        setInputValue(e.target.value)
    }

    const addNewPoint = (e) => {
        if (e.key === "Enter") {
            const newPoint = new ymaps.GeoObject(
                {
                    geometry: {
                        type: "Point",
                        coordinates: store.map.getCenter()
                    },
                    properties: {
                        id: `id${(new Date()).getTime()}`,
                        balloonContent: inputValue,
                    }
                }, {});
    
            updStore({ ...store, ...store.pointsCollection.add(newPoint) })
            setInputValue('')
        }
    }


    return <input
        onChange={(e) => setValue(e)}
        onKeyPress={(e) => addNewPoint(e)}
        className="input-title" placeholder="Новая точка маршрута" value={inputValue} />
}