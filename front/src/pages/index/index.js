import React from "react";
import './style.sass'

import { Input } from "../../components/input"
import { Points } from "../../components/points"
import { Map } from "../../components/map";


export const IndexPage = () => {

    return <div className="content">

        <div className="content__input">
            <Input />
            <div className="content__points">
                <Points />
            </div>
        </div>

        <div className="content__map">
            <Map />
        </div>

    </div >
}