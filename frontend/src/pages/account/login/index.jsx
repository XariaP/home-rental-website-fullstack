import React, {useContext, useState} from "react";
import icons from '../../../components/icons';
import { Link, useNavigate } from "react-router-dom";
import { PageContext, UserContext } from "../../../contexts";
import LargeCard from "../../../components/largeCard";
import UserLogInput from "../../../components/input1";

// https://stackoverflow.com/questions/60923858/react-js-get-error-message-despite-http-response-400

// https://stackoverflow.com/questions/39724481/cannot-post-error-react-js
function Login(props) {
    // const [user, setUser] = useState(null);
    const { setPage } = useContext(PageContext);
    const { setToken } = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function loginUser(credentials){
        fetch('http://localhost:8000/accounts/login/',
            {
                // mode: "cors",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                },
                
                body: JSON.stringify(credentials),
            })
        .then((resquest) => resquest.json())
        .then((data) => {
            // console.log(data);

            if (data.detail){
                document.getElementById("error-main").innerText = data.detail;
            }
            else {
                document.getElementById("error-main").innerText = "";
            }
            if (data.email){
                document.getElementById("error-email").innerText = data.email;
            }
            else {
                document.getElementById("error-email").innerText = "";
            }
            if (data.password){
                document.getElementById("error-password").innerText = data.password;
            }
            else {
                document.getElementById("error-password").innerText = "";
            }
            
            if (data.access){
                const token = data.access;
                setToken(token);
                // console.log(token);
                setPage("search");
                navigate("/home");
            }
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email: email,
            password: password,
        });
    }

    const contents = <>
        <h1 className="fw-light">Welcome Back!</h1>                
        <form onSubmit={handleSubmit}>
            <img className="mb-4" src={icons["host"]} alt="" height="90" />
            
            <p className="error" id="error-main"></p>

            <UserLogInput type="email" id="email" label="Email address" onChange={e => setEmail(e.target.value)} />
            
            <UserLogInput type="password" id="password" label="Password" onChange={e => setPassword(e.target.value)} />
        
            <button className="w-100 btn btn-lg btn-blue" type="submit">Log in</button>
        </form>
        <br></br>
        <Link to="/accounts/signup">Create an account</Link>
    </>;

    return <>
        <main className="content">
            <LargeCard contents={contents}/>
        </main>
    </>;
}

export default Login;