export const getDate = () => {
    let today = new Date();
    let next = new Date(today);
    next.setMinutes(today.getMinutes() + 30); //add 30 mins

    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    let date2 = next.getFullYear() + '-' + (next.getMonth() + 1) + '-' + next.getDate();
    let time2 = next.getHours() + ":" + next.getMinutes() + ":" + next.getSeconds();

    let currentDate = date + ' ' + time;
    let expiryDate = (date2 + ' ' + time2);

    return [currentDate, expiryDate];
} 