import { useCallback, useMemo } from "react"
import database from "./database"

const convertDateToIndex = date => date.getDate() % database.length

const useGetDaily = () => {
    const date = useMemo(() => new Date(), [])

    const getDaily = useCallback(() => {
        const dailyIndex = convertDateToIndex(date)
        return database[dailyIndex]
    }, [date])

    return getDaily
}

export default useGetDaily
