/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
    MdOutlineSignalWifiStatusbarNull,
    MdOutlineWifiOff,
    MdOutlineWifi1Bar,
    MdOutlineWifi2Bar,
    MdOutlineWifi
} from 'react-icons/md'
import {
    BsBatteryCharging,
    BsBatteryFull,
    BsBatteryHalf,
    BsBattery
} from 'react-icons/bs'

import useGetCurrentTime from '../../../utils/getCurrentTime'
import useCycleOptions from '../../../utils/useCycleOptions'
import av1 from './../assets/link-1.jpg'
import av2 from './../assets/link-2.png'
import av3 from './../assets/aang.png'
import './index.scss'

const Avatars = () =>
    <Container className='h-100'>
        <Row className='h-100'>
            <Col className='avatars-container'>
                <span className='nintendo-avatar-container'><img src={av1} className='nintendo-avatar' /></span>
                <span className='nintendo-avatar-container'><img src={av2} className='nintendo-avatar' /></span>
                <span className='nintendo-avatar-container'><img src={av3} className='nintendo-avatar' /></span>
            </Col>
        </Row>
    </Container>

const Wifi = () => {
    const [wifiOff, setWifiOff] = useState(false)
    const [WifiComponent, cycleNext] = useCycleOptions([
        MdOutlineWifi,
        MdOutlineWifi2Bar,
        MdOutlineWifi1Bar,
        MdOutlineSignalWifiStatusbarNull,
        MdOutlineWifi1Bar,
        MdOutlineWifi2Bar,
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            cycleNext()
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='wifi-icon' onClick={() => setWifiOff(i => !i)}>
            {!wifiOff && <WifiComponent onClick={cycleNext} size='35px' />}
            {wifiOff && <MdOutlineWifiOff onClick={cycleNext} size='35px' />}
        </div>
    )
}

const Battery = () => {
    const arr = useMemo(() => [1, 2, 3, 4, 5], [])
    const [id, setId] = useState(arr[0])

    useEffect(() => {
        const interval = setInterval(() => {
            const index = arr.indexOf(id)

            if (index + 1 < arr.length) {
                setId(arr[index + 1])
            } else {
                setId(arr[0])
            }
        }, 4000)
        return () => clearInterval(interval)
    }, [arr, id])

    const size = '30px'

    if (id === 1) {
        return (
            <BsBatteryCharging className='battery-flux' size={size} />
        )
    }
    if (id === 2) {
        return (
            <BsBatteryFull size={size} />
        )
    }
    if (id === 3) {
        return (
            <BsBatteryHalf size={size} />
        )
    }
    if (id === 4) {
        return (
            <BsBattery size={size} />
        )
    }
    return (
        <BsBattery className='text-danger battery-flux' size={size} />
    )
}

const Header = () => {
    const [time, period, toggle24hour] = useGetCurrentTime()

    return (
        <Row style={{ height: '15%' }} className='nintendo-switch-header'>
            <Col xs={5} lg={4} xl={3}>
                <Avatars />
            </Col>
            <Col xs={3} lg={4} xl={5} />
            <Col xs={4} className='nintendo-switch-header-settings'>
                <Container fluid>
                    <Row>
                        <Col xs={6}>
                            <div onClick={toggle24hour} className='time-display'>
                                <span>
                                    {`${time} `}
                                </span>
                                <span className='time-period'>
                                    {period}
                                </span>
                            </div>
                        </Col>
                        <Col xs={3}>
                            <Wifi />
                        </Col>
                        <Col xs={3}>
                            <Battery />
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Header
