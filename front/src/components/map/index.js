import React, { useEffect, useContext } from "react";
import './style.sass'

export const Map = () => {

    const mapInit = () => {
        let YMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }

    useEffect(() => {
        ymaps.ready(mapInit)
    })

    return <div id="map" className="map" />
}