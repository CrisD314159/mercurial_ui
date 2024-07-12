import Header from "../../components/Header";
import json from '../../../public/dataset.json'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './userSettings.css'
import { NavLink } from "react-router-dom";

export default function UserSettings() {
    // const [delete, setDelete] = useState(false)
    const user = json.users.find((u) => u.id === 1);

    function deleteUser() {
        console.log('delete')
    }
    return (
        <div>
            < Header picture="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />

            <div className="mainUserSettingsContainer">

                {user ? (
                    <div className="userCard" key={user.id}>
                        <div className='profileImageContainerUser' style={{ backgroundImage: `url("${user.picture}")` }}>

                        </div>
                        <div className="dataUserContainer">
                            <h3 className="nameUser">
                                {user.name}
                            </h3>
                            <p className="dataUserName">
                                Username: {user.name}
                            </p>
                            <p className="dataUserEmail">
                                Email: {user.email}
                            </p>
                            <p>
                                Password:
                                <input className="dataUserPassword" type="password" defaultValue={user.password} disabled>
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