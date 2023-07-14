import { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { MdFormatQuote } from 'react-icons/md'
import { BsArrowRepeat } from 'react-icons/bs'

import useGetQuotes from './useGetQuotes'
import './index.scss'

const Quotes = () => {
    const { getQuote } = useGetQuotes()
    const [randomQuote, setRandomQuote] = useState({
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s...',
        author: 'Mahatma Gandhi',
        tags: ['Famous Quote', 'Generator']
    })
    const [loading, setLoading] = useState(false)
    const { content, author, tags } = randomQuote

    const fetchQuote = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            getQuote().then(res => {
                setRandomQuote(res)
                setLoading(false)
            }).catch(err => {
                console.error({ err })
            })
        }, 1500)

    }, [getQuote])

    // const fetchMovieQuote = useCallback(() => {
    //     getMovieQuote().then(res => {
    //         console.log({ res })
    //         setMovieQuote(res)
    //     }).catch(err => {
    //         console.error({ err })
    //     })
    // }, [getMovieQuote])

    // fetchMovieQuote()

    useEffect(() => {
        fetchQuote()
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col className='pt-5'>
                        <Card className={`quote-wrapper loading-${loading}`}>
                            <Card.Body>
                                {loading ?
                                    <BsArrowRepeat size='8%' className={`ms-2 loading-true`} />
                                    :
                                    <>
                                        <div>
                                            <span className='quote-mark-left d-inline-flex'>
                                                <MdFormatQuote />
                                            </span>
                                            <strong>
                                                {`  ${content}  `}
                                            </strong>
                                            <span className='quote-mark-right d-inline-flex'>
                                                <MdFormatQuote />
                                            </span>
                                        </div>
                                        <div className='mt-3 text-end author-footer'>
                                            {`${'\u2014'} ${author}`}
                                        </div>

                                        <Row className='tag-grid mt-3 ms-2'>
                                            {tags?.map(tag =>
                                                <Col xs={12} sm={6} lg={4} className='tag-item' key={tag}>
                                                    {tag}
                                                </Col>
                                            )}
                                        </Row>
                                    </>
                                }
                            </Card.Body>
                            <hr className='mx-3' />
                            <div className='button-wrapper align-self-end author-footer px-3 pb-2'>
                                <Button className='new-quote-button py-2 d-flex align-items-center' onClick={fetchQuote}>
                                    Get New Quote
                                    <BsArrowRepeat className={`ms-2 loading-${loading}`} />
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Quotes
