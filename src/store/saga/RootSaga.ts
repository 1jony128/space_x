import { all } from "redux-saga/effects";
import LaunchesSaga from "./launchSaga";

export default function* rootSaga() {
    yield all([LaunchesSaga()]);
  }