/* eslint-disable no-restricted-globals */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColumn } from "../../helpers/columns";
import { IAlert } from "../../models/IAlert";
import { ILaunch, ILaunchFetch } from "../../models/ILaunch";


interface ILaunchSlice {
    launches: ILaunch[];
    singleLaunch: ILaunchFetch | null;
    isLoading: boolean;
    error: string;
    alert: IAlert;
}

export interface IupdateLaunches {
    currentIndex: number;
    name: IColumn["name"];
    currentCard: ILaunch;
}

const initialState: ILaunchSlice = {
    launches: [],
    singleLaunch: {
        fairings: {
            "reused": false,
            "recovery_attempt": false,
            "recovered": false,
            "ships": []
        },
        links: {
            patch: {
                "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
                "large": "https://images2.imgbox.com/40/e3/GypSkayF_o.png"
            },
            "reddit": {
                "campaign": null,
                "launch": null,
                "media": null,
                "recovery": null
            },
            "flickr": {
                "small": [],
                "original": []
            },
            "presskit": null,
            "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
            "youtube_id": "0a_00nJ_Y88",
            "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
            "wikipedia": "https://en.wikipedia.org/wiki/DemoSat"
        },
        static_fire_date_utc: "2006-03-17T00:00:00.000Z",
        static_fire_date_unix: 1142553600,
        "net": false,
        "window": 0,
        "rocket": "5e9d0d95eda69955f709d1eb",
        "success": false,
        "failures": [
            {
                "time": 33,
                "altitude": null,
                "reason": "merlin engine failure"
            }
        ],
        "details": "Engine failure at 33 seconds and loss of vehicle",
        "crew": [],
        "ships": [],
        "capsules": [],
        "payloads": [
            "5eb0e4b5b6c3bb0006eeb1e1"
        ],
        "launchpad": "5e9e4502f5090995de566f86",
        "flight_number": 1,
        "name": "FalconSat",
        "date_utc": "2006-03-24T22:30:00.000Z",
        "date_unix": 1143239400,
        "date_local": "2006-03-25T10:30:00+12:00",
        "date_precision": "hour",
        "upcoming": false,
        "cores": [
            {
                "core": "5e9e289df35918033d3b2623",
                "flight": 1,
                "gridfins": false,
                "legs": false,
                "reused": false,
                "landing_attempt": false,
                "landing_success": null,
                "landing_type": null,
                "landpad": null
            }
        ],
        "auto_update": true,
        "tbd": false,
        "launch_library_id": null,
        "id": "5eb87cd9ffd86e000604b32a"
    },
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
        state.alert.show = true
        state.alert.text = "Полет успешно добавлен!"
        state.alert.severity = "success"
        state.launches[currentIndex] = updateLaunch
    } else if(name === "launches"){
        if(confirm("подтвердить отмену бронирования?")){
            const updateLaunch = {
                id: currentCard.id, 
                name: currentCard.name, 
                date_local: currentCard.date_local, 
                success: currentCard.success, 
                upcoming: currentCard.upcoming, 
                booked: false,
                type: "launches",
            }
            state.alert.show = true
            state.alert.text = "Полет отменен!"
            state.alert.severity = "warning"
            state.launches[currentIndex] = updateLaunch
            return false;
        }      
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
            state.error = '';
            state.launches = action.payload;
        },
        launchFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateLaunches(state, action: PayloadAction<IupdateLaunches>){
            updateLaunchesFunc(state, action);
        },
        updatedLaunches(state){
            state.alert.show = false;
        },
        fetchSingleLaunch(state, action: PayloadAction<string>){
            state.isLoading = true;
        },
        fetchSingleLaunchSuccess(state, action: PayloadAction<ILaunchFetch>){
            state.singleLaunch = action.payload;
            state.isLoading = false;
        },
    }
})

export default launchSlice.reducer;

export const { 
    updateLaunches, 
    launchFetchingSuccess, 
    launchFetchingError, 
    launchFetching, 
    updatedLaunches,
    fetchSingleLaunch,
    fetchSingleLaunchSuccess
} = launchSlice.actions;
