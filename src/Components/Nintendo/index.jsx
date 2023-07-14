/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { GiConsoleController } from 'react-icons/gi'
import { BsPlusCircleFill } from 'react-icons/bs'

import Games from './Games'
import Header from './Header'
import Controls from './Controls'
import { gamesArray } from './assets/games'
import { CustomModal } from '../Modal/Modal'
import SwitchContainer from './SwitchContainer'
import useGetScreenSize from '../../utils/useGetScreenSize'
import './index.scss'

export const SwitchContext = createContext()

const SwitchScreen = () => {
    const { themeLight, dark, _setDarkOff, showMessage, setShowMessage } = useContext(SwitchContext)

    const turnOffEffects = () => {
        if (showMessage) {
            setShowMessage(false)
        }
        _setDarkOff()
    }

    return (
        <>
            {showMessage &&
                <div className='nintendo-screen-modal'>
                    <CustomModal {...showMessage} />
                </div>
            }
            <Container fluid style={{ height: '100%' }} className={`px-0 nintendo-switch-container theme-light-${themeLight} filter-darken-${dark}`} onClick={turnOffEffects}>

                <Header />

                <Games />

                <Controls />

                <Row style={{ height: '1%' }}>
                    <Col className='d-inline-flex justify-content-center'>
                        <hr className='nintendo-footer-hr my-1' />
                    </Col>
                </Row>
                <Row style={{ height: '10%' }} className='px-4'>
                    <Col xs={3} className='d-flex justify-content-center align-items-center'>
                        <div style={{ width: '80%' }} className='d-flex justify-content-between align-items-center'>
                            <GiConsoleController size='30px' />
                            <h5 className='mb-0'>
                                Max Saunders
                            </h5>
                        </div>
                    </Col>
                    <Col xs={3} md={5} lg={6} />
                    <Col xs={6} md={4} lg={3} className='nintendo-footer-controls d-inline-flex justify-content-around align-items-center'>
                        <div className='d-flex align-items-center'>
                            <BsPlusCircleFill className='me-1' />
                            Options
                        </div>
                        <div className='d-flex align-items-center'>
                            <BsPlusCircleFill className='me-1 rotate-45' />
                            Start
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const SwitchHome = () => {
    const [test, setTest] = useState(1)

    const [games, setGames] = useState(gamesArray)
    const [dark, setDark] = useState(false)
    const [selected, _setSelected] = useState(0)
    const [showMessage, setShowMessage] = useState(false)

    const setSelected = indexFunc => {
        _setSelected(i => {
            let index = 0
            if (typeof indexFunc == 'function') {
                index = indexFunc(i)
            } else {
                index = indexFunc
            }
            if (index < 0) {
                index = gamesArray.length - 1
            } else if (index >= gamesArray.length) {
                index = 0
            }
            const element = document.getElementById(`n-game-${index}`)
            element.scrollIntoView({ behavior: 'smooth', inline: 'center' })
            return index
        })
    }

    const [themeLight, setThemeLight] = useState(false)
    const [screenSize, VIEWS] = useGetScreenSize()

    const _setDarkOff = () => {
        if (!dark) return
        setDark(false)
    }

    const contextValue = useMemo(() => {
        return {
            themeLight,
            setThemeLight,
            setDark,
            dark,
            _setDarkOff,
            selected,
            setSelected,
            games,
            setGames,
            showMessage,
            setShowMessage,
            test,
            setTest
        }
    }, [themeLight, setThemeLight, setDark, dark, _setDarkOff, selected, setSelected])

    if (screenSize > VIEWS.md) {
        return (
            <div className='switch-project-container'>
                <SwitchContext.Provider value={contextValue}>
                    <SwitchContainer setSelected={setSelected}>
                        <SwitchScreen />
                    </SwitchContainer>
                </SwitchContext.Provider>
            </div>
        )
    }

    if (screenSize > VIEWS.xs) {
        return (
            <div className='switch-project-container'>
                <SwitchContext.Provider value={contextValue}>
                    <div className='switch-small-container'>
                        <SwitchScreen />
                    </div>
                </SwitchContext.Provider>
            </div>
        )
    }

    return (
        <div className=''>
            <h2 className='mx-2'>
                <div className='mb-4'>
                    This component needs a bigger screen to render properly
                </div>
                <div>
                    Please Increase Your Screen Size
                </div>
            </h2>
        </div>
    )
}

export default SwitchHome
