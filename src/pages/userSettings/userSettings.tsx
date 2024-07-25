import Header from "../../components/Header";
import './userSettings.css'
import { useEffect, useState } from "react";
import { getUser } from "../../utils/utils";
import { useMutation } from "@tanstack/react-query";
import { GetUserResponse, User } from "../../components/types/types";
import DeleteAlert from "../../components/deleteAlert/DeleteAlert";
import EditUser from "../editUser/EditUser";
import { Avatar } from "@mui/material";

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
                        <Avatar className="avatarUser" src={user.image} alt={user.name} sx={{ width: 180, height: 180 }} style={{margin:'30px'}} />
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
                            <EditUser user={user}/>
                            <DeleteAlert/>
                        </div>
                    </div>
                )
                    : null}
            </div>
        </div>
    )
}