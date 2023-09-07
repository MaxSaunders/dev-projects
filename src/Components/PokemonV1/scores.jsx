import { useEffect, useState } from "react"

import title from './assets/leaderBoardTitle.png'
import useDataBase from "./helpers/useDatabase"
import './scores.scss'

const displayGenArray = array => {
    if (array[0] == array[1]) {
        return `[ ${array[0]} ]`
    }
    return `[ ${array[0]}, ${array[1]} ]`
}

const PokemonScores = () => {
    const { getScoresApi } = useDataBase()
    const [getScores, scores] = getScoresApi
    const [sortedScores, setSortedScores] = useState([])

    useEffect(() => {
        getScores()
    }, [getScores])

    useEffect(() => {
        setSortedScores(scores.sort((a, b) => a.score.score < b.score.score ? 1 : -1))
    }, [scores])

    return (
        <div className='pokemon-score-board'>
            <img className='score-title' src={title} />
            <div className='pokemon-scores'>
                <table>
                    <thead>
                        <tr className='header-row'>
                            <td>Player</td>
                            <td>Gens</td>
                            <td>Mode</td>
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody className='scores-body'>
                        {sortedScores.map(({ key, score: { name, score, gen, mode } }) =>
                            <tr className='score-row' key={key}>
                                <td className='name'>{name}</td>
                                <td className='gen'>{displayGenArray(gen)}</td>
                                <td className={`mode mode-${mode.toLowerCase()}`}>{mode.toUpperCase()}</td>
                                <td className='score'>{score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PokemonScores
