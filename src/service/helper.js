
/*
// To get all reminders
*/
export const getAllReminders = async () => {
    const reminderPromise = await fetch('http://localhost:3001/reminders');
    const response = await reminderPromise.json();
    return response;
}

/*
// @param payload // payload object contains id and title of reminder
// To add a reminder
*/
export const addNewReminder = async (payload) => {
    const res = await fetch('http://localhost:3001/reminders', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    const data = res.json();
    return data;
}

/*
// @param id // accepts reminder id which is a date in string type
// To delete a particular reminder by using id
*/
export const deleteReminder = async (id) => {
    const reminderPromise = await fetch(`http://localhost:3001/reminders/${id}`, {
        method: 'DELETE',
    });
    const response = await reminderPromise.json();
    return response;
}

/*
// @param id // accepts reminder id which is a date in string type
// To update a particular reminder by using id
*/
export const updateReminder = async (payload) => {
    await fetch(`http://localhost:3001/reminders/${payload.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
} 