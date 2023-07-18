import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useMemo, useState } from 'react'

import displayTypes from './Ticker/displayTypes'
import getHolidays from './helpers/getHolidays'
import SelectField from '../SelectField'
import Ticker from './Ticker'
import './index.scss'


const Holidays = () => {
    const [display, setDisplay] = useState(displayTypes.DAY)
    const [loading, setLoading] = useState(true)
    const [holidays, setHolidays] = useState([])
    const displayOptions = useMemo(() => {
        return Object.values(displayTypes).map(i => ({ value: i, label: i }))
    }, [])

    useEffect(() => {
        setHolidays(getHolidays())

        const interval = setInterval(() => {
            setHolidays(getHolidays())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='holiday-calendar-container'>
            <div className='calendar-settings dropdown'>
                <SelectField
                    labelClassName='settings-dropdown-label'
                    className='settings-dropdown'
                    options={displayOptions} onChange={e => setDisplay(e)}
                />
            </div>
            <div className='calendar-settings buttons'>
                <div className='display-btn-group'>
                    <button disabled={loading} className={`display-btn btn-disabled-${loading}`} onClick={() => setDisplay('SEC')} >
                        Show Seconds
                    </button>
                    <button disabled={loading} className={`display-btn btn-disabled-${loading}`} onClick={() => setDisplay('MIN')} >
                        Show Minutes
                    </button>
                    <button disabled={loading} className={`display-btn btn-disabled-${loading}`} onClick={() => setDisplay('HOUR')} >
                        Show Hours
                    </button>
                    <button disabled={loading} className={`display-btn btn-disabled-${loading}`} onClick={() => setDisplay('DAY')} >
                        Show Days
                    </button>
                    <button disabled={loading} className={`display-btn btn-disabled-${loading}`} onClick={() => setDisplay('DEFAULT')} >
                        Show Default
                    </button>
                </div>
            </div>
            {holidays.map(({ title, interval, date, name }) =>
                <Container className={`content holiday-calendar-container holiday-${name}`} fluid key={name}>
                    <Row>
                        <Col className={`px-0 holiday-section content`}>
                            <Row>
                                <Col>
                                    <div className='holiday-title'>
                                        {title.toLocaleUpperCase()}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Ticker
                                        loading={loading}
                                        setLoading={setLoading}
                                        interval={interval}
                                        display={display}
                                        differenceInSec={(date - new Date()) / (1000)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}

export default Holidays
