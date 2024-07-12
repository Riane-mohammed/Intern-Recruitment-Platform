import { takeEvery } from 'redux-saga/effects';
import { SET_USER } from '../store/constants/actionTypes';

function* workerSaga(){
    console.log('hi man');
    yield ;
}

function* rootSaga() {
    yield takeEvery(SET_USER, workerSaga);
}

export default rootSaga;