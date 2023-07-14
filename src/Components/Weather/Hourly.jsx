import { useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SimpleBarReact from 'simplebar-react'
import PropTypes from 'prop-types'
import 'simplebar-react/dist/simplebar.min.css'

import getIcon from './getIcon'
import './Hourly.scss'

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" })
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })

const HourlyRow = ({ timestamp, iconCode, precip, temp, windSpeed, feelsLike, index }) => {
    const day = useMemo(() => DAY_FORMATTER.format(timestamp), [timestamp])
    const time = useMemo(() => HOUR_FORMATTER.format(timestamp), [timestamp])
    const IconSvg = useMemo(() => getIcon(iconCode), [iconCode])

    return (
        <Container fluid className={`background-${(index % 2 == 0) ? 'dark' : 'light'}`}>
            <Row>
                <Col xs={4} md={2} className='my-1 my-md-0'>
                    <div className='hourly-header'>{day}</div>
                    <div className='hourly-data'>{time}</div>
                </Col>
                <Col xs={4} md={2} className='hourly-icon'>
                    <IconSvg size='70%' />
                </Col>
                <Col xs={4} md={2} className='my-1 my-md-0'>
                    <div className='hourly-header'>TEMP</div>
                    <div className='hourly-data'>{temp}{'\u00B0F'}</div>
                </Col>
                <Col xs={4} md={2} className='my-1 my-md-0'>
                    <div className='hourly-header'>FL TEMP</div>
                    <div className='hourly-data'>{feelsLike}{'\u00B0F'}</div>
                </Col>
                <Col xs={4} md={2} className='my-1 my-md-0'>
                    <div className='hourly-header'>WIND</div>
                    <div className='hourly-data'>{windSpeed} MPH</div>
                </Col>
                <Col xs={4} md={2} className='my-1 my-md-0'>
                    <div className='hourly-header'>PRECIP</div>
                    <div className='hourly-data'>{precip} in</div>
                </Col>
            </Row>
        </Container>
    )
}

HourlyRow.propTypes = {
    timestamp: PropTypes.number,
    iconCode: PropTypes.number,
    precip: PropTypes.number,
    temp: PropTypes.number,
    windSpeed: PropTypes.number,
    feelsLike: PropTypes.number,
    index: PropTypes.number
}

const HourlyRender = ({ hourly }) =>
    <SimpleBarReact className='simple-bar-container'>
        <Container fluid className='hourly-forecast-container'>
            <Row>
                <Col className='px-0'>
                    {hourly.map((h, index) =>
                        <HourlyRow key={h.timestamp} {...h} index={index} />
                    )}
                </Col>
            </Row>
        </Container>
    </SimpleBarReact>

HourlyRender.propTypes = {
    hourly: PropTypes.array
}

export default HourlyRender
