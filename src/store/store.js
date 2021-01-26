import {createStore, applyMiddleware, compose} from 'redux';
import { rootReducer } from '../reducers/rootReducer';

import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const reducers = combineReducers({
//     auth: authReducer,
//     ui: uiReducer,
//     notes: notesReducer
// });

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

