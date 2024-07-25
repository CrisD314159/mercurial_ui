import Header from "../../components/Header";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import './userSettings.css'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { GetUserResponse, User } from "../../components/types/types";
import DeleteAlert from "../../components/deleteAlert/DeleteAlert";

export default function UserSettings() {
    // const [delete, setDelete] = useState(false)
    const [user, setUser] = useState<User>({} as User)
    const userMutation = useMutation<GetUserResponse, Error>({
        mutationFn: getUser,
        onSuccess(data:GetUserResponse){
            setUser(data.user) 

        }
    })

    useEffect(()=>{
        userMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            < Header  />

            <div className="mainUserSettingsContainer">

                {user ? (
                    <div className="userCard">
                        <div className='profileImageContainerUser' style={{ backgroundImage: `url("${user.image}")` }}>

                        </div>
                        <div className="dataUserContainer">
                            <h3 className="nameUser">
                                {user.name}
                            </h3>
                            <p className="dataUserName">
                                Username: {user.username}
                            </p>
                            <p className="dataUserEmail">
                                Email: {user.email}
                            </p>
                            <p>
                                Password:
                                <input className="dataUserPassword" type="password" defaultValue={user.name} disabled>
                                </input>
                            </p>
                        </div>
                        <div className="buttonUser">
                            <NavLink to={'/userSettings/editUser'} className="editButton userButton">
                                <button className="editButton userButton">
                                    <p className="editButtonText">Edit profile </p>
                                    <ModeEditRoundedIcon></ModeEditRoundedIcon>
                                </button>
                            </NavLink>
                            
                            <DeleteAlert/>
                        </div>
                    </div>
                )
                    : null}
            </div>
        </div>
    )
}