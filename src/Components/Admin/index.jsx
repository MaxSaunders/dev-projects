import { createContext, useContext, useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { MdOutlineDiamond } from 'react-icons/md'
import { FiChevronsRight } from "react-icons/fi"
import GaugeChart from 'react-gauge-chart'

import getDashboardData from "./getDashboardData"
import DashNavigation from "./DashNavigation"
import Agents from "./Agents"
import './index.scss'

export const DashboardContext = createContext()

const SatisfactionGraph = () => {
    const [satAvg, setSatAvg] = useState(0)
    const [numberOfProjects, setNumberOfProjects] = useState(0)
    const { salesPeople } = useContext(DashboardContext)

    useEffect(() => {
        const satAvgTemp = salesPeople?.reduce((cum, cur) => {
            const temp = cur?.projects.reduce((cumm, curr) => {
                setNumberOfProjects(i => i + 1)
                return curr.satisfaction[curr.satisfaction.length - 1] + cumm
            }, 0)

            return cum + (temp / cur?.projects.length)
        }, 0) / salesPeople?.length

        setSatAvg(satAvgTemp)
    }, [salesPeople])

    return (
        <div id='chartDiv' >
            {`Customer Satisfaction`}
            <GaugeChart
                animate={false}
                // animate={true}
                needleColor="#3b14d3"
                needleBaseColor="#3b14d3"
                // needleBaseColor="#795ee8"
                nrOfLevels={3}
                colors={['#795ee8', '#3b14d3']}
                percent={satAvg / 5}
                formatTextValue={v => `${v.toFixed(1)}%`}
            // arcWidth={0.3} 
            //   arcPadding={0.1} 
            //   cornerRadius={3} 
            // marginInPercent
            />
            {`Across ${numberOfProjects} customers`}
        </div>
    )
}

const AdminPortal = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        setLoading(true)
        getDashboardData().then(res => {
            // Maybe pull out projects here into it's own variable in the store
            // Pull all the sales numbers into it's own array, sum up each month
            setData(res)
            setLoading(false)
        })
    }, [])

    return (
        <DashboardContext.Provider value={data}>
            <div className='m-3'>
                <Container fluid className={`dashboard-container dashboard-loading-${loading}`}>
                    <Row className='dashboard-row'>
                        <Col xs={0} lg={2} className='dashboard-nav'>
                            <DashNavigation />
                        </Col>
                        <Col xs={12} lg={10} className='dashboard-content'>
                            <Container fluid>
                                <Row>
                                    <Col className='dashboard-greeting'>
                                        <div className='greeting-text'>
                                            <h2 className=''>
                                                Hello Max
                                            </h2>
                                            <span className='ms-3 premium-container text-warning'>
                                                <MdOutlineDiamond className='fs-5' />
                                                <span className='premium'>
                                                    PREMIUM
                                                </span>
                                            </span>
                                        </div>
                                        <div className='greeting-text'>
                                            <span className='greeting-date'>
                                                <FiChevronsRight className='chevron' />
                                                October 17
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Agents />
                                    </Col>
                                </Row>
                                <Row className='mb-0 mb-md-3'>
                                    <Col xs={12} md={8} className='mb-3 mb-md-0'>
                                        <Card>
                                            Graph
                                        </Card>
                                    </Col>
                                    <Col xs={12} md={4} className='mb-3 mb-md-0'>
                                        <Card>
                                            Top Countries
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='mb-0 mb-md-3'>
                                    <Col xs={12} md={4} className='mb-3 mb-md-0'>
                                        <Card>Segmentation</Card>
                                    </Col>
                                    <Col xs={12} md={4} className='mb-3 mb-md-0'>
                                        <Card>
                                            <SatisfactionGraph />
                                        </Card>
                                    </Col>
                                    <Col xs={12} md={4} className='mb-3 mb-md-0'>
                                        <Card>Segmentation</Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </DashboardContext.Provider>
    )
}

export default AdminPortal
