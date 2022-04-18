import { FC, } from "react";
import { Alert, Stack } from "@mui/material";
import { useAppSelector } from "../hooks/redux";

interface INotificationState {
}

const Notification: FC<INotificationState> = () => {

    const {alert} = useAppSelector(state => state.launchReducer)

    if(alert.show){
        return (  
            <Stack sx={{ width: '350px', position: "fixed", right: 30, bottom: 50 }} spacing={2}>
                <Alert severity={alert.severity}>{alert.text}</Alert>
            </Stack>
    
        );
    }
    return (
        <>
        </>
    )
}

export default Notification;

//Ваш полет успешно забронирован!