import Chance from "chance"

const chance = new Chance()

const getFloat = (min = 0, max = 1, fixed = 2) => chance.floating({ min, max, fixed })
const getInt = (min = 0, max = 1) => chance.integer({ min, max })
const bool = () => chance.bool()

const getSalesNumbers = (max = 10000) => getFloat(0, max)

const getArrayOfValues = (valueFunc, arrayLengthMin = 1, arrayLengthMax = 10) => {
    const arr = []
    const arrayLength = getInt(arrayLengthMin, arrayLengthMax)

    while (arr.length < arrayLength) {
        arr.push(valueFunc())
    }

    return arr
}

const getProject = () => {
    const sales = []
    const satisfaction = []
    const accountAge = getInt(1, 10)

    while (sales.length < accountAge) {
        sales.push(getFloat(0, 3000))
        satisfaction.push(getInt(1, 5))
    }

    return {
        name: chance.company(),
        satisfaction,
        sales,
    }
}

const getTask = () => ({
    name: chance.sentence({ words: 4 }),
    description: chance.sentence({ words: 15 }),
    completed: bool(),
})

const getSalesPerson = () => ({
    name: chance.name(),
    tasksAssigned: getArrayOfValues(getTask, 1, 10),
    salesByMonth: getArrayOfValues(getSalesNumbers, 5, 5),
    country: chance.country({ full: true }),
    projects: getArrayOfValues(getProject, 1, 5),
    id: chance.guid()
})

const getDashboardData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(
            {
                salesPeople: getArrayOfValues(getSalesPerson, 5, 5),
            }
        )
    }, [1])
    // }, [3000])
})

export default getDashboardData
