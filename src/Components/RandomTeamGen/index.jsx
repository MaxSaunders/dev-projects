import { Card, Col, Container, Row } from 'react-bootstrap'
import { useCallback, useState } from 'react'
import './index.scss'

const bsColors = [
    'prim',
    'sec',
    'accent1',
    'accent2'
]

const shuffleEntries = (entries = [], numberOfGroups = 2) => {
    const teams = []
    const array = [...entries]
    let currentIndex = entries.length
    let temporaryValue = 0
    let randomIndex = 0

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1;

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    array.forEach((entry, entryIndex) => {
        const teamIndex = entryIndex % numberOfGroups
        if (!teams[teamIndex]) {
            teams[teamIndex] = []
        }
        teams[teamIndex].push(entry)
    })

    return teams
}

const RandomTeamGen = () => {
    const [input, setInput] = useState('')
    const [entries, setEntries] = useState([])
    const [numGroups, setNumGroups] = useState(2)
    const [teams, setTeams] = useState([])
    const [showTextArea, setShowTextArea] = useState(false)

    const addEntry = useCallback(() => {
        if (input && !entries.includes(input)) {
            if (showTextArea) {
                setEntries(i => [...i, ...input.trim(' ').split(',')])
                setInput('')
            } else {
                setEntries(i => [...i, input])
                setInput('')
            }
        }
    }, [entries, input, showTextArea])

    const removeEntry = useCallback(index => {
        setEntries(prev =>
            prev.filter((_, currIndex) => index !== currIndex)
        )
    }, [])

    const generateTeams = useCallback(() => {
        if (!entries.length) return
        setTeams([])
        setTeams([...shuffleEntries(entries, numGroups)])
    }, [entries, numGroups])

    const submitEnterKey = useCallback(e => {
        if (e.keyCode === 13) {
            if (e.shiftKey) {
                generateTeams()
            } else {
                addEntry()
            }
        }
    }, [addEntry, generateTeams])

    return (
        <div>
            <Container className='random-team-gen-wrapper'>
                <Row className='my-5'>
                    <Col xs={12} md={6} className='entry-label-wrapper'>
                        <Row>
                            <Col xs={4} className='entry-label-col'>
                                <span className='entry-label'>
                                    Add Name: &nbsp;
                                </span>
                            </Col>
                            <Col xs={8}>
                                {showTextArea ?
                                    <textarea
                                        onKeyDown={submitEnterKey}
                                        placeholder='Enter A Name'
                                        value={input}
                                        type=''
                                        className='entry-input'
                                        onChange={e => setInput(e.target.value.toUpperCase())}
                                    />
                                    :
                                    <input
                                        onKeyDown={submitEnterKey}
                                        placeholder='Enter A Name'
                                        value={input}
                                        type='text'
                                        className='entry-input'
                                        onChange={e => setInput(e.target.value.toUpperCase())}
                                    />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <button className={`area-button active-${showTextArea}`} onClick={() => setShowTextArea(i => !i)}>
                                    Show Area Box
                                </button>
                            </Col>
                            <Col xs={6}>
                                <button disabled={!input} className={`entry-submit btn-disabled-${!input}`} onClick={() => addEntry()}>
                                    ADD Entry
                                </button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6}>
                        <div>
                            <label className='group-label-wrapper'>
                                <span className='group-label'>
                                    Number of Groups:
                                </span>
                                <span className='group-input-wrapper'>
                                    <button onClick={() => setNumGroups(i => i - 1)} disabled={numGroups <= 2} className={`group-counter-button btn-disabled-${numGroups <= 2}`}>
                                        {`-`}
                                    </button>
                                    <input
                                        value={numGroups}
                                        className='group-input'
                                        onChange={e => setNumGroups(+e.target.value)}
                                    />
                                    <button onClick={() => setNumGroups(i => i + 1)} disabled={numGroups >= entries.length} className={`group-counter-button btn-disabled-${numGroups >= entries.length}`}>
                                        {`+`}
                                    </button>
                                </span>
                            </label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={0} md={3} />
                    <Col xs={12} md={6}>
                        <button onClick={generateTeams} className='gen-teams-button'>Generate Teams</button>
                    </Col>
                    <Col xs={0} md={3} />
                </Row>
                <Row className='entries-row-container'>
                    {entries.map((e, entryIndex) =>
                        <Col className='my-2' xs={12} md={6} lg={4} key={e}>
                            <div>
                                <Card className={`entry-card border-4 border-${bsColors[entryIndex % bsColors.length]}`}>
                                    <Container fluid className='px-4'>
                                        <Row>
                                            <Col xs={10}>
                                                <div className='entry-text'>
                                                    {e}
                                                </div>
                                            </Col>
                                            <Col xs={2}>
                                                <button className='remove-entry-button' onClick={() => removeEntry(entryIndex)}>
                                                    &#10005;
                                                </button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </div>
                        </Col>
                    )}
                </Row>
                <Row className='mt-3'>
                    {teams.length ?
                        <div className='teams-title mb-3'>
                            TEAMS
                        </div>
                        :
                        <></>
                    }
                    {teams.map((team, teamIndex) =>
                        <Col
                            key={team}
                            xs={12}
                            md={6}
                            className={`mb-3`}
                            lg={12 / Math.min(Math.max(teams.length, 1), 4)}
                        >
                            <Card className={`team-card bg-${bsColors[teamIndex % bsColors.length]}`}>
                                {team.map(entry =>
                                    <div key={entry} className='team-entry my-2'>
                                        {entry}
                                    </div>
                                )}
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default RandomTeamGen
