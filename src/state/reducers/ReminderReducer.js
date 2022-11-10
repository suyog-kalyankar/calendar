import { FETCH_REMINDER_LIST_SUCCESS } from "../../constants/Constants";
 
const initialState = {
    remindersList: []
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_REMINDER_LIST_SUCCESS:
            return {...state, remindersList: action.payload}
        default:
            return state;
    }
}
export default reducer;