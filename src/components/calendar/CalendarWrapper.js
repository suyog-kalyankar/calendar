import { differenceInDays, endOfMonth, startOfMonth, setDate, format } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DAY_OF_WEEK, LOADING, QUERY_KEY, TIME_FORMAT } from "../../constants/Constants";
import { getAllReminders } from "../../service/helper";
import Cell from "../Cell";
import ReminderForm from "../reminder/ReminderForm";
import CalendarNavigator from "./CalendarNavigator";
import { addNewReminder, deleteReminder, updateReminder } from "../../service/helper";
import CalendarMonth from "./CalendarMonth";
import { useDispatch } from "react-redux";
import { fetchReminderAction } from "../../state/action-creators/ReminderAction";

const CalendarWrapper = ({ value = new Date(), onChange }) => {
    const [showReminderForm, setShowReminderForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);
    const [reminderId, setReminderId] = useState("");
    const [reminderName, setReminderName] = useState("");
    const [reminderTime, setReminderTime] = useState(format(value, TIME_FORMAT));
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;
    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    // to fetch all the reminders when we load the application
    const { isLoading, data: remindersList } = useQuery({
        queryKey: [QUERY_KEY],
        queryFn: getAllReminders
    })

    useEffect(() => {
        if (remindersList) {
            dispatch(fetchReminderAction(remindersList));
        }
    }, [dispatch, remindersList])

    // add new reminder using useMutation ("CRUD operations")
    const addNewReminderMutation = useMutation({
        mutationFn: addNewReminder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        },
    })

    // delete reminder by using id
    const { mutate: deleteReminderMutate } = useMutation(deleteReminder, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        }
    })

    //update reminder by using id
    const { mutate: updateMutate } = useMutation(updateReminder, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    })

    // to add new reminder, opening reminder form
    const addReminder = (data) => {
        const date = setDate(value, data);
        setSelectedDate(date);
        setShowReminderForm(true);
    }

    // close the reminder form modal
    const handleClose = () => {
        setReminderName("");
        setReminderTime(format(value, TIME_FORMAT));
        setShowReminderForm(false);
    }

    // to edit a reminder form
    const openExistingReminder = (val, data) => {
        setReminderName(val.title);
        setReminderId(val.id);
        const time = format(new Date(val.id), TIME_FORMAT)
        setReminderTime(time)
        addReminder(data);
    }

    // handling add new reminder, edit reminder and delete reminder
    const onSubmit = (isEditReminder, payload, isDelete) => {
        if (isDelete) {
            deleteReminderMutate(payload);
        } else if (isEditReminder) {
            const isReminderAvailable = remindersList.filter(availableReminder => availableReminder.id === payload.id);
            if (isReminderAvailable.length) {
                updateMutate(payload)
            } else {
                deleteReminderMutate(reminderId);
                addNewReminderMutation.mutate(payload);
            }
        } else {
            addNewReminderMutation.mutate(payload);
        }
    }

    return <div>
        {isLoading ? <strong>{LOADING}</strong> :
            <div className="calendar_month">
                <CalendarNavigator onChange={onChange} value={value} />
                {DAY_OF_WEEK.map((week, index) => (
                    <Cell key={index} className="week-days">{week.toUpperCase()}</Cell>
                ))}
                {Array.from({ length: prefixDays }).map((_, index) => (
                    <Cell className="other" key={index} />
                ))}
                <CalendarMonth value={value} numDays={numDays} openExistingReminder={openExistingReminder} addReminder={addReminder} remindersList={remindersList} />
                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell className="other" key={index} />
                ))}
            </div>
        }
        {showReminderForm && <ReminderForm onSubmit={onSubmit} reminderTime={reminderTime} reminderName={reminderName} selectedDateForReminder={selectedDate} handleClose={handleClose} />}
    </div>
}

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date)
}

CalendarWrapper.prototype = propTypes;

export default CalendarWrapper;