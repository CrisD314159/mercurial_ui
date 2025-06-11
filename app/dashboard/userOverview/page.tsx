'use client'

import { GetUserOverview } from '@/lib/ServerActions/UserActions';
import { GenericError } from '@/lib/types/definitions';
import { User } from '@/lib/types/entityTypes';
import { useMercurialStore } from '@/store/useMercurialStore';
import DeleteUserAlert from '@/ui/Alerts/DeleteUserAlert';
import MercurialSnackbar from '@/ui/Snackbars/MercurialSnackbar';
import EditUser from '@/ui/User/EditUser';
import { Avatar, CircularProgress } from '@mui/material';
import { useState } from 'react';
import useSWR from 'swr';


export default function UserOverviewPage() {
    
    const {isAuthenticated} = useMercurialStore()
    const {data, error, isLoading, mutate} = useSWR<User, GenericError>('user', ()=> GetUserOverview())
    const [alert, setAlert] = useState(false)

    if(!isAuthenticated){
        return(
            <div className="w-full h-full flex items-center justify-center">
                <h2>{'You are not allowed to do this'}</h2>
            </div>
        )
    }

    if(isLoading){
        return(
            <div className="w-full h-full flex items-center justify-center">
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div className="w-full h-[90%]">
            {
                error && <MercurialSnackbar message={error.message} state={alert} type='error' closeMethod={setAlert}/>
            }
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 w-full"></div>
            {data && (

                    <div className="flex flex-col p-10 w-full h-full items-center ">
                        <Avatar
                        src={data.profilePicture}
                        alt="Foto de perfil"
                        className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md object-cover"
                        sx={{
                            width:'250px', height:'250px', marginBottom: '30px'
                        }}
                        />
                        <div className=' w-full flex justify-center items-center gap-4'>
                            <h2 className="mt-4 text-2xl font-bold truncate w-80 text-center">{data.name}</h2>
                           <EditUser mutate={mutate} name={data.name} />

                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1 mb-10">{data.email}</p>

                        <DeleteUserAlert/>
                    </div>

            )}
        </div>

    )
}