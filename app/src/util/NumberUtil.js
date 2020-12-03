// const numeral = require('numeral');

export const precisionRound = (number, precision) => {
    let factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
}

export const precisionFloor = (number, precision) => {
    let factor = Math.pow(10, precision)
    return Math.floor(number * factor) / factor
}

// export const formatPHPMoney = (number) => {
//     return numeral(number).format('0,0')
// };
//
// export const formatMoney2 = (number) => {
//     return numeral(number).format('0,0.00')
// };