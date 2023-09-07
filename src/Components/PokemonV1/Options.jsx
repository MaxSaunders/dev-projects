import { useState, useMemo } from "react"
import { Button, Col, Container, OverlayTrigger, Popover, PopoverBody, Row } from "react-bootstrap"
import { FaArrowRight } from "react-icons/fa"
import { DropdownList } from "react-widgets"
import PropTypes from 'prop-types'

import pokemon from './helpers/pokemon.json'

const Options = ({ guessed, correctAnswer = '', pokemonNameArray = [], fetchPokemon, guess, difficulty = 'EASY', setShowHint = () => false }) => {
    const suggestions = useMemo(() => {
        const names = pokemon.filter(p => p?.name?.english).map(p => p?.name?.english?.toUpperCase())

        if (!names.includes(correctAnswer)) {
            names.push(correctAnswer)
        }

        const arrTemp = names.map(name => {
            if (!name) return
            return {
                value: name,
                label: name
            }
        })

        return arrTemp.sort((a, b) => a.label.localeCompare(b.label))
    }, [correctAnswer])

    const [input, setInput] = useState()

    if (guessed) {
        return (
            <Col xs={12}>
                <Button className='w-100 mb-3 pokemon-option' onClick={fetchPokemon}>
                    Get Another
                    <FaArrowRight className='ms-3' />
                </Button>
            </Col>
        )
    }

    if (difficulty == 'HARD') {
        return (
            <Col>
                <Container fluid>
                    <Row>
                        <Col xs={{ span: 6, order: 1 }} md={{ span: 2, order: 1 }} className='mb-2 mb-md-0'>
                            <OverlayTrigger
                                key='hint-button'
                                placement='auto-start'
                                overlay={
                                    <Popover>
                                        <PopoverBody>
                                            <div>
                                                Using a hint will cost you 1/2 a point
                                            </div>
                                        </PopoverBody>
                                    </Popover>
                                }
                            >
                                <Button size='lg' variant='success' className='w-100 fw-bold' onClick={setShowHint}>
                                    HINT
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col xs={{ span: 12, order: 3 }} md={{ span: 8, order: 2 }} className='mb-2 mb-md-0 d-grid align-items-center'>
                            <div className='pokemon-option-input'>
                                <DropdownList
                                    placeholder='Guess Here'
                                    onToggle={(e) => e && setInput('')}
                                    dataKey='value'
                                    textField='label'
                                    value={input}
                                    onChange={e => setInput(e.value)}
                                    data={suggestions}
                                />
                            </div>
                        </Col>
                        <Col xs={{ span: 6, order: 2 }} md={{ span: 2, order: 3 }}>
                            <Button size='lg' className='mb-2 mb-md-0 w-100 fw-bold' onClick={() => guess(input)}>
                                GUESS
                            </Button>
                        </Col>
                    </Row >
                </Container >
            </Col >
        )
    }

    return (
        <>
            {pokemonNameArray?.map(option =>
                option &&
                <Col xs={6} md={3} key={option} className='mb-2 mb-md-0'>
                    <Button className='h-100 w-100 mb-3 pokemon-option' onClick={() => guess(option)}>
                        {option?.toUpperCase()}
                    </Button>
                </Col>
            )}
        </>
    )
}

Options.propTypes = {
    guessed: PropTypes.bool,
    pokemonNameArray: PropTypes.array,
    fetchPokemon: PropTypes.func,
    guess: PropTypes.func,
    setShowHint: PropTypes.func,
    difficulty: PropTypes.string,
    correctAnswer: PropTypes.string,
}

export default Options
