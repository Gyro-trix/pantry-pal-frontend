

function Register(){
const temp = localStorage.getItem("name")
    return(
    <div>
        Register, {temp}
    </div>
);
}

export default Register;