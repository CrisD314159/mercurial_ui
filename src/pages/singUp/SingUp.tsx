import { TextField } from "@mui/material";
import { useState } from "react";
import './styles.css'

export default function SingUp() {
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
                    <h1 className="formTitle">Sing up to Mercurial</h1>
                    <form
                        action=""
                        className="singUpForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
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
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
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
                        <button className="singUpButton">Sing Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
