import axios, { AxiosResponse } from "axios";
import { call, put, StrictEffect, takeEvery } from "redux-saga/effects"
import { ILaunch } from "../../models/ILaunch";
import { launchFetchingError, launchFetchingSuccess } from "../reducers/LaunchSlice";

const fetchLaunch = () =>  axios.get<ILaunch[]>("https://api.spacexdata.com/v5/launches");

const transformData = (response: ILaunch[]) => {
    return response.map((item:ILaunch) => {
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
}


function* fetchLaunchWorker() {

    try{
        const response : AxiosResponse = yield call(fetchLaunch);
        const data : ILaunch[] = yield call( () => new Promise(res =>  res(transformData(response.data))))
        yield put(launchFetchingSuccess(data))
    } catch(e){
        yield put(launchFetchingError("ошибка"))
    }

}

export default function* LaunchesSaga() {
    console.log("zzz")
    yield takeEvery('launch/launchFetching', fetchLaunchWorker)
}