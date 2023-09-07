import { useCallback, useState } from "react";
import { getDatabase, onValue, ref, push } from "firebase/database";

import { firebaseApp } from "../../../App";

const useDataBase = () => {
    const db = getDatabase(firebaseApp)

    const [scores, setScores] = useState([])
    const getScores = useCallback(() => {
        const query = ref(db, 'scores')
        return onValue(query, (snapshot) => {
            const data = snapshot.val()

            if (snapshot.exists()) {
                Object.entries(data).forEach(([key, score]) => {
                    setScores((prevScores) => [...prevScores, { key, score }])
                })
            }
        })
    }, [])

    const [putLoading, setPutLoading] = useState(false)
    const putScore = useCallback(newScore => {
        setPutLoading(true)
        const scoresRef = ref(db, 'scores')

        push(scoresRef, newScore).then(() => {
            setPutLoading(false)
        })
    }, [])

    return {
        getScoresApi: [getScores, scores],
        putScoresApi: [putScore, putLoading]
    }
}

export default useDataBase
