import { takeEvery } from 'redux-saga/effects';
import { SET_USER } from './constants/actionTypes';

function* workerSaga(){
    console.log('user set');
    yield ;
}

function* rootSaga() {
    yield takeEvery(SET_USER, workerSaga);
}

export default rootSaga;