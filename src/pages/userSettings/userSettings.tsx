import Header from "../../components/Header";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import './userSettings.css'
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getImageFromLocalStorage } from "../../utils/utils";

export default function UserSettings() {
    // const [delete, setDelete] = useState(false)
    const [name, setName] = useState('Pedro')


    function deleteUser() {
        console.log('delete')
    }
    return (
        <div>
            < Header  />

            <div className="mainUserSettingsContainer">

                {name ? (
                    <div className="userCard">
                        <div className='profileImageContainerUser' style={{ backgroundImage: `url("${getImageFromLocalStorage()}")` }}>

                        </div>
                        <div className="dataUserContainer">
                            <h3 className="nameUser">
                                {name}
                            </h3>
                            <p className="dataUserName">
                                Username: {name}
                            </p>
                            <p className="dataUserEmail">
                                Email: {name}
                            </p>
                            <p>
                                Password:
                                <input className="dataUserPassword" type="password" defaultValue={name} disabled>
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
                            <button className="deleteButton userButton">
                                <p className="deleteButtonText">Delete </p>
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                )
                    : null}
            </div>
        </div>
    )
}