function calcDate(date) {
    return new Date(date).getTime().toString().slice(0, 10)
}

module.exports = {
    calcDate,
}
