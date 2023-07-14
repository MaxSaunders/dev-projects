import {
    BsSun,
    BsFillCloudSunFill,
    BsFillCloudFill,
    BsFillCloudHaze2Fill,
    BsFillCloudRainHeavyFill,
    BsFillCloudSnowFill,
    BsFillCloudLightningFill,
    BsFillEmojiSunglassesFill
} from 'react-icons/bs'

const getIcon = iconCode => {
    switch (iconCode) {
        case 0:
        case 1:
            return BsSun
        case 2:
            return BsFillCloudSunFill
        case 3:
            return BsFillCloudFill
        case 45:
        case 48:
            return BsFillCloudHaze2Fill
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            return BsFillCloudRainHeavyFill
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return BsFillCloudSnowFill
        case 95:
        case 96:
        case 99:
            return BsFillCloudLightningFill
        default:
            return BsFillEmojiSunglassesFill
    }
}

export default getIcon
