export const standardize = s => s?.trim()?.toUpperCase()

export const paginate = ({ page = 0, pageSize = 10 } = {}, rows) =>
    rows.slice(page * pageSize, page * pageSize + pageSize)

export const fieldSorter = id => (a, b) => {
    let nameA = a[id].value
    let nameB = b[id].value
    if (typeof nameA === 'string') nameA = nameA.toUpperCase()
    if (typeof nameB === 'string') nameB = nameB.toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}

const reverse = sort => (a, b) => {
    const res = sort(a, b)
    if (res < 0) return 1
    if (res > 0) return -1
    return 0
}

export const sorter = (sort = '') => {
    if (!sort) return

    if (sort.startsWith('~')) {
        // descending
        return reverse(fieldSorter(sort.slice(1)))
    } else {
        return fieldSorter(sort)
    }
}