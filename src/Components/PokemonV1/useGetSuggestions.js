import { useCallback } from "react"

const useGetSuggestions = (options, limit = 10, correctAnswer = '') => {

    const getSuggestions = useCallback((guess) => {
        let size = 0
        let optionsTemp = options

        if (!optionsTemp?.includes(correctAnswer)) {
            optionsTemp = [...optionsTemp, correctAnswer]
        }

        return optionsTemp?.filter(o => {
            if (size < limit) {
                if (o?.toUpperCase()?.includes(guess?.toUpperCase())) {
                    size++
                    return true
                }
            }
        }).sort((a, b) => a.localeCompare(b))
    }, [correctAnswer, limit, options])

    return {
        getSuggestions
    }
}

export default useGetSuggestions
