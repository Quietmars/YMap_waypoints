import React, { useContext } from "react";
import './style.sass'
import { ctx } from "../../store"

import { PointsItem } from "../../components/pointsItem"

export const Points = () => {

    const { store, updStore } = useContext(ctx)

    const handleDeletePoint = (point) => {
        updStore({ ...store, ...{ pointsCollection: store.pointsCollection.remove(point) } })
    }

    const handleChangePointPosition = (currentIndex, targetIndex) => {
        const currentPoint = store.pointsCollection.get(currentIndex)
        updStore({
            ...store,
            ...store.pointsCollection.remove(currentPoint),
            ...store.pointsCollection.splice(targetIndex, 0, currentPoint)
        })
    }

    const renderPointsList = (pointsCollection) => {
        if (pointsCollection) {
            return pointsCollection.toArray().map((point, i) => {
                return <PointsItem
                    index={i}
                    key={point.properties.get('id')}
                    title={point.properties.get('balloonContent')}
                    handleDeletePoint={() => handleDeletePoint(point)}
                    handleChangePointPosition={handleChangePointPosition}
                />
            })
        }
        return <></>
    }

    return renderPointsList(store.pointsCollection)
}