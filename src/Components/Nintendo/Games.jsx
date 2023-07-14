import { useCallback, useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import propTypes from 'prop-types'

import { SwitchContext } from '.'
import './Games.scss'

const GameContextMenu = ({ removeGame, setShowMessage }) =>
    <div className='nintendo-modal-container'>
        <Container fluid style={{ height: '15vh', width: '30vw' }}>
            <Row style={{ height: '70%' }}>
                <Col>
                    <div className='n-modal-top'>
                        <div>
                            <div>
                                Would you like to close this software?
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{ height: '30%' }}>
                <Col className='n-modal-button-container'>
                    <Button className='n-modal-button' onClick={() => setShowMessage(false)}>
                        Cancel
                    </Button>
                </Col>
                <Col className='n-modal-button-container'>
                    <Button className='n-modal-button' onClick={removeGame}>
                        Close
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>


GameContextMenu.propTypes = {
    removeGame: propTypes.func,
    setShowMessage: propTypes.func,
}

const GameRender = ({ src, index, setSelected, selected, removeGame }) =>
    <div
        id={`n-game-${index}`}
        onClick={() => setSelected(index)}
        onContextMenu={removeGame}
        className={`nintendo-game-art ${selected === index && 'selected'}`}
    >
        <img src={src} />
    </div>

GameRender.propTypes = {
    src: propTypes.string,
    index: propTypes.number,
    setSelected: propTypes.func,
    selected: propTypes.number,
    removeGame: propTypes.func,
}

const throttle = (callback, limit) => {
    let wait = false;
    return (e) => {
        if (!wait) {
            callback(e);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}

const Games = () => {
    const { selected, setSelected, setGames, setShowMessage } = useContext(SwitchContext)
    const scrollDiv = document.getElementsByClassName('nintendo-game-carousel carousel-main')[0]
    const leftDiv = document.getElementsByClassName('carousel-left')[0]
    const rightDiv = document.getElementsByClassName('carousel-right')[0]

    const getCarouselSideInfo = useCallback((elem) => {
        if (!elem) return null
        let rect = elem.getBoundingClientRect();
        let radius = (rect.right - rect.left) / 2;
        return {
            elem: elem,
            centerX: (rect.right + rect.left) / 2,
            centerY: (rect.bottom + rect.top) / 2,
            radius2: radius * radius
        }
    }, [])

    const [movingLeft, setMovingLeft] = useState(false)
    const [movingRight, setMovingRight] = useState(false)

    const carouselMover = useCallback((e) => {
        let deltaX = 0
        let deltaY = 0

        const leftInfo = getCarouselSideInfo(leftDiv)
        if (leftInfo && e) {
            deltaX = e.pageX - leftInfo.centerX;
            deltaY = e.pageY - leftInfo.centerY;
            if (deltaX * deltaX + deltaY * deltaY <= leftInfo.radius2) {
                setMovingLeft(true)
            } else {
                setMovingLeft(false)
            }
        }

        const rightInfo = getCarouselSideInfo(rightDiv)
        if (rightInfo && e) {
            deltaX = e.pageX - rightInfo.centerX;
            deltaY = e.pageY - rightInfo.centerY;
            if (deltaX * deltaX + deltaY * deltaY <= rightInfo.radius2) {
                setMovingRight(true)
            } else {
                setMovingRight(false)
            }
        }
    }, [getCarouselSideInfo, leftDiv, rightDiv])

    useEffect(() => {
        window.addEventListener("mousemove", throttle(carouselMover, 300))
    }, [carouselMover])

    const scrollLeft = useCallback(() => {
        if (scrollDiv) {
            scrollDiv.scrollLeft -= 40
        }
    }, [scrollDiv])

    const scrollRight = useCallback(() => {
        if (scrollDiv) {
            scrollDiv.scrollLeft += 40
        }
    }, [scrollDiv])

    useEffect(() => {
        const interval = setInterval(() => {
            if (movingLeft && !movingRight) {
                scrollLeft()
            }

            if (movingRight && !movingLeft) {
                scrollRight()
            }
        }, 60)
        return () => clearInterval(interval)
    }, [movingLeft, movingRight, scrollLeft, scrollRight])

    const _setSelected = index => {
        setMovingRight(false)
        setMovingLeft(false)
        const element = document.getElementById(`n-game-${index}`)
        element?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
        setSelected(index)
    }

    const removeGame = index => () => {
        setGames(i => {
            const arrCopy = i
            i.splice(index, 1)
            return [...arrCopy]
        })
        setShowMessage(false)
    }

    const _setShowMessage = index => e => {
        e.preventDefault()
        setShowMessage({
            modalClassName: 'nintendo-screen-modal',
            body: <GameContextMenu removeGame={removeGame(index)} setShowMessage={setShowMessage} />
        })
    }

    return (
        <Row className='nintendo-games-row' style={{ height: '55%', minHeight: '22vh' }}>
            <Col>
                <SwitchContext.Consumer>
                    {({ games }) =>
                        <Container fluid className='nintendo-game-carousel-container' style={{ height: '100%', minHeight: '100%' }} onMouseLeave={() => setMovingRight(false) || setMovingLeft(false)}>
                            <Row style={{ height: '100%', minHeight: '100%' }}>
                                <Col className='d-flex nintendo-game-carousel'>
                                    <div className='carousel-left' />
                                    <div className='nintendo-game-carousel carousel-main'>
                                        {games?.map((g, index) =>
                                            <GameRender
                                                key={'game-' + index}
                                                src={g}
                                                index={index}
                                                setSelected={_setSelected}
                                                selected={selected}
                                                removeGame={_setShowMessage(index)}
                                            />
                                        )}
                                    </div>
                                    <div className='carousel-right' />
                                </Col>
                            </Row>
                        </Container>
                    }
                </SwitchContext.Consumer>
            </Col>
        </Row>
    )
}

export default Games
