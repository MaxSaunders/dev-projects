import { useContext, useEffect, useMemo, useState } from 'react'
import { Card, Col, Container, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap'
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs'
import { BiSolidRightArrow } from 'react-icons/bi'
import propTypes from 'prop-types'

import { DashboardContext } from '.'
import agentPic from './assets/aang.png'
import agentPic2 from './assets/link-1.jpg'
import './Agents.scss'

const NUM_OF_AGENTS_DISPLAYED = 3

const AgentCard = ({ name, country, tasksAssigned = [], salesByMonth, projects, slide, index = 0, id }) => {
    // const completedTasks = tasksAssigned?.reduce((accum, curr) => curr + accum)
    const tasks = useMemo(() => {
        const arr = [...tasksAssigned]
        return arr.sort((a, b) => {
            if (a.completed) {
                return -1
            }
            if (b.completed) {
                return 1
            }
            return 1
        })
    }, [tasksAssigned])

    return (
        <Col xs={12} md={12 / NUM_OF_AGENTS_DISPLAYED} className={`mb-3 mb-md-0 agent-task-col sliding-in-${slide}`}>
            <Card className='sales-agent-card'>
                <Row className='mb-4'>
                    <Col className='d-flex px-0' xs={8} sm={6} md={8}>
                        <Container fluid>
                            <Row>
                                <Col xs={3} className='pe-0'>
                                    <span>
                                        {/* <div className='agent-pic'>
                                            <div className='agent-initials'>
                                                JS
                                            </div>
                                        </div> */}
                                        <img className='agent-pic' src={id[id.length - 1] % 2 ? agentPic : agentPic2} />
                                    </span>
                                </Col>
                                <Col xs={9} className='pe-0'>
                                    <span className='dddd'>
                                        <div className='sales-agent-name'>
                                            {name}
                                        </div>
                                        <div className='sales-country'>
                                            {`Sales Manager`}
                                        </div>
                                        <div className='sales-country'>
                                            {` ${country?.substring(0, 10)?.toUpperCase()}`}
                                        </div>
                                    </span>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xs={4} sm={6} md={4} className='graph-section'>
                        <div>
                            {/* TODO: change this so the color changes on performance of agent */}
                            <div className={`graph-icon`}>
                                <BsGraphUpArrow />
                            </div>
                            <div className='graph-text'>
                                <div className='graph-text-money'>
                                    {`$${`2600.00`}`}
                                </div>
                                <div className='months-count'>
                                    {/* {`${}`} */}
                                    {`Last X Months`}
                                    {/* Last {} Months */}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='task-progress-bar'>
                    <Col>
                        <ProgressBar className='agent-tasks progress-bar-wrapper'>
                            {tasks?.map(({ name, completed }) =>
                                // {tasks?.map(({ name, completed, description }) =>
                                // <OverlayTrigger placement='bottom' key={name} overlay={
                                //     <Tooltip>
                                //         {description}
                                //     </Tooltip>
                                // }>
                                <ProgressBar
                                    key={name}
                                    now={100 / (tasks?.length)}
                                    className={`task-content task-completed-${completed}`}
                                />
                                //     </OverlayTrigger>
                            )}
                        </ProgressBar>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

AgentCard.propTypes = {
    name: propTypes.string,
    country: propTypes.string,
    tasksAssigned: propTypes.array,
    salesByMonth: propTypes.array,
    projects: propTypes.array,
    slide: propTypes.string,
    index: propTypes.number,
    id: propTypes.string,
}

const Agents = () => {
    const [slide, setSlide] = useState('')
    const [inViewIndex, setInViewIndex] = useState(0)
    const { salesPeople = [] } = useContext(DashboardContext)

    const navLeft = () => setInViewIndex(i => {
        if (slide) return i

        setSlide('left')
        if (i <= 0) {
            return salesPeople.length - 1
        }
        return i - 1
    })

    const navRight = () => setInViewIndex(i => {
        if (slide) return i

        setSlide('right')
        if (i >= salesPeople.length - 1) {
            return 0
        }
        return i + 1
    })

    useEffect(() => {
        setTimeout(() => {
            if (slide) {
                setSlide('')
            }
        }, [300])
    }, [slide])

    const renderedSalesPeople = useMemo(() => {
        // const arrCopy = [...salesPeople, ...salesPeople]

        // return arrCopy.slice(inViewIndex, inViewIndex + NUM_OF_AGENTS_DISPLAYED)
        // // only returns a shalow copy not sure if this will work
        // // return arrCopy.splice(inViewIndex)
        return [...salesPeople]
    }, [salesPeople])
    // }, [inViewIndex, salesPeople])

    if (!salesPeople?.length) {
        return (
            <></>
        )
    }

    return (
        <Row className='mb-0 mb-md-3 agent-carousel'>
            <Col>
                <span className={`agent-cursor agent-cursor-left disable-${inViewIndex <= 0}`} onClick={navLeft}>
                    <BiSolidRightArrow />
                </span>
                {/* <div style={{ height: 'auto' }} className='agent-carousel-row'>
                    {renderedSalesPeople?.map((sp, index) =>
                        <div className='agent-task-col'>
                            Hello
                        </div>

                    )}
                </div> */}
                <Row style={{ height: 'auto' }} className='agent-carousel-row'>
                    {renderedSalesPeople?.map((sp, index) =>
                        <AgentCard key={sp.name} {...sp} slide={slide} index={index} />
                    )}
                </Row>
                <span className={`agent-cursor agent-cursor-right disable-${inViewIndex >= (salesPeople.length + NUM_OF_AGENTS_DISPLAYED)}`} onClick={navRight}>
                    <BiSolidRightArrow />
                </span>
            </Col>
        </Row>
    )
}

export default Agents
