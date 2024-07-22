import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducerRoot";
import rootSaga from './sagaRoot';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    )
);

sagaMiddleware.run(rootSaga)

export default  store;