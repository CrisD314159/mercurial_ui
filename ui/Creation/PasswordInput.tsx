'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState } from 'react';


interface PasswordInputProps {
    password: string,
    setPassword: (password: string) => void,
    required:boolean
}


export default function PasswordInput(props: PasswordInputProps) {
    const { password, setPassword } = props
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required={props.required}>
            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
            <OutlinedInput
                inputProps={{  minLength: 8 }}
                required={props.required}
                defaultValue={password}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                label="Password"
            />
        </FormControl>
    )
}