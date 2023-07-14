import { Card, Col, Container, Row } from "react-bootstrap"
import PropTypes from 'prop-types'

const Hints = ({ pokemon }) => {
    const { types, height, weight } = pokemon || {}

    return (
        <Container className='mb-3 text-dark pokemon-hints-bar'>
            <Row>
                <Col>
                    <Card className='pokemon-hint bg-success'>
                        Height: {height / 10} m
                    </Card>
                </Col>
                <Col>
                    <Card className='pokemon-hint bg-success'>
                        Weight: {weight / 10} kg
                    </Card>
                </Col>
                {types?.map(({ type }) =>
                    <Col key={type?.name}>
                        <Card className={`pokemon-hint pokemon-type-${type?.name}`}>{type?.name?.toUpperCase()}</Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

Hints.propTypes = {
    pokemon: PropTypes.object
}

export default Hints
