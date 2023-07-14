import { useCallback, useEffect, useState } from "react"

const useGetCurrentTime = () => {
    const [is24Hour, setIs24Hour] = useState(false)
    const [time, setTime] = useState('12:00')
    const [period, setPeriod] = useState('AM')

    const getTime = useCallback(() => {
        const date = new Date()
        let hours = date.getHours()
        let min = date.getMinutes()
        let period = 'AM'

        if (!is24Hour) {
            if (hours > 12) {
                hours -= 12
                period = 'PM'
            }
            setTime(`${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`)
            setPeriod(period)
        } else {
            setTime(`${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`)
            setPeriod('')
        }

    }, [is24Hour])

    const toggle24hour = useCallback(() => {
        setIs24Hour(i => !i)
    }, [])

    useEffect(() => {
        getTime()
        const interval = setInterval(() => {
            getTime()
        }, 1000)
        return () => clearInterval(interval)
    }, [getTime])

    return [
        time,
        period,
        toggle24hour
    ]
}

export default useGetCurrentTime
