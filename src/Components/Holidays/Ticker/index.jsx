import propTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getRandomInt } from '../../../utils/getRandom'
import displayTypes from './displayTypes'
import './index.scss'

const frontFillArray = (arr = [], length = 10) => {
    let i = 0
    const returnArray = []

    while (i < length) {
        if (i < length - arr.length) {
            returnArray.push(0)
        } else {
            returnArray.push(arr[i - (length - arr.length)])
        }
        i++
    }
    return returnArray
}

const splitIntoArray = num => ('' + Math.floor(+num)).split('')

const standardize = number => number < 10 ? '0' + number : number

const getRandomDisplayArray = (size = 10) => {
    let i = 0
    const arr = []
    while (i < size) {
        arr.push(getRandomInt(0, 9))
        i++
    }
    return arr
}

const RandomTicker = ({ length = 10 }) => {
    const [display, setDisplay] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    useEffect(() => {
        const intervalSet = setInterval(() => {
            setDisplay(getRandomDisplayArray())
        }, 13)

        return () => clearInterval(intervalSet)
    }, [])

    return (
        <div className='interval-ticker' style={{ gridTemplateColumns: `repeat(${length}, ${100 / length}%)` }}>
            {display.map((section, index) =>
                <span key={`section-${section}-${index}`} className='ticker-section'>
                    <span>
                        {section}
                    </span>
                </span>
            )}
        </div>
    )
}

RandomTicker.propTypes = {
    length: propTypes.number
}

const Ticker = ({ interval, display = displayTypes.DEFAULT, differenceInSec = 0, loading, setLoading }) => {
    const displayRef = useRef()
    const [displayLabel, setDisplayLabel] = useState('')
    const [displayArray, setDisplayArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const { months, days, hours, minutes, seconds } = interval

    const _setDisplayLabel = useCallback((a) => {
        setDisplayLabel(a)
        setLoading(false)
    }, [setLoading])

    const getDisplayArray = useCallback((totalMs, displayType) => {
        switch (displayType) {
            case displayTypes.SEC:
                _setDisplayLabel(displayTypes.SEC)
                return frontFillArray(splitIntoArray(totalMs))
            case displayTypes.MIN:
                _setDisplayLabel(displayTypes.MIN)
                return frontFillArray(splitIntoArray(totalMs / 60))
            case displayTypes.HOUR:
                _setDisplayLabel(displayTypes.HOUR)
                return frontFillArray(splitIntoArray(totalMs / 3600))
            case displayTypes.DAY:
                _setDisplayLabel(displayTypes.DAY)
                return frontFillArray(splitIntoArray(totalMs / (3600 * 24)))
            default:
                _setDisplayLabel('')
                return frontFillArray([])
        }
    }, [_setDisplayLabel])

    useEffect(() => {
        setDisplayLabel('')
        setDisplayArray(frontFillArray([]))
        if (displayRef.current !== display) {
            setLoading(true)
        }

        displayRef.current = display

        setDisplayArray(getDisplayArray(differenceInSec, display))
    }, [differenceInSec, display, getDisplayArray, setLoading])

    if (display && display !== displayTypes.DEFAULT) {
        return (
            <div className='interval-ticker-wrapper'>
                {loading ?
                    <RandomTicker length={10} />
                    :
                    <div className='interval-ticker' style={{ gridTemplateColumns: `repeat(${displayArray.length}, ${100 / displayArray.length}%)` }}>
                        {displayArray.map((section, index) =>
                            <span key={`section-${section}-${index}`} className='ticker-section'>
                                <span>
                                    {section}
                                </span>
                            </span>
                        )}
                    </div>
                }
                <div className='ticker-label'>
                    {!loading && displayLabel ?
                        <>
                            {displayLabel}s
                        </>
                        :
                        <div className='loading-text'>
                            Calculating...
                        </div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='interval-ticker-wrapper'>
            <div className='interval-ticker' style={{ gridTemplateColumns: `repeat(5, 20%)` }}>
                <span className='ticker-section'>
                    <span>
                        {standardize(months)}
                    </span>
                    <span className='ticker-section-label'>
                        Months
                    </span>
                </span>
                <span className='ticker-section'>
                    <span>
                        {standardize(days)}
                    </span>
                    <span className='ticker-section-label'>
                        Days
                    </span>
                </span>
                <span className='ticker-section'>
                    <span>
                        {standardize(hours)}
                    </span>
                    <span className='ticker-section-label'>
                        Hours
                    </span>
                </span>
                <span className='ticker-section'>
                    <span>
                        {standardize(minutes)}
                    </span>
                    <span className='ticker-section-label'>
                        Minutes
                    </span>
                </span>
                <span className='ticker-section'>
                    <span>
                        {standardize(seconds)}
                    </span>
                    <span className='ticker-section-label'>
                        Seconds
                    </span>
                </span>
            </div>
        </div>
    )
}

Ticker.propTypes = {
    interval: propTypes.shape({
        years: propTypes.number.isRequired,
        months: propTypes.number.isRequired,
        days: propTypes.number.isRequired,
        hours: propTypes.number.isRequired,
        minutes: propTypes.number.isRequired,
        seconds: propTypes.number.isRequired,
    }).isRequired,
    display: propTypes.string,
    differenceInSec: propTypes.number,
    loading: propTypes.bool,
    setLoading: propTypes.func,
}

export default Ticker
