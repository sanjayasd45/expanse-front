import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';  
import axios from 'axios'
import './Auth.css'
import { setUser } from "../../Store/slices/user.slice";
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;



export default function Auth() {
    const  dispatch = useDispatch()
    const userData = useSelector(state => state.user) 
    // console.log(userData);
    
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
    
    const handleSubmit = (formType) => async (e) => {
        e.preventDefault();
        dispatch(setUser({ name: "", username: "", email: "", loading: true }));
    
        if (forms[formType].password.length < 4) {
            setError("Password should contain more than 3 characters");
            dispatch(setUser({ name: "", username: "", email: "", loading: false })); // Stop loading on error
            return;
        }
    
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            const response = await axios.post(
                `${baseUrl}/auth/${formType}`,
                forms[formType],
                config
            );
    
            const data = response.data;
            console.log(data);
            
            const userData = {
                name: data.name,
                username: data.username,
                email: data.email,
                token: data.token,
                createdAt : data.createdAt
            };
    
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userData", JSON.stringify(userData));
    
            dispatch(setUser({ ...userData, loading: false }));
            setForms((prevForms) => ({
                ...prevForms,
                [formType]: initialFormState[formType],
            }));
            navigate("/");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Something went wrong";
            setError(errorMessage);
    
            if (formType === "signup" && error.response?.data?.formData) {
                const formData = {
                    ...error.response.data.formData,
                    password: "",
                };
                setForms((prevForms) => ({
                    ...prevForms,
                    [formType]: formData,
                }));
            }
    
            dispatch(setUser({ name: "", username: "", email: "", loading: false }));
            console.error("Error:", errorMessage);
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
                    <button type="submit">
                        {
                            userData?.loading ? (<div className="loader"></div>) : ("Log In")
                        }   
                    </button>
                    
                </form>
            </div>
        </div>
    );
}
