import { useMemo, useState } from 'react'
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'
import { TbTemperatureFahrenheit } from 'react-icons/tb'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import PropTypes from 'prop-types'

import getIcon from './getIcon'
import './Daily.scss'

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" })

export const DailyRenderMinimize = ({ maxTemp, iconCode, timestamp }) => {
    const IconSvg = useMemo(() => getIcon(iconCode), [iconCode])
    const date = DAY_FORMATTER.format(timestamp)

    return (
        <>
            <AccordionHeader>
                <div>
                    {date}
                </div>
            </AccordionHeader>
            <AccordionBody>
                <Container>
                    <Row className='weather-accordion-item'>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <span className='weather-icon'>
                                <IconSvg size='15%' />
                            </span>
                        </Col>
                        <Col>
                            <span className='date'>
                                {date}
                            </span>
                            <span className='daily-temp'>
                                {maxTemp}
                                <TbTemperatureFahrenheit />
                            </span>
                        </Col>
                    </Row>
                </Container>
            </AccordionBody>
        </>
    )
}

DailyRenderMinimize.propTypes = {
    maxTemp: PropTypes.number,
    iconCode: PropTypes.number,
    timestamp: PropTypes.number
}

export const DailyRenderMax = ({ maxTemp, iconCode, timestamp }) => {
    const IconSvg = useMemo(() => getIcon(iconCode), [iconCode])
    const date = useMemo(() => DAY_FORMATTER.format(timestamp), [timestamp])

    return (
        <Card className='weather-card my-2'>
            <div className='weather-icon'>
                <IconSvg size='15%' />
            </div>
            <div className='date'>
                {date}
            </div>
            <div className='daily-temp'>
                {maxTemp}{'\u00B0F'}
            </div>
        </Card>
    )
}

DailyRenderMax.propTypes = {
    maxTemp: PropTypes.number,
    iconCode: PropTypes.number,
    timestamp: PropTypes.number
}

export const DailyRender = ({ dailyWeather }) => {
    const [hoveredDay, setHoveredDay] = useState(0)

    return (
        <div className='daily-forecast-container'>
            {/* Displays daily on md+ */}
            <div className='d-none d-md-grid daily-forecast-row p-3'>
                {dailyWeather?.map(daily =>
                    <div key={daily.timestamp} className='daily-forecast-col px-1'>
                        <DailyRenderMax {...daily} />
                    </div>
                )}
            </div>
            {/* Displays daily on sm- */}
            <Row>
                <Col>
                    <Accordion activeKey={hoveredDay} className='d-md-none mt-4 mt-md-0 pb-3'>
                        {dailyWeather?.map((daily, index) =>
                            <AccordionItem
                                eventKey={index}
                                onMouseEnter={() => setHoveredDay(index)}
                                key={daily.timestamp}
                            >
                                <DailyRenderMinimize {...daily} />
                            </AccordionItem>
                        )}
                    </Accordion>
                </Col>
            </Row>
        </div>
    )
}

DailyRender.propTypes = {
    dailyWeather: PropTypes.array
}

export default DailyRender
