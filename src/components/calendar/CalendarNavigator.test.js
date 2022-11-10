import { cleanup, render, screen } from "@testing-library/react"
import { REMINDER_NOTE } from "../../constants/Constants";
import CalendarNavigator from "./CalendarNavigator";


afterEach(() => {
    cleanup();
})

describe("calendar navigator component", () => {
    const onChange = jest.fn();
    render(<CalendarNavigator value={new Date()} onChange={onChange}/>)
    //test1
    test("Calendar navigator rendering", () => {
        const note = screen.getByText(REMINDER_NOTE);
        const month = screen.getByText(/November 2022/);
        expect(month).toBeInTheDocument();
        expect(note).toBeInTheDocument();
    })
})