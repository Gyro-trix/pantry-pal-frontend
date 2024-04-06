import React from "react";
import { THEME } from "../config/localStorage";
import { lightTheme } from "../utils/display";

function Button(props) {
    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr) : lightTheme

    const text = props.text
    const style = props.style

    return (
        <button type="button" className={theme.button} style={style} onClick={props.click()}>{text}</button>
    )
}
export default Button