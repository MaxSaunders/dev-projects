import { useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import getIcon from './getIcon'
import './Current.scss'

const CurrentRender = ({ currentTemp, iconCode, highFeelsLike, lowFeelsLike, highTemp, lowTemp, precip, windSpeed }) => {
    const IconSvg = useMemo(() => getIcon(iconCode), [iconCode])
    return (
        <div className='current-forecast-container'>
            <Container>
                <Row>
                    <Col xs={12} md={5} className='current-left'>
                        <Container>
                            <Row>
                                <Col xs={5} lg={7} className='current-weather-icon'>
                                    <IconSvg size='90%' />
                                </Col>
                                <Col xs={6} lg={5} className='current-temp'>
                                    <div className='current-temp'>
                                        {currentTemp || '99'}{'\u00B0F'}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xs={12} md={7} className='current-right'>
                        <Container className='h-100'>
                            <Row className='h-100'>
                                <Col xs={4} className='current-section'>
                                    <div className='current-header'>
                                        FL HIGH
                                    </div>
                                    <div className='current-data'>
                                        {highFeelsLike || '99'}{'\u00B0F'}
                                    </div>
                                </Col>
                                <Col xs={4} className='current-section'>
                                    <div className='current-header'>
                                        FL LOW
                                    </div>
                                    <div className='current-data'>
                                        {lowFeelsLike || '99'}{'\u00B0F'}
                                    </div>
                                </Col>
                                <Col xs={4} className='current-section'>
                                    <div className='current-header'>
                                        HIGH
                                    </div>
                                    <div className='current-data'>
                                        {highTemp || '99'}{'\u00B0F'}
                                    </div>
                                </Col>
                                <Col xs={4} className='current-section'>
                                    <div className='current-header'>
                                        LOW
                                    </div>
                                    <div className='current-data'>
                                        {lowTemp || '99'}{'\u00B0F'}
                                    </div>
                                </Col>
                                <Col xs={4} className='current-section'>
                                    <div className='current-header'>
                                        PRECIP
                                    </div>
                                    <div className='current-data'>
                                        {precip || '0.00'} in
                                    </div>
                                </Col>
                                <Col xs={4} className='current-section'>
                                    <div className='current-header'>
                                        WIND
                                    </div>
                                    <div className='current-data'>
                                        {windSpeed || 10} mph
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

CurrentRender.propTypes = {
    currentTemp: PropTypes.number,
    iconCode: PropTypes.number,
    highFeelsLike: PropTypes.number,
    lowFeelsLike: PropTypes.number,
    highTemp: PropTypes.number,
    lowTemp: PropTypes.number,
    precip: PropTypes.number,
    windSpeed: PropTypes.number
}

export default CurrentRender
