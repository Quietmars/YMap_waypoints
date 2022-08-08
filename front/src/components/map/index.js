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

    const transformPolyline = (e) => {
        if (store.pointsCollection) {
            const coordinates = store.pointsCollection.toArray().map((point) => {
                return point.geometry.getCoordinates()
            })
            store.polyline.geometry.setCoordinates(coordinates)
        }
    }

    const createPointsCollection = () => {
        return new ymaps.GeoObjectCollection({}, {
            preset: 'islands#redIcon',
            draggable: true
        })
    }

    useEffect(() => {
        ymaps.ready(() => {
            if (!store.map) {
                const map = initMap()
                const pointsCollection = createPointsCollection()
                const polyline = createPolyline()

                map.geoObjects.add(pointsCollection)
                map.geoObjects.add(polyline)

                updStore({ ...store, ...{ map: map, polyline: polyline, pointsCollection: pointsCollection } })
            }
        })
        if (store.pointsCollection) {
            const transformPolylineEvent = (e) => transformPolyline(e)
            store.pointsCollection.events.add('add', transformPolylineEvent)
            store.pointsCollection.events.add('geometrychange', transformPolylineEvent)
            store.pointsCollection.events.add('remove', transformPolylineEvent)
            //store.pointsCollection.events.add('set', transformPolylineEvent)
            //store.pointsCollection.events.add('dragend', transformPolylineEvent)
            
            return () => {
                store.pointsCollection.events.remove('add', transformPolylineEvent)
                store.pointsCollection.events.remove('geometrychange', transformPolylineEvent)
                store.pointsCollection.events.remove('remove', transformPolylineEvent)
            }
        }
    },[store])

    return (<>
        <div id="map" className="map" />
    </>
    )
}