import ReminderForm from "./ReminderForm";
import { fireEvent, render } from "@testing-library/react";
import { REMINDER_FORM_DATE_LABEL } from "../../constants/Constants";

const makeSut = (props) => {
    return render(<ReminderForm value="Test value" onClick={jest.fn()} {...props} />)
}

const editReminderFormProps = {
    reminderName: "GoFishing",
    selectedDateForReminder: new Date("Wed Nov 09 2022 14:05:56 GMT+0100 (Central European Standard Time)"),
    reminderTime: "14:05:56"
}

const addReminderFormProps = {
    selectedDateForReminder: new Date("Wed Nov 09 2022 14:05:56 GMT+0100 (Central European Standard Time)"),
    onClick: jest.fn()
}

describe("<ReminderForm />", () => {
    test("Should render form title correctly", () => {
        const { getByText } = makeSut(editReminderFormProps);
        expect(() => getByText('Add Reminder')).toThrow('Unable to find an element')
        expect(getByText("Edit Reminder")).toBeInTheDocument();
    });

    test("Should render reminder title's label and value correctly", () => {
        const { getByText, getByDisplayValue } = makeSut(editReminderFormProps);
        expect(getByText("Title:")).toBeInTheDocument()
        expect(getByDisplayValue('GoFishing')).toBeInTheDocument();
        expect(getByDisplayValue('GoFishing')).toHaveAttribute('type', 'text');
        expect(getByDisplayValue('GoFishing')).toHaveAttribute('value', 'GoFishing');
    });

    test("Should render reminder's date label and value correctly", () => {
        const { getByText, getByLabelText } = makeSut(editReminderFormProps);
        const input = getByLabelText('reminder-date');
        expect(getByText(REMINDER_FORM_DATE_LABEL)).toBeInTheDocument()
        expect(input.getAttribute('value')).toBe("2022-11-09");
    });

    test("Should show delete action button when while editing a new reminder ", () => {
        const { getByText } = makeSut(editReminderFormProps);
        expect(getByText('Confirm')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });

    test("Should render form title correctly", () => {
        const { getByText } = makeSut(addReminderFormProps);
        expect(() => getByText('Edit Reminder')).toThrow('Unable to find an element')
        expect(getByText("Add Reminder")).toBeInTheDocument();
    });

    test("Should hide delete action button when while creating a new reminder ", () => {
        const { getByText } = makeSut(addReminderFormProps);

        expect(getByText('Confirm')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(() => getByText('Delete')).toThrow('Unable to find an element')
    });

    test("Should call handleClose successfully ", () => {
        const spy = jest.fn();
        const { getByText } = makeSut({ ...addReminderFormProps, handleClose: spy });

        fireEvent.click(getByText("Cancel"));
        expect(spy).toHaveBeenCalled();
    });

});
