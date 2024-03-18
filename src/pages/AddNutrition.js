function AddNutrition(props) {
    const nutrData = Object.entries(props.nutrition)
    
    const handleChange = e => {
        props.setNutrition((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (props.trigger) ? (
        <div className="card" style ={{marginTop:48,zIndex:11,position:"fixed",top:0,left:0,width:"100%",height:"100%", backgroundColor:"rgba(52, 52, 52, 0.8)", display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className = "card"style={{position:"relative",padding:64,width:"100%",maxWidth:640}}>
            <h1 style ={{fontSize:32,position:"absolute",top:16,left:16}}>{props.name}</h1>
            <button type="button" className="btn btn-primary" style ={{position:"absolute",top:16,right:16}} onClick = {()=> props.setTrigger(false)}>Save</button>
            
            <table style = {{marginTop:8}} className="table table-info table-striped">
                <tbody>
                    <tr key="header">
                        <th scope="col">Nutrition</th>
                        <th scope="col">Value</th>
                    </tr>
                    {nutrData.map((entry, index) =>
                        <tr key = {index}>
                            <td>
                                {entry[0]}
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