import { BsNintendoSwitch, BsCalculatorFill, BsGrid3X3 } from 'react-icons/bs'
import { GiPerspectiveDiceSixFacesRandom, GiTrophy } from 'react-icons/gi'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { RiChatQuoteLine, RiDashboardFill } from 'react-icons/ri'
import { SiPokemon } from 'react-icons/si'
import { PiTable } from 'react-icons/pi'

import PokemonScores from './PokemonV1/scores'
import RandomTeamGen from './RandomTeamGen'
import Nintendo from './Nintendo'
import Pokemon from './PokemonV1'
import AgeCalc from './AgeCalc'
import Weather from './Weather'
import Quotes from './Quotes'
import Waffle from './Waffle'
import Table from './Table'
import Admin from './Admin'

export const projects = [
    { label: 'Random Team Generator', path: 'randomTeam', Icon: GiPerspectiveDiceSixFacesRandom, component: RandomTeamGen },
    { label: 'Name That Pokemon', path: 'pokemon/v1', Icon: SiPokemon, component: Pokemon },
    { label: 'Pokemon HighScores', path: 'pokemon/scores', Icon: GiTrophy, component: PokemonScores },
    { label: 'Admin', path: 'admin', Icon: RiDashboardFill, component: Admin },
    { label: 'Nintendo', path: 'nintendo', Icon: BsNintendoSwitch, component: Nintendo },
    { label: 'Weather', path: 'weather', Icon: TiWeatherPartlySunny, component: Weather },
    { label: 'Quote of the Day', path: 'quote', Icon: RiChatQuoteLine, component: Quotes },
    { label: 'Table Demo', path: 'table', Icon: PiTable, component: Table },
    { label: 'Age Calc', path: 'ageCalc', Icon: BsCalculatorFill, component: AgeCalc },
    { label: 'Waffle', path: 'waffle', Icon: BsGrid3X3, component: Waffle },
]