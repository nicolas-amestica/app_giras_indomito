import moment from "moment";

const getDateTime = () => {
    return Buffer.from(moment().utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss'), 'utf8').toString();
}

const getDate = () => {
    return Buffer.from(moment().utcOffset('-03:00').format('YYYY-MM-DD'), 'utf8').toString();
}


export { getDateTime, getDate };