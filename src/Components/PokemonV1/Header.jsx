import { useState, useCallback } from 'react'
import { Button, Col, Container, Row, Form } from "react-bootstrap"
import { FiHelpCircle } from 'react-icons/fi'
import { GiTrophy } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import useDataBase from './helpers/useDatabase'
import UseConfirmModal from '../Modal/ConfirmModal'
import Modal from '../Modal/Modal'
import title from './assets/pokemonTitle.png'

const InstructionsModal = ({ close }) =>
    <Container>
        <Row>
            <Col className='text-dark text-center'>
                <h4>
                    <div >
                        {`Welcome to Name That Pokemon`}
                    </div>
                </h4>
                <h5 className='text-start my-4'>
                    <div>
                        {`The objective of this game is to correctly identify
                        the blacked out pokemon sprite and obtain the longest
                        streak you can`}
                    </div>
                    <hr />
                    <div>{`Easy Mode:`}</div>
                    <br />
                    <div>{`You get 4 multiple choice options`}</div>
                    <hr />
                    <div>{`Hard Mode:`}</div>
                    <br />
                    <div>
                        {`You don't get as much assistance.
                        In this mode you must type out the correct answer.
                        You do get suggestions.`}
                    </div>
                </h5>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button className='w-100' onClick={close}>Close</Button>
            </Col>
        </Row>
    </Container>

InstructionsModal.propTypes = {
    close: PropTypes.func,
}

export const LogoHeader = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <Row className='pokemon-game-header'>
            <Col xs={1} md={2} className='d-flex align-items-center justify-content-center'>
                <Link className='leader-board-link' to='scores' target="_blank" rel="noopener noreferrer">
                    <GiTrophy size='30%' />
                </Link>
            </Col>
            <Col className='mb-1 mt-2'>
                <img src={title} className='mw-100' />
            </Col>
            <Col xs={1} md={2} className='d-flex align-items-center justify-content-center'>
                {showModal && <Modal body={
                    <InstructionsModal close={() => setShowModal(false)} />
                } />}
                <FiHelpCircle onClick={() => setShowModal(true)} className='help-circle-icon' size='50%' />
            </Col>
        </Row>
    )
}

const displayGenArray = array => {
    if (array[0] == array[1]) {
        return `[ ${array[0]} ]`
    }
    return `[ ${array[0]}, ${array[1]} ]`
}

const Header = ({ resetGame, correct, streak = 0, exitGame, difficulty = 'EASY', generationArray = [] }) => {
    const { putScoresApi } = useDataBase()
    const [putScore, putScoreLoading] = putScoresApi
    const [scoreSaved, setScoreSaved] = useState(false)
    const [playerName, setPlayerName] = useState('')
    const saveScore = useCallback(() => {
        setScoreSaved(true)
        putScore({
            name: playerName,
            score: streak,
            mode: difficulty,
            gen: generationArray
        })
    }, [])

    const { Modal, buttonRef } = UseConfirmModal(exitGame, 'Do you want to exit the game?')
    return (
        <>
            {Modal}
            <Col xs={12}>
                <LogoHeader />
            </Col>
            <Col xs={{ span: 6, order: 1 }} sm={{ span: 6, order: 1 }} md={{ span: 3, order: 1 }}
                className='my-1 d-flex justify-content-center align-items-center'
            >
                <Button className='game-option w-100 btn-danger' ref={buttonRef}>
                    Exit Game
                </Button>
            </Col>
            <Col xs={{ span: 12, order: 3 }} md={{ span: 6, order: 2 }}
                className='d-flex align-items-center justify-content-center'
            >
                <Container>
                    <Row className='streak-counter'>
                        <Col>
                            <span className='me-2'>
                                {`STREAK: `}
                            </span>
                            <span>
                                {streak}
                                {difficulty === 'HARD' ? '(H)' : '(E)'}
                            </span>
                        </Col>
                        <Col>
                            <span>
                                {`Gen: ${displayGenArray(generationArray)}`}
                            </span>
                        </Col>
                    </Row>
                </Container>
            </Col>
            <Col
                xs={{ span: 6, order: 2 }}
                sm={{ span: 6, order: 2 }}
                md={{ span: 3, order: 3 }}
                className='my-1 d-flex justify-content-center align-items-center'
            >
                <Button disabled={correct} className='game-option w-100' onClick={resetGame}>
                    Restart
                </Button>
            </Col>
            {!correct &&
                <Col className='mt-3' xs={{ span: 12, order: 4 }}>
                    <Form className='d-flex' onSubmit={!scoreSaved ? saveScore : () => false}>
                        <Form.Group className='w-50'>
                            <Form.Control
                                className='name-input'
                                required
                                placeholder='Enter Player Name'
                                value={playerName}
                                onChange={e => setPlayerName(e.target.value)}
                            />
                        </Form.Group>
                        {!putScoreLoading ?
                            <Button type='submit' disabled={scoreSaved} className='w-50 game-option btn-success'>
                                {!scoreSaved ? 'Save Score' : 'Scored Saved!!'}
                            </Button>
                            :
                            <Button className='w-50 game-option btn-success'>
                                Loading
                            </Button>
                        }
                    </Form>
                </Col >
            }
        </>
    )
}

Header.propTypes = {
    exitGame: PropTypes.func,
    resetGame: PropTypes.func,
    correct: PropTypes.bool,
    streak: PropTypes.number,
    difficulty: PropTypes.string,
    generationArray: PropTypes.array
}

export default Header
