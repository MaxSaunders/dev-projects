import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { projects } from '../projects'
import './index.scss'

const PageHome = () => {
    return (
        <Container className='page-home-container'>
            <Row className='page-home-row'>
                {projects.map(({ label, path, Icon }) =>
                    <Col className='page-home-col mb-4' xs={12} sm={6} lg={4} key={label}>
                        <Card className='page-home-card' as={Link} to={path}>
                            <div className='page-home-card-icon-wrapper'>
                                <Icon size='auto' className='page-home-card-icon' />
                            </div>
                            <div className='page-home-card-label'>
                                {label}
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default PageHome
