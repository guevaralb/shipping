import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import items from './itemsReducer';
import ajaxLoading from './ajaxLoadingReducer';

const rootReducer = combineReducers({
    items,
    ajaxLoading,
    form: formReducer
});

export default rootReducer;