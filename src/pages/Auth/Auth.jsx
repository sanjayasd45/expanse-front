import { useState } from "react";
import { useDispatch } from 'react-redux';  
import axios from 'axios'
import './Auth.css'
import { setUser } from "../../Store/slices/user.slice";
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;



export default function Auth() {
    const  dispatch = useDispatch()
    const navigate = useNavigate() 
    const [loginS, setLogin] = useState("auth_active")
    const [signupS, setSignup] = useState("")
    const [error, setError] = useState("")
    const initialFormState = {
        signup: { name: "", username: "", password: "", email : "" },
        login: { username: "", password: "" },
    };

    const [forms, setForms] = useState(initialFormState);

    const handleChange = (formType) => (e) => {
        const { name, value } = e.target;
        setForms((prevForms) => ({
            ...prevForms,
            [formType]: { ...prevForms[formType], [name]: value },
        }));
    };

    const handleSubmit = (formType) => async(e) => {
        e.preventDefault();        
        if(forms[formType].password.length < 4){
            setError("Password should  contain more than 3 characters")
        }else{
            setForms((prevForms) => ({
                ...prevForms,
                [formType]: initialFormState[formType],
            }));
            try{
                const config = {
                  headers : {
                    "content-type" : "application/json"
                  }
                }
                axios.post(`${baseUrl}/auth/${formType}`, forms[formType], config)
                    .then(response => {
                        const data = response.data
                        const userData  = {
                            name : response?.data.name,
                            username : response?.data.username,
                            email : response?.data.email,
                            token : response?.data.token
                        }
                        localStorage.setItem('authToken', response?.data.token);
                        localStorage.setItem("userData" , JSON.stringify(userData))
                        dispatch(setUser({name : data.name, username : data.username, email : data.email}))
                        navigate("/")
                    })
                    .catch(error => {
                        console.error(error.response.data.message || "Something went wrong");
                        setError(error.response.data.message)
                        if(formType === "signup"){
                            let data = error.response.data.formData
                            let formData ={...data, password : ""}
                            setForms((prevForms) => ({
                                ...prevForms,
                                [formType]: formData,
                            }));
                        }
                    });
            }catch{(err) => {
                console.log(err.response.data.message);
            }}
        }
    };

    //   navigate("/app/welcome")
    const login = () => {
        setLogin("auth_active")
        setSignup("")
        setError("")
    }
    const signup = () => {
        setLogin("")
        setSignup("auth_active")
        setError("")
    }


    return (
        <div className="auth">
            <div className="auth_1">
                <div className="auth-opt">
                    <span onClick={login} className={`${loginS}_color`}>Login</span><span className={`${signupS}_color`} onClick={signup}>Signup</span>
                </div>
                <p>{error}</p>
                <form onSubmit={handleSubmit("signup")} className={signupS}>
                    <label htmlFor="name">Enter Name</label>
                    <input
                        name="name"
                        value={forms.signup.name}
                        onChange={handleChange("signup")}
                        placeholder="Name"
                    />
                    <label htmlFor="username">Enter Username</label>
                    <input
                        name="username"
                        value={forms.signup.username}
                        onChange={handleChange("signup")}
                        placeholder="Username"
                    />
                    <label htmlFor="Email">Enter Email</label>
                    <input
                        name="email"
                        value={forms.signup.email}
                        onChange={handleChange("signup")}
                        placeholder="Email"
                    />
                    <label htmlFor="password">Enter Password</label>
                    <input
                        name="password"
                        type="password"
                        value={forms.signup.password}
                        onChange={handleChange("signup")}
                        placeholder="Password"
                    />
                    <button type="submit">Sign Up</button>
                </form>

                <form onSubmit={handleSubmit("login")} className={loginS}>
                    <label htmlFor="username">Enter Username</label>
                    <input
                        name="username"
                        value={forms.login.username}
                        onChange={handleChange("login")}
                        placeholder="Username"
                    />
                    <label htmlFor="password">Enter Password</label>
                    <input
                        name="password"
                        type="password"
                        value={forms.login.password}
                        onChange={handleChange("login")}
                        placeholder="Password"
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}
