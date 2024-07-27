import { TextField } from "@mui/material";
import { useState } from "react";
import './signUp.css'
import PasswordInput from "../../components/creation/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { GeneralResponse, SignUpFields } from "../../components/types/types";
import { signUp } from "../../utils/utils";
import AlertDialog from "../../components/alertCompnent/AlertDialog";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    const mutation = useMutation<GeneralResponse, Error, SignUpFields>({
        mutationFn:signUp,
        onSuccess:()=>{
            setAlert(true);
            cleanFields();
        },
        onError:()=>{
            setError(true);
        }

    })

    function cleanFields(){
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
    }

    function handleSubmit() {
        mutation.mutate({name, email, username, password})
    }
    return (
        <div className="mainSignUpContainer">
            {alert ? <AlertDialog title="Thank you for sign up to Mercurial!!" message="Check your email to verify your account on Mercurial"/> : <></>}
            {error ? <AlertDialog title="There was an error with our app!" message="Try to sign up in a few minutes please"/> : <></>}
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
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
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
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <PasswordInput password={password} setPassword={setPassword} required></PasswordInput>
                        </div>

                        <button className="signUpButton">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
