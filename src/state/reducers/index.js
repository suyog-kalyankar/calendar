import { combineReducers } from "redux";
import ReminderReducer from "../reducers/ReminderReducer";

const reducers = combineReducers({
    reminders: ReminderReducer
})

export default reducers;