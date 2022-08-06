import React from "react";
import './style.sass'

import { Button } from "../../components/button"


export const PointsItem = ({title}) => {

    return <div className="point">
        <div>{title}</div>
        <Button />
    </div>

}