import { compareAsc, setDate } from "date-fns";
import PropTypes from "prop-types";
import Cell from "../Cell";

const CalendarMonth = ({ numDays, value, remindersList, openExistingReminder, addReminder }) => {

    return Array.from({ length: numDays }).map((_, index) => {
        const dateNum = index + 1;
        let formattedDate = setDate(value, dateNum);
        const isCurrentDate = formattedDate.toDateString() === new Date().toDateString();
        let reminderList = remindersList !== undefined && remindersList.filter(reminder => reminder.id.includes(formattedDate.toDateString()));
        reminderList = reminderList !== undefined && reminderList.sort((a, b) => compareAsc(new Date(a.id), new Date(b.id)))
        return (
            <Cell
                key={formattedDate.toDateString()}
                isActive={isCurrentDate}
                isReminderAvailable={false}
                onClick={() => addReminder(dateNum)}
                className="dates other"
            >
                {dateNum}
                <div className="dates-block">
                    {reminderList !== undefined && reminderList.map((reminder) => {
                        return reminder.id.includes(formattedDate.toDateString()) && <div onClick={() => openExistingReminder(reminder, dateNum)} key={reminder.id} className="reminder-block"><span className="reminder-dot"></span> <span className="reminder-form-label">{reminder.title}</span></div>
                    })}
                </div>
            </Cell>
        );
    })

}

const propTypes = {
    numDays: PropTypes.number,
    value: PropTypes.instanceOf(Date),
    remindersList: PropTypes.array,
    openExistingReminder: PropTypes.func,
    addReminder: PropTypes.func
}
CalendarMonth.prototype = propTypes;

export default CalendarMonth;