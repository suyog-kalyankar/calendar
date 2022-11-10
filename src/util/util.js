
export const getTotalSeconds = selectedTime => {
    const time = selectedTime.split(":");
    const hr = time[0] - 1;
    const min = time[1];
    const sec = time[2];
    const totalSec = (hr * 3600) + (min * 60) + parseInt(sec);
    return totalSec;
}