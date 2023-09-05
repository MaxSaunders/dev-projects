import { useState, useMemo, useCallback, useEffect } from "react"
import PropTypes from 'prop-types'

import useGetDaily from "./useGetDaily"
import './index.scss'

const MAX_MOVES = 15

// Matches index in character array to corresponding word
const KEY = {
    0: [0, 3],
    1: [0],
    2: [0, 4],
    3: [0],
    4: [0, 5],
    5: [3],
    6: [4],
    7: [5],
    8: [1, 3],
    9: [1],
    10: [1, 4],
    11: [1],
    12: [1, 5],
    13: [3],
    14: [4],
    15: [5],
    16: [2, 3],
    17: [2],
    18: [2, 4],
    19: [2],
    20: [2, 5],
}

// const reverseKey = Object.entries(KEY).reduce((acc, [key, value]) => {
//     const temp = { ...acc }

//     let j = 0
//     while (j < value.length) {
//         // index of the word
//         const index = value[j] || -1
//         const curr = temp[index] || []
//         temp[index] = [...curr, key]
//         j++
//     }

//     return { ...temp }
//     // {
//     // 0: ['0', '1', '2', '3', '4']
//     // 1: ['8', '9', '10', '11', '12']
//     // 2: ['16', '17', '18', '19', '20']
//     // 3: ['0', '5', '8', '13', '16']
//     // 4: ['2', '6', '10', '14', '18']
//     // 5: ['4', '7', '12', '15', '20']
//     // }
// }, {})

const randomizeLetters = (lettersArray) => {
    const temp = [...lettersArray]
    let j = 0
    return temp.toSorted(() => {
        const comp = Math.sin((j + new Date().getDay()) * (Math.PI / 2)).toFixed(2)
        j++
        return comp
    })
}

const BlankSquare = () => <span className='puzzle-square blank' />

const PuzzleSquare = ({ state, dragging, dragOver, letterArray, handleDrag, handleDragEnter, handleDrop, index, words, gameOver }) => {
    const letter = useMemo(() => state[index], [index, state])
    const wordKeyArray = useMemo(() => KEY[index], [index])
    const isDragOver = useMemo(() => dragOver === index, [dragOver, index])

    const isCorrect = useMemo(() => {
        if (letterArray[index] === state[index]) {
            return 'true'
        }

        let j = 0
        while (j < wordKeyArray.length) {
            const wordIndex = wordKeyArray[j]

            if (words[wordIndex].includes(letter)) {
                return 'maybe'
            }
            j++
        }

        return 'false'
    }, [index, wordKeyArray, letter, letterArray, state, words])

    const className = useMemo(() => `puzzle-square-div square-${index} dragging-${dragging} correct-${isCorrect} dragOver-${isDragOver}`, [dragging, index, isCorrect, isDragOver])

    return (
        <span className={`puzzle-square`}>
            <div
                id={`square-${index}`}
                className={className}
                draggable={!gameOver && (isCorrect !== 'true')}
                onDrag={handleDrag(index)}
                onDragEnter={handleDragEnter(index)}
                onDragEnd={handleDrop}
            >
                {(letter).toUpperCase()}
            </div>
        </span>
    )
}

PuzzleSquare.propTypes = {
    state: PropTypes.array,
    letterArray: PropTypes.array,
    gameOver: PropTypes.bool,
    index: PropTypes.number,
    dragging: PropTypes.number,
    dragOver: PropTypes.number,
    handleDrag: PropTypes.func,
    handleDragEnter: PropTypes.func,
    handleDragLeave: PropTypes.func,
    handleDrop: PropTypes.func,
    words: PropTypes.arrayOf(PropTypes.string),
}

const calcDuration = (a, b) => Math.sqrt((a * a) + (b * b))

const moveElement = (e, xDiff, yDiff) => e.animate([{ transform: 'translate(' + (xDiff) + 'px, ' + (yDiff) + 'px)' }, { transition: 'all 0.1s ease' }], { duration: calcDuration(xDiff, yDiff) })

const getPuzzleSquare = index => document.getElementById('square-' + index)

const animateSwitch = (aIndex, bIndex) => {
    const a = getPuzzleSquare(aIndex)
    const b = getPuzzleSquare(bIndex)

    const aCords = a.getBoundingClientRect()
    const bCords = b.getBoundingClientRect()

    moveElement(a, bCords.left - aCords.left, bCords.top - aCords.top)
    moveElement(b, aCords.left - bCords.left, aCords.top - bCords.top)
}

const Waffle = () => {
    const [words, setWords] = useState([])
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)
    const [dragOver, setDragOver] = useState(-1)
    const [dragging, setDragging] = useState(-1)
    const [moveCount, setMoveCount] = useState(0)
    const gameOver = useMemo(() => (+MAX_MOVES - +moveCount) <= 0, [moveCount])
    const getDaily = useGetDaily()

    useEffect(() => {
        setWords([...getDaily()])
        setLoading(false)
    }, [getDaily])

    const handleDrag = useCallback((index) => {
        return () => setDragging(index)
    }, [])

    const handleDragEnter = useCallback((index) => {
        return () => setDragOver(index)
    }, [])

    const handleDragLeave = useCallback(() => {
        setDragOver(-1)
    }, [])

    const letterArray = useMemo(() => {
        // TODO: this needs serious work
        const temp = []
        if (!words.length) {
            return temp
        }

        temp.push(words[0][0])
        temp.push(words[0][1])
        temp.push(words[0][2])
        temp.push(words[0][3])
        temp.push(words[0][4])

        temp.push(words[3][1])
        temp.push(words[4][1])
        temp.push(words[5][1])

        temp.push(words[1][0])
        temp.push(words[1][1])
        temp.push(words[1][2])
        temp.push(words[1][3])
        temp.push(words[1][4])

        temp.push(words[3][3])
        temp.push(words[4][3])
        temp.push(words[5][3])

        temp.push(words[2][0])
        temp.push(words[2][1])
        temp.push(words[2][2])
        temp.push(words[2][3])
        temp.push(words[2][4])

        setState(randomizeLetters(temp))
        return temp

        // const temp = []

        // words[0].forEach(word => {
        //     for (const element of word) {
        //         temp.push(element)
        //     }
        // })

        // words[1].forEach(i => {
        //     temp.push(i[1])
        //     temp.push(i[3])
        // })

        // return temp
    }, [words])


    const switchFunc = useCallback((aIndex, bIndex) => {
        if (aIndex < 0 || bIndex < 0) {
            return
        }

        setState(prevState => {
            const aVal = prevState[aIndex]
            const bVal = prevState[bIndex]
            const tempArray = [...prevState]

            tempArray[aIndex] = bVal
            tempArray[bIndex] = aVal

            setDragging(-1)
            setDragOver(-1)
            return [...tempArray]
        })
    }, [])

    const handleDrop = useCallback(() => {
        // if one is correct cancel switch
        if (gameOver) {
            setDragging(-1)
            setDragOver(-1)
            return
        }

        if (
            letterArray[dragOver] === state[dragOver] ||
            letterArray[dragging] === state[dragging]
        ) {
            setDragging(-1)
            setDragOver(-1)
            return
        }

        if (state[dragOver] === state[dragging]) {
            animateSwitch(dragOver, dragging)
            setDragging(-1)
            setDragOver(-1)
            return
        }

        if (dragOver !== dragging) {
            animateSwitch(dragOver, dragging)
            switchFunc(dragOver, dragging)
            setMoveCount(i => i + 1)
        }
    }, [dragOver, dragging, gameOver, letterArray, state, switchFunc])

    const props = useMemo(() => ({
        state,
        letterArray,
        dragOver,
        dragging,
        words,
        gameOver,
        handleDrag,
        handleDragEnter,
        handleDragLeave,
        handleDrop
    }), [state, letterArray, dragOver, dragging, words, gameOver, handleDrag, handleDragEnter, handleDragLeave, handleDrop])

    if (loading || !words.length) {
        return (
            <></>
        )
    }

    return (
        <div>
            <div className='waffle-title'>
                Daily Waffle
            </div>
            <div className={`waffle-wrapper game-over-${gameOver}`} onMouseLeave={handleDragLeave}>
                <div className='waffle-puzzle' id='waffle-puzzle'>
                    <PuzzleSquare index={0} {...props} />
                    <PuzzleSquare index={1} {...props} />
                    <PuzzleSquare index={2} {...props} />
                    <PuzzleSquare index={3} {...props} />
                    <PuzzleSquare index={4} {...props} />
                    <PuzzleSquare index={5} {...props} />
                    <BlankSquare {...props} />
                    <PuzzleSquare index={6} {...props} />
                    <BlankSquare {...props} />
                    <PuzzleSquare index={7} {...props} />
                    <PuzzleSquare index={8} {...props} />
                    <PuzzleSquare index={9} {...props} />
                    <PuzzleSquare index={10} {...props} />
                    <PuzzleSquare index={11} {...props} />
                    <PuzzleSquare index={12} {...props} />
                    <PuzzleSquare index={13} {...props} />
                    <BlankSquare {...props} />
                    <PuzzleSquare index={14} {...props} />
                    <BlankSquare {...props} />
                    <PuzzleSquare index={15} {...props} />
                    <PuzzleSquare index={16} {...props} />
                    <PuzzleSquare index={17} {...props} />
                    <PuzzleSquare index={18} {...props} />
                    <PuzzleSquare index={19} {...props} />
                    <PuzzleSquare index={20} {...props} />
                </div>
            </div>
            <div className='mt-3 fs-2'>
                <span className='fw-bold'>
                    {+MAX_MOVES - +moveCount}
                </span>
                <span className='text-light' style={{ fontWeight: '500' }}>
                    &nbsp;Swaps Remaining
                </span>
            </div>
        </div >
    )
}

export default Waffle
