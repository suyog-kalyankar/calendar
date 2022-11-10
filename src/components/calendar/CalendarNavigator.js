import { add, format, sub } from "date-fns";
import PropTypes from "prop-types";
import Cell from "../Cell";
import { REMINDER_NOTE } from "../../constants/Constants";

const CalendarNavigator = ({ value, onChange }) => {
    const prevMonth = () => onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange(add(value, { months: 1 }));
    return <>
        <Cell></Cell>
        <Cell></Cell>
        <Cell isMonthNavaigator={true} className="monthNav" onClick={prevMonth}>{"<"}</Cell>
        <Cell>{format(value, "MMMM yyyy")}</Cell>
        <Cell isMonthNavaigator={true} className="monthNav" onClick={nextMonth}>{">"}</Cell>
        <Cell><strong data-testid="note">{REMINDER_NOTE}</strong></Cell>
        <Cell></Cell>
    </>
}

const propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
}
CalendarNavigator.prototype = propTypes;

export default CalendarNavigator;