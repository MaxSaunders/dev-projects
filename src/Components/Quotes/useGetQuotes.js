import axios from "axios"
import { useCallback } from "react"

const QUOTE_API_URL = 'https://api.quotable.io'
const MOVIE_API_URL = ' https://movie-quote-api.herokuapp.com/v1'

const useGetQuotes = () => {

    const getQuote = useCallback(() => {
        return axios({
            method: 'get',
            url: QUOTE_API_URL + '/random',
            responseType: 'json'
        }).then(res => {
            return res?.data
        }).catch(err => {
            console.error('Get Quote Error: ', { err })
        })
    }, [])

    const getMovieQuote = useCallback(() => {
        return axios({
            method: 'get',
            url: MOVIE_API_URL + '/quote',
            responseType: 'json'
        }).then(res => {
            return res
        }).catch(err => {
            console.error('Get Movie Quote Error: ', { err })
        })
    })

    // const getDailyQuote = useCallback(() =>)

    return {
        getQuote,
        getMovieQuote
    }
}

export default useGetQuotes
