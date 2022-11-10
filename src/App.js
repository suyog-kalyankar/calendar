import { useState } from "react"
import CalendarWrapper from "./components/calendar/CalendarWrapper";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient()

const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    return  <QueryClientProvider client={queryClient}>
                <div className="test"><CalendarWrapper value={currentDate} onChange={setCurrentDate} /></div>   
        </QueryClientProvider>
}

export default App;