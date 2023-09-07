import axios from "axios"
import { useCallback } from "react"
import { getRandomNumbers } from "../../../utils/getRandom"

const POKE_API_URL = 'https://pokeapi.co/api/v2'

const useGetPokemon = () => {

    const getPokemonList = useCallback(() => {
        return axios({
            method: 'get',
            url: POKE_API_URL + '/pokemon/',
            responseType: 'json',
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        }).then(res => {
            return res?.data
        }).catch(e => {
            console.error(e)
        })
    }, [])

    const getPokemon = useCallback(index => {
        return axios({
            method: 'get',
            url: POKE_API_URL + '/pokemon/' + index,
            responseType: 'json',
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        }).then(res => {
            return res?.data
        }).catch(e => {
            console.error(e)
        })
    }, [])

    const getRandomPokemon = useCallback((numberOfPokemon = 1) => {
        return getPokemonList().then(async () => {
            const arr = []
            const pokeCount = 1010
            const pokeIndices = getRandomNumbers(1, pokeCount, numberOfPokemon)

            while ((arr?.length < numberOfPokemon)) {
                const pokemon = await getPokemon(pokeIndices[arr?.length])
                arr.push(pokemon)
            }
            return arr
        })
    }, [getPokemon, getPokemonList])

    return {
        getPokemon,
        getPokemonList,
        getRandomPokemon
    }
}

export default useGetPokemon
