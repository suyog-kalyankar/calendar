import { addSeconds, format } from "date-fns";
import { useEffect, useState } from "react";
import Modal from "../modal";
import PropTypes from "prop-types";
import * as Constants from "../../constants/Constants";
import { getTotalSeconds } from "../../util/util";

const ReminderForm = ({ selectedDateForReminder, handleClose, reminderName, reminderTime, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [showError, setShowError] = useState(false);
    const [isEditReminder, setIsEditReminder] = useState(false);
    const [selectedDate, setselectedDate] = useState(format(new Date(), Constants.DATE_FORMAT))
    const [selectedTime, setSelectedTime] = useState(format(new Date(), Constants.TIME_FORMAT));

    const handleChange = e => {
        setselectedDate(e.target.value);
    }

    useEffect(() => {
        if (reminderName) {
            setIsEditReminder(true);
        }
        setTitle(reminderName)
    }, [reminderName])

    useEffect(() => {
        if (reminderName) {
            setSelectedTime(reminderTime)
        }
    }, [reminderTime, reminderName])

    useEffect(() => {
        setselectedDate(format(selectedDateForReminder, Constants.DATE_FORMAT));
    }, [selectedDateForReminder])


    const getValidatedData = () => {
        const utcDate = new Date(selectedDate);
        const totalSeconds = getTotalSeconds(selectedTime);
        const finalDate = addSeconds(utcDate, totalSeconds);
        return { utcDate, finalDate };
    }

    // once user add new/edits the reminder form, handleSubmit handles it and creates a payload and pass it through onSubmit
    const handleSubmit = () => {
        const { utcDate, finalDate } = getValidatedData()
        if (selectedDate && selectedTime && title && utcDate.toString() !== Constants.INVALID_DATE && finalDate.toString() !== Constants.INVALID_DATE) {
            const payload = {
                id: finalDate.toString(),
                title: title
            };
            onSubmit(isEditReminder, payload, false);
            setShowError(false);
            handleClose();
        } else {
            setShowError(true);
        }
    }

    // when user delete any reminder, it gets the id and pass it through onSubmit
    const handleDelete = () => {
        const { finalDate } = getValidatedData();
        onSubmit(isEditReminder, finalDate, true);
        handleClose();
    }

    const handleReminderName = e => {
        setTitle(e.target.value);
    }

    const handleSelectedTime = e => {
        setSelectedTime(e.target.value.toUpperCase())
    }
    return <Modal>
        <strong>{isEditReminder ? Constants.EDIT_REMINDER : Constants.ADD_REMINDER}</strong>
        <div className="form-group">
            <label className="reminder-form-label">Title:</label>
            <input
                type="text"
                aria-label="reminder-title"
                maxLength={30}
                required={true}
                value={title}
                onChange={handleReminderName}
                className="form-control"
            />
            <label className="reminder-form-label">{Constants.REMINDER_FORM_DATE_LABEL}</label>
            <input
                type="date"
                aria-label="reminder-date"
                value={selectedDate}
                onChange={handleChange}
                className="form-control"
            />
            <label className="reminder-form-label">{Constants.REMINDER_FORM_TIME_LABEL}</label>
            <input
                type="time"
                aria-label="reminder-time"
                value={selectedTime}
                onChange={handleSelectedTime}
                className="form-control"
            />
        </div>
        <div className="form-group">
            {showError && <strong className="error">{Constants.REMINDER_ERROR_MESSAGE}</strong>}
            <button onClick={handleSubmit} type="button">
                {Constants.CONFIRM}
            </button>
            {isEditReminder && <button onClick={handleDelete} type="button">
                {Constants.DELETE}
            </button>}
            <button onClick={handleClose} type="button">
                {Constants.CANCEL}
            </button>
        </div>
    </Modal>
}

const propTypes = {
    reminderName: PropTypes.string,
    handleClose: PropTypes.func,
    selectedDateForReminder: PropTypes.instanceOf(Date),
    reminderTime: PropTypes.string,
    onSubmit: PropTypes.func
}

ReminderForm.prototype = propTypes;

export default ReminderForm;