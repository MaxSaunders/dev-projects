/* eslint-disable react/prop-types */
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { ImSpinner5 } from 'react-icons/im'

import { getRandomNumbers } from '../../utils/getRandom'
import Header, { LogoHeader } from './Header'
import SelectField from './../SelectField'
import useGetPokemon from './useGetPokemon'
import Options from './Options'
import Hints from './Hints'
import './index.scss'

const generations = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1010],
}

const PokemonGame = ({ difficulty, exitGame, generationArray }) => {
    const { getPokemon } = useGetPokemon()
    const [pokemon, setPokemon] = useState({})
    const [pokemonNameArray, setPokemonNameArray] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingOptions, setLoadingOptions] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [correct, setCorrect] = useState(true)
    const [guessed, setGuessed] = useState(false)
    const [prevGuess, setPrevGuess] = useState('')
    const [streak, setStreak] = useState(0)
    const [showHint, setShowHint] = useState(false)

    const resetState = useCallback(() => {
        setStreak(0)
        setCorrect(true)
        setHidden(true)
        setShowHint(false)
        setGuessed(false)
    }, [])

    const fetchRandomPokemonName = useCallback(indexArray => {
        getPokemon(indexArray[0]).then(res => setPokemonNameArray(i => [...i, res.name]))
        getPokemon(indexArray[1]).then(res => setPokemonNameArray(i => [...i, res.name]))
        getPokemon(indexArray[2]).then(res => setPokemonNameArray(i => [...i, res.name]))
    }, [getPokemon])

    const fetchPokemon = useCallback(() => {
        setShowHint(false)
        setLoadingOptions(true)
        setLoading(true)
        setGuessed(false)
        setHidden(true)
        setPokemonNameArray([])

        const randomNumbers = getRandomNumbers(generations[generationArray[0]][0], generations[generationArray[1]][1], 4)

        if (difficulty == 'EASY') {
            fetchRandomPokemonName(randomNumbers.splice(1, 3))
        }

        getPokemon(randomNumbers[0]).then(pokeRes => {
            setPokemon(pokeRes)
            setPokemonNameArray(i => [...i, pokeRes?.name]?.sort())

            if (!pokeRes?.name) {
                fetchPokemon()
            }
        }).then(() => setLoading(false))
    }, [difficulty, fetchRandomPokemonName, generationArray, getPokemon])

    // add generation to this info
    const { name, sprites } = pokemon || {}
    const imgUrl = sprites?.other?.['official-artwork'].front_default

    const _setShowHint = () => setShowHint(true)

    const guess = useCallback(guessOption => {
        if (!guessOption) return
        setPrevGuess(guessOption)
        setGuessed(true)
        if (guessOption?.toUpperCase() == name?.toUpperCase()) {
            setCorrect(true)
            if (showHint) {
                setStreak(i => i + 0.5)
            } else {
                setStreak(i => i + 1)
            }
        } else {
            setCorrect(false)
        }
        setHidden(false)
    }, [name, showHint])

    const resetGame = useCallback(() => {
        resetState()
        fetchPokemon()
    }, [fetchPokemon, resetState])

    useEffect(() => {
        fetchPokemon()
    }, [])

    useEffect(() => {
        if (difficulty == 'EASY') {
            if (pokemonNameArray?.length === 4) {
                setLoadingOptions(false)
            }
        } else {
            if (pokemonNameArray?.length === 1) {
                setLoadingOptions(false)
            }
        }
    }, [difficulty, pokemonNameArray])

    if (loading || loadingOptions) {
        return (
            <Container className='pokemon-game'>
                <Row>
                    <Col xs={12}>
                        <LogoHeader />
                    </Col>
                </Row>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs={12}>
                        <ImSpinner5 size='60%' className='loading-spinner text-danger' color='black' />
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container className='pokemon-game'>
            <Row>
                <Header difficulty={difficulty} exitGame={exitGame} correct={correct} resetGame={resetGame} streak={streak} fetchPokemon={fetchPokemon} generationArray={generationArray} />
            </Row>
            <Row>
                <Col xs={12}>
                    {hidden ?
                        <></>
                        :
                        <span className={`mt-4 pokemon-name guess-${correct}`}>
                            {name?.toUpperCase()}
                        </span>
                    }
                </Col>
                <Col className='mb-1' xs={12} onDragStart={e => e.preventDefault()}>
                    <img onContextMenu={e => e.preventDefault()} onDragStart={e => e.preventDefault()} className={`pokemon-picture hidden-${hidden}`} src={imgUrl} />
                </Col>
            </Row>
            {showHint && <Hints pokemon={pokemon} />}
            <Row>
                {correct ?
                    <Options
                        correctAnswer={name?.toUpperCase()}
                        setShowHint={_setShowHint}
                        difficulty={difficulty}
                        guessed={guessed}
                        pokemonNameArray={pokemonNameArray}
                        fetchPokemon={fetchPokemon}
                        guess={guess}
                    />
                    :
                    <div className='pokemon-name guess-false'>
                        {`You guessed: ${prevGuess?.toUpperCase()}`}
                    </div>
                }
            </Row >
        </Container >
    )
}

const Pokemon = () => {
    const [start, setStart] = useState(false)
    const [difficulty, setDifficulty] = useState('')
    const [generationArray, setGenerationArray] = useState([1, 9])

    const optionsFrom = useMemo(() => {
        let tempArray = []
        let i = 1
        while (i <= generationArray[1]) {
            tempArray.push({ label: i, value: i })
            i++
        }
        return tempArray
    }, [generationArray])

    const optionsTo = useMemo(() => {
        let tempArray = []
        let i = generationArray[0]
        while (i <= 9) {
            tempArray.push({ label: i, value: i })
            i++
        }
        return tempArray
    }, [generationArray])

    if (!start) {
        return (
            <div className='pt-5 pokemon-game-wrapper'>
                <Container className='pokemon-menu pokemon-game'>
                    <Row>
                        <Col>
                            <LogoHeader />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <div className='fs-4 fw-bold'>
                                Select the generations you which to guess from
                            </div>
                            {!generationArray.length ? <div className='text-danger'>* Please select a generation(s) *</div> : <></>}
                        </Col>
                    </Row>
                    <Row className='my-4 fs-4 fw-bold'>
                        <Col xs={0} lg={3} />
                        <Col xs={6} lg={3}>
                            <SelectField labelClassName='w-100' className='w-100 text-center' onChange={e => setGenerationArray(i => [e, i[1]])} value={generationArray[0]} options={optionsFrom} label='From Gen' />
                        </Col>
                        <Col xs={6} lg={3}>
                            <SelectField labelClassName='w-100' className='w-100 text-center' onChange={e => setGenerationArray(i => [i[0], e])} value={generationArray[1]} options={optionsTo} label='To Gen' />
                        </Col>
                        <Col xs={0} lg={3} />
                    </Row>
                    <Row>
                        <Col>
                            <h2 className='text-dark mb-0 mt-4 fw-bold'>
                                Please pick a difficulty:
                            </h2>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col xs={12} md={6}>
                            <Button className={`${difficulty === 'EASY' ? 'active' : ''} menu-btn mb-4`} onClick={() => setDifficulty('EASY')}>
                                EASY
                            </Button>
                        </Col>
                        <Col xs={12} md={6}>
                            <Button className={`${difficulty === 'HARD' ? 'active' : ''} menu-btn btn-danger mb-4`} onClick={() => setDifficulty('HARD')}>
                                HARD
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => setStart(true)} disabled={!difficulty || !generationArray.length} className='menu-btn'>
                                Start {difficulty}
                            </Button>
                        </Col>
                    </Row>
                </Container >
            </div >
        )
    }

    return (
        <div className='pt-5 pokemon-game-wrapper'>
            <PokemonGame
                generationArray={generationArray}
                difficulty={difficulty}
                exitGame={() => setStart(false)}
            />
        </div>
    )
}

export default Pokemon
