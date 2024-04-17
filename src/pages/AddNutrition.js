import { THEME } from "../config/localStorage"
import { findMeasure, replaceChar } from "../utils/storage"

function AddNutrition(props) {
    const nutrData = Object.entries(props.nutrition)
    const themeStr = localStorage.getItem(THEME)
    const theme = JSON.parse(themeStr)

    const handleChange = e => {
        props.setNutrition((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (props.trigger) ? (
        <div data-bs-theme={theme.name} className="card" style ={{zIndex:11,position:"fixed",top:0,left:0,width:"100%",height:"100%", backgroundColor:"rgba(52, 52, 52, 0.8)", display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className = "card"style={{marginTop:96, position: "relative", padding: 64, width: "100%", maxWidth: 640, maxHeight: 800,overflow:"scroll" }}>
            <h1 style ={{fontSize:32,position:"absolute",top:16,left:16}}>{props.name}</h1>
            <button type="button" className={theme.button} style ={{position:"absolute",top:16,right:16}} onClick = {()=> props.setTrigger(false)}>Save</button>
            
            <table style = {{marginTop:8}} className={theme.table}>
                <tbody>
                    <tr key="header">
                        <th scope="col">Nutrition</th>
                        <th scope="col">Value</th>
                    </tr>
                    {nutrData.map((entry, index) =>
                        <tr key = {index}>
                            <td>
                                {replaceChar(entry[0])}  {findMeasure(entry[0])}
                            </td>
                            <td>
                            <input 
                                type="text"
                                onChange={handleChange}
                                name={entry[0]}
                                placeholder={entry[1]}
                            ></input>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            </div>
        </div>
    ) : ""

}
//
export default AddNutrition