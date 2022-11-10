import { FETCH_REMINDER_LIST_SUCCESS } from "../../constants/Constants"

export const fetchReminderAction = payload => {
    return {
        type: FETCH_REMINDER_LIST_SUCCESS,
        payload: payload
    }
}