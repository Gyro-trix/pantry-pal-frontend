import React,{useState} from "react";
import { THEME } from "../config/localStorage";
import { lightTheme } from "../utils/display";
import { displayDate } from "../utils/storage";
import * as Icon from 'react-bootstrap-icons';
import Nutrition from "../pages/Nutrition";
import { deleteItem } from "../utils/storage";

function Item(props) {
    const item = props.item
    const index = props.index
    const themeStr = localStorage.getItem(THEME)
    const theme = (themeStr !== null && themeStr !== "") ? JSON.parse(themeStr) : lightTheme
    
    const [key, setKey] = useState(false)

    const nutrition = item.nutrition ? item.nutrition : { No_Data: "avaiable" }
    
    return (
        
            <tr key={item.id}>
                <td >
                    {item.quantity}
                </td>
                <td >
                    {item.name}
                </td>
                <td >
                    {item.size}
                </td>
                <td >
                    {displayDate(item.expiry)}
                </td>
                <td  style={{ textAlign: "center" }}>
                    <button type="button" className={theme.button} onClick={() => { setKey(true) }}><Icon.Eye size={20} /></button>
                    <div >
                        <Nutrition name={item.name} nutrition={nutrition} trigger={key} setTrigger={setKey} />
                    </div>
                </td>
                <td >
                    <button type="button" className={theme.button} onClick={() => deleteItem(index)}>Delete</button>
                </td>

            </tr>
        
    )
}
export default Item