import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColumn } from "../../helpers/columns";
import { IAlert } from "../../models/IAlert";
import { ILaunch } from "../../models/ILaunch";


interface ILaunchSlice {
    launches: ILaunch[];
    isLoading: boolean;
    error: string;
    alert: IAlert;
}

interface IupdateLaunches {
    currentIndex: number;
    name: IColumn["name"];
    currentCard: ILaunch;
}

const initialState: ILaunchSlice = {
    launches: [],
    isLoading: false,
    error: "",
    alert: {
        severity: "success",
        text: "",
        show: false
    },
}

const updateLaunchesFunc = (state: ILaunchSlice, action: PayloadAction<IupdateLaunches>) => {
    const { currentIndex, name, currentCard }  = action.payload
    if(name === "myLaunches"){
        const updateLaunch = {
            id: currentCard.id, 
            name: currentCard.name, 
            date_local: currentCard.date_local, 
            success: currentCard.success, 
            upcoming: currentCard.upcoming, 
            booked: true,
            type: "myLaunches",
        }
        state.launches[currentIndex] = updateLaunch
    } else if(name === "launches"){
        const updateLaunch = {
            id: currentCard.id, 
            name: currentCard.name, 
            date_local: currentCard.date_local, 
            success: currentCard.success, 
            upcoming: currentCard.upcoming, 
            booked: false,
            type: "launches",
        }
        state.launches[currentIndex] = updateLaunch
    }
}


export const launchSlice = createSlice({
    name: "launch",
    initialState,
    reducers: {
        launchFetching(state) {
            state.isLoading = true;
        },
        launchFetchingSuccess(state, action: PayloadAction<ILaunch[]>) {
            state.isLoading = false;
            state.error = ''
            state.launches = action.payload
        },
        launchFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        updateLaunches(state, action: PayloadAction<IupdateLaunches>){
            updateLaunchesFunc(state, action)
        }
    }
})

export default launchSlice.reducer;

export const { updateLaunches, launchFetchingSuccess, launchFetchingError, launchFetching } = launchSlice.actions;
