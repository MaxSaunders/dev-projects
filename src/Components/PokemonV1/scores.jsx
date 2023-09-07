import { useCallback, useEffect, useMemo, useState } from "react"

import title from './assets/leaderBoardTitle.png'
import { Col, Form, Row } from "react-bootstrap"

import useDataBase from "./helpers/useDatabase"
import './scores.scss'

const PAGE_SIZE = 10

const displayGenArray = array => {
    if (array[0] == array[1]) {
        return `${array[0]}`
    }
    return `${array[0]} - ${array[1]}`
}

const d = (sort, col) => {
    let temp = sort
    let direction = 'up'

    if (sort[0] == '~') {
        direction = 'down'
        temp = temp.slice(1, temp.length)
    }
    if (col == temp) {
        return direction === 'down' ? `\u25B2` : '\u2BC6'
    }
    return ''
}

const filterFields = filter => row =>
    Object.entries(filter).every(([key, value]) => {
        if (key == 'gen') {
            if (!value) {
                return true
            }
            return JSON.stringify(row.score.gen) === JSON.stringify([1, 9])
        }
        if (key == 'mode') {
            if (value.toLowerCase() === 'all') {
                return true
            }
            return row.score.mode.toLowerCase() === value.toLowerCase()
        }
        if (key == 'name') {
            return row.score.name.toLowerCase().match(value.toLowerCase())
        }
    })

const fieldSorter = (id, direction) => (a, b) => {
    let nameA = a.score[id]
    let nameB = b.score[id]
    if (typeof nameA === 'string') nameA = nameA.toUpperCase()
    if (typeof nameB === 'string') nameB = nameB.toUpperCase()
    if (nameA < nameB) return -1 * direction
    if (nameA > nameB) return 1 * direction
    return 0
}

const PokemonScores = () => {
    const { getScoresApi } = useDataBase()
    const [getScores, scores] = getScoresApi
    const [sort, setSort] = useState('~score')
    const [page, setPage] = useState(0)

    const [nameFilter, setNameFilter] = useState('')
    const [genFilter, setGenFilter] = useState(true)
    const [modeFilter, setModeFilter] = useState('All')

    const filter = useMemo(() => {
        setPage(0)
        return {
            gen: genFilter,
            name: nameFilter,
            mode: modeFilter
        }
    }, [genFilter, modeFilter, nameFilter])

    useEffect(() => {
        getScores()
    }, [getScores])

    const toggleSort = useCallback(newSort => {
        setSort(sort === newSort ? '~' + newSort : newSort)
    }, [sort])

    const filteredScores = useMemo(() => {
        const sorted = [...scores]
        let _sort = sort
        let direction = 1

        if (sort[0] == '~') {
            _sort = sort.slice(1, sort.length)
            direction *= -1
        }

        return sorted
            .filter(filterFields(filter))
            .sort(fieldSorter(_sort, direction))
    }, [filter, scores, sort])

    const paginatedScores = useMemo(() => filteredScores.slice(PAGE_SIZE * page, (PAGE_SIZE * (page + 1))), [filteredScores, page])

    return (
        <div className='pokemon-score-board'>
            <img className='score-title' src={title} />
            <div className='pokemon-scores'>
                <div>
                    <Form>
                        <Row className='filters'>
                            <Form.Group as={Col}>
                                <Form.Label>Player</Form.Label>
                                <Form.Control value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Mode</Form.Label>
                                <Form.Select value={modeFilter} type="select" onChange={e => setModeFilter(e.target.value)}>
                                    <option>ALL</option>
                                    <option>EASY</option>
                                    <option>HARD</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} className='align-self-end' key={`gen-check`}>
                                <Form.Check checked={genFilter} value={genFilter} type='checkbox' label='Only Show Gen 1 - 9 Scores' id={`gen-check`} className='text-center' onChange={() => setGenFilter(!genFilter)} />
                            </Form.Group>
                        </Row>
                    </Form>
                </div>
                <table>
                    <thead>
                        <tr className='header-row'>
                            <th className='sortable' onClick={() => toggleSort('name')}>{`Player ${d(sort, 'name')}`}</th>
                            <th>Gens</th>
                            <th className='sortable' onClick={() => toggleSort('mode')}>{`Mode ${d(sort, 'mode')}`}</th>
                            <th className='sortable' onClick={() => toggleSort('score')}>{`Score ${d(sort, 'score')}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedScores.map(({ key, score: { name, score, gen, mode } }) =>
                            <tr className='score-row' key={key}>
                                <td className='name'>{name}</td>
                                <td className='gen'>{displayGenArray(gen)}</td>
                                <td className={`mode mode-${mode.toLowerCase()}`}>{mode.toUpperCase()}</td>
                                <td className='score'>{score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='table-footer'>
                    <button className='page-button btn' onClick={() => setPage(i => i - 1)} disabled={page < 1}>{`\u2BC7`}</button>
                    <span>Page: {+page + 1}</span>
                    <button className='page-button btn' onClick={() => setPage(i => i + 1)} disabled={filteredScores.length <= ((page + 1) * PAGE_SIZE)}>{`\u2BC8`}</button>
                </div>
            </div>
        </div>
    )
}

export default PokemonScores
