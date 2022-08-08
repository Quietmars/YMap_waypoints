import React, { useEffect, useContext } from "react";
import './style.sass'
import { ctx } from "../../store"

export const Map = () => {

    const { store, updStore } = useContext(ctx)

    const initMap = () => {
        return new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }

    const createPolyline = () => {
        return new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: []
            },
        }, { strokeWidth: 4 });
    }

    const transformPolyline = (e, pointsCollection) => {
        console.log(e)
    }

    const createPointsCollection = () => {
        const pointsCollection = new ymaps.GeoObjectCollection({}, {
            preset: 'islands#redIcon',
            draggable: true
        })
        pointsCollection.events.add('set', (e) => transformPolyline(pointsCollection))
        pointsCollection.events.add('add', (e) => transformPolyline(pointsCollection))
        pointsCollection.events.add('remove', (e) => transformPolyline(pointsCollection))
        pointsCollection.events.add('geometrychange', (e) => transformPolyline(pointsCollection))
        pointsCollection.events.add('dragend', (e) => transformPolyline(pointsCollection))

        return pointsCollection
    }

    useEffect(() => {
        ymaps.ready(() => {
            if (!store.map) {
                const map = initMap()
                const pointsCollection = createPointsCollection()
                const polyline = createPolyline()

                map.geoObjects.add(pointsCollection)
                map.geoObjects.add(polyline)

                updStore({ ...store, ...{ map: map, pointsCollection: pointsCollection} })
            }
        })
    }, [])

    return (<>
        <div id="map" className="map" />
    </>
    )
}