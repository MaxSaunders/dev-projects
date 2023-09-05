import { useState, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { intervalToDuration } from 'date-fns'
import { Calendar } from 'react-widgets'

import './index.scss'

const getInterval = (start, end) => intervalToDuration({ start, end })

const AgeCalc = () => {
    const todaysDate = useMemo(() => new Date(), [])
    const [birthDate, setBirthDate] = useState(new Date())

    const { years, months, days } = useMemo(() => {
        return getInterval(birthDate, todaysDate)
    }, [birthDate, todaysDate])

    return (
        <Container className='age-calc'>
            <Row className='mt-5'>
                <Col />
                <Col xs={12} lg={6} xl={5}>
                    <Calendar
                        className='age-calc-calendar'
                        defaultView='century'
                        value={birthDate}
                        onChange={e => setBirthDate(e)}
                    />
                </Col>
                <Col />
            </Row>
            <Row>
                <Col>
                    <div className='age-interval-section'>
                        <span className='interval-card'>
                            <div className='interval-amount'>{years}</div>
                            <div className='interval-label'>Years</div>
                        </span>
                        <span className='interval-card'>
                            <div className='interval-amount'>{months}</div>
                            <div className='interval-label'>Months</div>
                        </span>
                        <span className='interval-card'>
                            <div className='interval-amount'>{days}</div>
                            <div className='interval-label'>Days</div>
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AgeCalc
