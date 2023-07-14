import Chance from "chance"
import { useCallback, useMemo } from "react"
import { fieldSorter, paginate, sorter } from "../../utils/tableTools"

const chance = new Chance()

const columnSet = [
    { key: 'name', name: 'Name', type: () => chance.name() },
    { key: 'email', name: 'Email', type: () => chance.email() },
    { key: 'id', name: 'Id', type: () => chance.guid() },
    { key: 'companyId', name: 'Company Id', type: () => chance.guid() },
    { key: 'url', name: 'URL', type: () => chance.url() },
    { key: 'animal', name: 'Favorite Animal', type: () => chance.animal() },
    { key: 'sales', name: 'Sales Amount', type: () => chance.dollar() },
    { key: 'gender', name: 'Gender', type: () => chance.gender() },
    { key: 'birthday', name: 'Birthday', type: () => chance.birthday({ string: true }) },
    { key: 'ssn', name: 'SSN', type: () => chance.ssn() },
    { key: 'age', name: 'Age', type: () => chance.age() },
]

const getColumnTypes = numberOfCols => {
    const arr = []
    const colCopy = [...columnSet]

    while (arr?.length < numberOfCols) {
        const randomIndex = chance.integer({ min: 0, max: colCopy.length - 1 })
        arr.push(colCopy.splice(randomIndex, 1)[0])
    }

    return arr
}

const useGetTableData = () => {
    const arr = useMemo(() => [], [])
    const numOfRows = useMemo(() => chance.integer({ min: 50, max: 500 }), [])

    const colTypeArr = columnSet
    const numOfCol = colTypeArr.length
    // const numOfCol = useMemo(() => chance.integer({ min: 2, max: 10 }), [])
    // const colTypeArr = useMemo(() => getColumnTypes(numOfCol), [numOfCol])

    while (arr.length < numOfRows) {
        const temp = {}
        let j = 0

        while (j < numOfCol) {
            const { key, name, type } = colTypeArr[j]

            temp[key] = (
                {
                    header: name,
                    value: (typeof type === 'function') ? type() : 'error',
                }
            )

            j++
        }

        arr.push(temp)
    }

    const getTableData = useCallback((filter = {}, tableState = {}) => {
        const results = [...arr]
        const totalResultsCount = results.length
        const { sort, page, pageSize } = tableState

        const filteredData = results.filter(row => {
            const filters = Object.entries(filter)
            return row
        }).sort(sorter(sort))

        return [
            paginate(({ page, pageSize }), filteredData),
            totalResultsCount,
        ]
        // return results

    }, [arr])

    return {
        getTableData
    }
}

export default useGetTableData
