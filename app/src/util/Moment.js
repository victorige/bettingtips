import moment from 'app/src/util/Moment';

export const formatTime = (millis, format) => {
    let time = moment(millis > 1000000000000 ? millis : millis * 1000);
    return time.format(format);
};