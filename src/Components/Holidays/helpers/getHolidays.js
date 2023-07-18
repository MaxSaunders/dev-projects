import { getChristmas, getHalloween, getThanksgiving, getValentinesDay } from 'date-fns-holiday-us'
import { intervalToDuration } from 'date-fns'

const holidays = [
    ['valentinesDay', getValentinesDay, 'Valentines Day'],
    ['halloween', getHalloween, 'Halloween'],
    ['thanksgiving', getThanksgiving, 'Thanksgiving'],
    ['christmas', getChristmas, 'Christmas'],
    // ['fourthOfJuly', () => new Date(new Date().getFullYear(), 6, 4)],
    // need to get this based on the year
]

const getInterval = (start, end) => intervalToDuration({ start, end })

const getHolidays = () => {
    const currentDate = new Date
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    return holidays.map(h => {
        const [name, dateFunc, title] = h
        let holidayDate = dateFunc(+currentYear)

        if (holidayDate.getMonth() < currentMonth
            || (holidayDate.getMonth() === currentMonth
                && holidayDate.getDate() < currentDay)) {
            holidayDate = dateFunc(+currentYear + 1)
        }

        return {
            name,
            title,
            date: holidayDate,
            month: holidayDate.getMonth(),
            day: holidayDate.getDate(),
            interval: getInterval(currentDate, holidayDate)
        }
    }).sort((a, b) => {
        let currDateValue = currentMonth
        let aValue = a.month
        let bValue = b.month

        if (a.month === b.month) {
            currDateValue = currentDay
            aValue = a.day
            bValue = b.day
        }

        if (aValue < currDateValue && bValue < currDateValue) {
            return aValue < bValue ? -1 : 1
        }

        if (aValue > currDateValue && bValue < currDateValue) {
            return -1
        }

        if (aValue < currDateValue && bValue > currDateValue) {
            return 1
        }

        if (aValue > currDateValue && bValue > currDateValue) {
            return aValue < bValue ? -1 : 1
        }
    })
}

export default getHolidays
