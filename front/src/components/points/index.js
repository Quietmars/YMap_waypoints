import React, { useContext } from "react";
import './style.sass'
import { ctx } from "../../store"

import { PointsItem } from "../../components/pointsItem"

export const Points = () => {

    const { store } = useContext(ctx)

    const renderPointsList = (pointsCollection) => {
        if (pointsCollection) {
            return pointsCollection.toArray().map((point) => {
                return <PointsItem
                    key={point.properties.get('id')}
                    title={point.properties.get('balloonContent')} />
            })
        }
        return <></>
    }

    return renderPointsList(store.pointsCollection)
}