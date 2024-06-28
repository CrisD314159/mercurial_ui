import { TextField } from "@mui/material";
import { useState } from "react";
import './signUp.css'

export default function SignUp() {
    const [FullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        console.log(FullName, email, Username, password);
    }
    return (
        <div className="mainSingUpContainer">
            <div className="backgroundContainer">
                <div className="formContainer">
                    <div className="imageContainer">
                        <img src="/mercurialLogo.png" alt="" className="imageLogo" />
                    </div>
                    <h1 className="formTitle">Sign up to Mercurial</h1>
                    <form
                        action=""
                        className="signUpForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="inputsContainers border">
                            <TextField
                                required
                                label="Full Name"
                                variant="outlined"
                                value={FullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                            />
                            <TextField
                                required
                                label="E-mail"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className="inputsContainers">
                            <TextField
                                required
                                label="Username"
                                variant="outlined"
                                value={Username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <TextField
                                required
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        
                        <button className="singUpButton">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
