import { BsNintendoSwitch, BsFillCalendar2EventFill } from 'react-icons/bs'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { BiSolidDashboard } from 'react-icons/bi'
import { RiChatQuoteLine } from 'react-icons/ri'
import { SiPokemon } from 'react-icons/si'
import { PiTable } from 'react-icons/pi'

import RandomTeamGen from './RandomTeamGen'
import Nintendo from './Nintendo'
import Holidays from './Holidays'
import Pokemon from './PokemonV1'
import Weather from './Weather'
import Quotes from './Quotes'
import Table from './Table'
import Admin from './Admin'

export const projects = [
    { label: 'Random Team Generator', path: 'randomTeam', Icon: GiPerspectiveDiceSixFacesRandom, component: RandomTeamGen },
    { label: 'Name That Pokemon', path: 'pokemon/v1', Icon: SiPokemon, component: Pokemon },
    { label: 'Admin', path: 'admin', Icon: BiSolidDashboard, component: Admin },
    { label: 'Nintendo', path: 'nintendo', Icon: BsNintendoSwitch, component: Nintendo },
    { label: 'Weather', path: 'weather', Icon: TiWeatherPartlySunny, component: Weather },
    { label: 'Quote of the Day', path: 'quote', Icon: RiChatQuoteLine, component: Quotes },
    { label: 'Table Demo', path: 'table', Icon: PiTable, component: Table },
    { label: 'Holiday Calendar', path: 'holidays', Icon: BsFillCalendar2EventFill, component: Holidays },
]