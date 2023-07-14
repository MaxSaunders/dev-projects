import { Col, Container, Row } from 'react-bootstrap'
import { useState, useEffect, useCallback, useMemo } from 'react'

import DailyRender from './Daily'
import getWeather from './getWeather'
import CurrentRender from './Current'
import HourlyRender from './Hourly'
import './index.scss'

const WeatherApp = () => {
    const [current, setCurrent] = useState({})
    const [dailyWeather, setDailyWeather] = useState([])
    const [hourly, setHourly] = useState([])

    const [lon, setLon] = useState(10)
    const [lat, setLat] = useState(10)
    const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])

    const [loading, setLoading] = useState(true)

    const fetchWeather = useCallback(() => {
        setLoading(true)
        getWeather(lat, lon, timeZone)
            .then(({ daily, current, hourly }) => {
                setCurrent(current)
                setDailyWeather(daily)
                setHourly(hourly)
                setLoading(false)
            })
            .catch(err => console.error('Error getting weather data: ', err))
    }, [lat, lon, timeZone])

    useEffect(() => {
        fetchWeather()
    }, [fetchWeather])

    const positionSuccess = ({ coords }) => {
        setLat(coords.latitude)
        setLon(coords.longitude)
    }

    const positionError = () => {
        alert(
            "There was an error getting your location. Please allow us to use your location and refresh the page. Or enjoy same data in the display"
        )
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
    }, [])

    return (
        <div className='pt-5'>
            <Container className={`weather-app-container weather-loading-${loading}`}>
                <Row>
                    <Col className='pt-5'>
                        <CurrentRender {...current} />
                    </Col>
                </Row>
                <DailyRender dailyWeather={dailyWeather} />
                <HourlyRender hourly={hourly} />
            </Container>
        </div>
    )
}

export default WeatherApp
