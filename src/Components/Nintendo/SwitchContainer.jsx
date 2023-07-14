import { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { BsTriangleFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'

import './SwitchContainer.scss'

const SwitchContainer = ({ children, setSelected }) => {
    const [flash, setFlash] = useState(false)

    const screenshotTarget = document.body;

    const capture = () => {
        // eslint-disable-next-line no-undef
        html2canvas(screenshotTarget).then((canvas) => {
            const link = document.createElement('a');
            link.download = 'filename.png';
            link.href = canvas.toDataURL()
            link.click()
        }).catch(err =>
            console.error(err)
        )
    }

    useEffect(() => {
        setTimeout(() => {
            setFlash(false)
        }, 5000)
    }, [flash])

    return (
        <div className='switch-container'>
            <div className='switch'>
                <div className='body'>
                    <div className={`screen flash-${flash}`}>
                        {children}
                    </div>
                </div>

                <div className='joy-con left'>
                    <div className='button-group'>
                        <div className='button arrow up'>
                            <BsTriangleFill size='35%' />
                        </div>
                        <div className='button arrow right' onClick={() => setSelected(i => i + 1)}>
                            <BsTriangleFill size='35%' />
                        </div>
                        <div className='button arrow down'>
                            <BsTriangleFill size='35%' />
                        </div>
                        <div className='button arrow left' onClick={() => setSelected(i => i - 1)}>
                            <BsTriangleFill size='35%' />
                        </div>
                    </div>

                    <div className='stick' />
                    <div className='select' />
                    <div className='capture' onClick={() => setFlash(true) || capture()} />
                </div>

                <div className='joy-con right'>
                    <div className='button-group'>
                        <div className='button letter text-light up'>X</div>
                        <div className='button letter text-light right'>A</div>
                        <div className='button letter text-light down'>B</div>
                        <div className='button letter text-light left'>Y</div>
                    </div>

                    <div className='stick' />
                    <div className='start' />
                    <div className='home' onClick={() => setSelected(0)}>
                        <AiFillHome size='50%' />
                    </div>
                </div>
            </div>
        </div>
    )
}

SwitchContainer.propTypes = {
    children: propTypes.node,
    setSelected: propTypes.func
}

export default SwitchContainer
