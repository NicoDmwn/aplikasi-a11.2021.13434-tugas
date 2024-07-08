import {createStore} from 'redux';
import counterReducer from './reducers/counterreducer';

const store = createStore(counterReducer);

export default store;