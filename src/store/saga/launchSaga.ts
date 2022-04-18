import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, StrictEffect, takeEvery } from "redux-saga/effects"
import { ILaunch, ILaunchFetch } from "../../models/ILaunch";
import { fetchSingleLaunch, fetchSingleLaunchSuccess, IupdateLaunches, launchFetchingError, launchFetchingSuccess, updatedLaunches, updateLaunches } from "../reducers/LaunchSlice";

const fetchLaunches = () =>  axios.get<ILaunch[]>("https://api.spacexdata.com/v5/launches");
const fetchLaunch = (id: string) =>  axios.get<ILaunch>(`https://api.spacexdata.com/v5/launches/${id}`);

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

        return dataItem;
    })
}


function* fetchLaunchesWorker() {
    try{
        const response : AxiosResponse = yield call(fetchLaunches);
        const data : ILaunch[] = yield call( () => new Promise(res =>  res(transformData(response.data))))
        yield put(launchFetchingSuccess(data))
    } catch(e){
        yield put(launchFetchingError("ошибка"))
    }

}

const delay = (ms: number) => new Promise<void>((res) => {
    const time = setTimeout(res, ms);
    clearTimeout(time)
})

function* updateLaunchWorker({payload}: PayloadAction<IupdateLaunches>) {
    yield delay(2000)
    yield put(updateLaunches(payload))
}

function* updatedLaunchWorker() {
    yield delay(2000)
    yield put(updatedLaunches())
}

function* fetchLaunchWorker({payload}: PayloadAction<string>) {
    try{
        const response : AxiosResponse = yield call(() => fetchLaunch(payload));
        const data : ILaunchFetch = yield call( () => new Promise(res =>  res(response.data)))
        yield put(fetchSingleLaunchSuccess(data))
    } catch(e: any){
        yield put(launchFetchingError(String(e.message)))
    }

}


export default function* LaunchesSaga() {
    yield takeEvery('launch/launchFetching', fetchLaunchesWorker)
    yield takeEvery('launch/updateLaunches', updateLaunchWorker)
    yield takeEvery('launch/updatedLaunches', updatedLaunchWorker)
    yield takeEvery('launch/fetchSingleLaunch', fetchLaunchWorker)
}