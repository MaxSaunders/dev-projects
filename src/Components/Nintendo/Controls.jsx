import { Button, Col, Container, Row } from 'react-bootstrap'
import { useContext } from 'react'
import propTypes from 'prop-types'
import { IoMdSettings } from 'react-icons/io'
import { AiOutlinePicture } from 'react-icons/ai'
import { FaPowerOff } from 'react-icons/fa'
import { FiShoppingBag } from 'react-icons/fi'
import {
    BsNintendoSwitch,
    BsChatLeft
} from 'react-icons/bs'

import useCycleOptions from '../../utils/useCycleOptions'
import { SwitchContext } from '.'
import './Controls.scss'

const MessageModal = ({ setShowMessage }) =>
    <div className='nintendo-modal-container'>
        <Container fluid style={{ height: '15vh', width: '30vw' }}>
            <Row style={{ height: '70%' }}>
                <Col>
                    <div className='n-modal-top'>
                        <div>
                            <div>
                                A new update is available.
                            </div>
                            <div>
                                It will be downloaded now.
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
                    <Button className='n-modal-button' onClick={() => setShowMessage(false)}>
                        Install
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>

MessageModal.propTypes = {
    setShowMessage: propTypes.func,
}

const Controls = () => {
    const { setThemeLight, setDark, setShowMessage } = useContext(SwitchContext)
    const [joyConOption, nextJoyConOption, prevJoyConOption] = useCycleOptions(
        ['light', 'dark', 'success', 'warning', 'danger', 'info']
    )

    const _setShowMessage = () => {
        setShowMessage({
            modalClassName: 'nintendo-screen-modal',
            body: <MessageModal setShowMessage={setShowMessage} />
        })
    }

    return (
        <Row style={{ height: '19%' }} className='nintendo-controls-bar d-flex align-items-center'>
            <Col xs={0} md={1} lg={1} xl={3} />
            <Col xs={12} md={10} lg={10} xl={6} className='d-inline-flex nintendo-options-bar'>
                <div className='nintendo-option-circle text-danger'
                    onClick={_setShowMessage}
                >
                    <BsChatLeft size='40px' />
                </div>
                <div className='nintendo-option-circle text-warning'>
                    <FiShoppingBag size='42px' />
                </div>
                <div className='nintendo-option-circle text-primary'>
                    <AiOutlinePicture size='45px' />
                </div>
                <div
                    className={`nintendo-option-circle text-${joyConOption}`}
                    onContextMenu={e => e.preventDefault() || prevJoyConOption()}
                    onClick={nextJoyConOption}
                >
                    <BsNintendoSwitch size='40px' />
                </div>
                <div className='nintendo-option-circle' onClick={() => setThemeLight(i => !i)}>
                    <IoMdSettings size='50px' />
                </div>
                <div className='nintendo-option-circle' onClick={() => setDark(i => !i)}>
                    <FaPowerOff size='40px' />
                </div>
            </Col >
            <Col xs={0} md={1} lg={1} xl={3} />
        </Row >
    )
}

export default Controls
