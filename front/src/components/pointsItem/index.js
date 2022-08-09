import React, { useState } from "react";
import './style.sass'

import { Button } from "../../components/button"

export const PointsItem = ({ title, index, handleDeletePoint, handleChangePointPosition }) => {

    const [pointState, setPointState] = useState({ isVisible: true, isHovered: false })

    const hideClass = !pointState.isVisible ? 'point_hide' : ''
    const hoverClass = pointState.isHovered ? 'point_hovered' : ''


    //скрыть переносимый элемент при начале переноса
    const handleDragStart = (e) => {
        const currentIndex = index //индекс переносиномого элемента
        setTimeout(() => { setPointState({ ...pointState, ...{ isVisible: false } }) }, 0)
        e.dataTransfer.setData('currentIndex', currentIndex)
    }

    //показать переносимый элемент
    const handleDragEnd = (e) => setPointState({ ...pointState, ...{ isVisible: true } })

    //выделить целевой элемент при наведении
    const handleDragOver = (e) => {
        e.preventDefault()
        if (!pointState.isHovered) setPointState({ ...pointState, ...{ isHovered: true } })
    }

    //убрать выделение с целевого элемента
    const handleDragLeave = (e) => setPointState({ ...pointState, ...{ isHovered: false } })

    //Завершение переноса, отпустили кнопку мыши
    const handleDrop = (e) => {
        const targetIndex = index //индекс целевого элемента (значение index зависит от вызваного события)
        const currentIndex = e.dataTransfer.getData('currentIndex')
        setPointState({ ...pointState, ...{ isHovered: false } })
        handleChangePointPosition(currentIndex, targetIndex)
    }

    //const handleDragEnter = (e) => setPointState({ ...pointState, ...{ isHovered: true } })


    return <div className="point-wrap">
        <div
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            //onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`point ${hoverClass} ${hideClass}`} draggable="true">
            <div>{title}</div>
            <Button handleDeletePoint={handleDeletePoint} />
        </div>
    </div>

}