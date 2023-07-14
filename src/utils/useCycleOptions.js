import { useCallback, useState } from "react"

const useCycleOptions = (options = []) => {
    const [optionIndex, setOption] = useState(0)

    const cycleOptionNext = useCallback(() => {
        setOption(i => {
            if (i + 1 < options.length) {
                return i + 1
            } else {
                return 0
            }
        })
    }, [options])

    const cycleOptionPrev = useCallback(() => {
        setOption(i => {
            if (i === 0) {
                return options.length - 1
            } else {
                return i - 1
            }
        })
    }, [options])

    return [
        options[optionIndex],
        cycleOptionNext,
        cycleOptionPrev,
        optionIndex
    ]
}

export default useCycleOptions
