import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColumn } from "../../helpers/columns";
import { ILaunch } from "../../models/ILaunch";


interface ILaunchSlice {
    launches: ILaunch[];
    isLoading: boolean;
    error: string;
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
                }
        }
    }
})

export default launchSlice.reducer;

export const { updateLaunches } = launchSlice.actions;
