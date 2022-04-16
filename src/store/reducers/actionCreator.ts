import axios from "axios"
import { ILaunch, ILaunchFetch } from "../../models/ILaunch"
import { AppDispatch } from "../store"
import { launchSlice } from "./LaunchSlice"


export const fetchLaunch = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(launchSlice.actions.launchFetching())
        const response = await axios.get<ILaunch[]>("https://api.spacexdata.com/v5/launches");
        const data = response.data.map((item:ILaunch) => {
            const type = new Date(item.date_local) < new Date() ? "launches" : "pastLaunches"
            const dataItem = {
                id: item.id, 
                name: item.name, 
                date_local: item.date_local ,
                success: item.success ,
                upcoming: item.upcoming,
                booked: false,
                type: type
            }
            
            if(dataItem.id === "5eb87cd9ffd86e000604b32a" || dataItem.id === "5eb87ce2ffd86e000604b335" || dataItem.id === "5eb87ceeffd86e000604b341"){
                dataItem.booked = true;
            }

            return dataItem;
        })

        dispatch(launchSlice.actions.launchFetchingSuccess(data))
        
    } catch(error: any){
        dispatch(launchSlice.actions.launchFetchingError(String(error.message)))
    }
}