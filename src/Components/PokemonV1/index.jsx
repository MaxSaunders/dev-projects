/* eslint-disable react/prop-types */
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState, useCallback } from 'react'
import { ImSpinner5 } from 'react-icons/im'

import { getRandomNumbers } from '../../utils/getRandom'
import Header, { LogoHeader } from './Header'
import useGetPokemon from './useGetPokemon'
import Options from './Options'
import Hints from './Hints'
import './index.scss'

const PokemonGame = ({ difficulty, exitGame }) => {
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
        const pokeCount = 1010
        const randomNumbers = getRandomNumbers(1, pokeCount, 4)

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
    }, [difficulty, fetchRandomPokemonName, getPokemon])

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
                <Header difficulty={difficulty} exitGame={exitGame} correct={correct} resetGame={resetGame} streak={streak} fetchPokemon={fetchPokemon} />
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
    const [difficulty, setDifficulty] = useState('')

    if (!difficulty) {
        return (
            <div className='pt-5 pokemon-game-wrapper'>
                <Container className='pokemon-menu pokemon-game'>
                    <Row>
                        <Col>
                            <LogoHeader />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 className='text-dark mb-0 mt-4 fw-bold'>
                                Please pick a difficulty:
                            </h2>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col xs={12} md={6}>
                            <Button className='menu-btn mb-4' onClick={() => setDifficulty('EASY')}>
                                EASY
                            </Button>
                        </Col>
                        <Col xs={12} md={6}>
                            <Button className='menu-btn btn-danger' onClick={() => setDifficulty('HARD')}>
                                HARD
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    return (
        <div className='pt-5 pokemon-game-wrapper'>
            <PokemonGame difficulty={difficulty} exitGame={() => setDifficulty('')} />
        </div>
    )
}

export default Pokemon
