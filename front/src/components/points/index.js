import React, {useContext} from "react";
import './style.sass'
import { ctx } from "../../store"

import { PointsItem } from "../../components/pointsItem"

export const Points = () => {

    const { store } = useContext(ctx)

    const renderPoins = (points) => {
        return points.list.map((pointId) => {
            return <PointsItem
                key = {points.items[pointId].id}
                title={points.items[pointId].title} />
        })
    }

    return renderPoins(store.points)
}