export const convertSecondToTime = (timer) => {
    const hours = timer / 3600;
    const minute = timer / 60 % 60;
    const second = timer % 60;
    return Math.floor(hours) + ":" +
        convertNumber(Math.floor(minute)) + ":" +
        convertNumber(Math.floor(second))
}

const convertHours = (number) => {
    return (number < 10 && number !== 0 ? `0${number}` : number)
}

export const convertTimeToSecond = (time) => {
    const arrTime = time.split(":");
    return (parseInt(arrTime[0]) * 3600) +
        (parseInt(arrTime[1]) * 60)
        + parseInt(arrTime[2])
}

const convertNumber = (number) => {
    return (number < 10 ? `0${number}` : number)
}

export const convertDateToTimeStamp = (date) => {
    return date.getTime() + date.getTimezoneOffset() * 60000
}

export const convertDateToStringYYYYmmDDhhMMss = (date) => {
    if (!date) return;
    const year = "" + date.getFullYear();
    let month = "" + (date.getMonth() + 1);
    if (month.length === 1) {
        month = "0" + month;
    }
    let day = "" + date.getDate();
    if (day.length === 1) {
        day = "0" + day;
    }
    let hour = "" + date.getHours();
    if (hour.length === 1) {
        hour = "0" + hour;
    }
    let minute = "" + date.getMinutes();
    if (minute.length === 1) {
        minute = "0" + minute;
    }
    let second = "" + date.getSeconds();
    if (second.length === 1) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
