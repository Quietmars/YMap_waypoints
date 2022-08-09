import React from "react";
import './style.sass'

export const Button = ({ handleDeletePoint }) => {
    return <button onClick = { handleDeletePoint }
    className = "button button_delete" />
}