import PropTypes from "prop-types";

const Cell = ({ onClick, children, className, isActive = false, isMonthNavaigator, isReminderAvailable }) => {
  return (
    <div
      onDoubleClick={!isMonthNavaigator ? onClick : undefined}
      onClick={isMonthNavaigator && onClick}
      className={`child ${className} ` + (isActive ? "activeDate" : "")}
    >
      {children}
      {isReminderAvailable && <span className="reminder-dot"></span>}
    </div>
  );
}

const propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  isMonthNavaigator: PropTypes.bool,
  isReminderAvailable: PropTypes.bool
}
Cell.prototype = propTypes;

export default Cell;


