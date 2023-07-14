import propTypes from 'prop-types'
import SelectField from "../SelectField"

const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
]
const colOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
]
const rowOptions = [
    { value: 10, label: '10 Rows' },
    { value: 25, label: '25 Rows' },
    { value: 50, label: '50 Rows' },
]

export const TableRowsField = ({ value, onChange }) =>
    <SelectField
        labelClassName='table-select-box-label'
        className='table-select-box'
        value={value}
        onChange={onChange}
        options={rowOptions}
    />

TableRowsField.propTypes = {
    value: propTypes.any,
    onChange: propTypes.func,
}

export const AlignField = ({ value, onChange }) =>
    <SelectField
        className='table-select-box'
        value={value}
        onChange={onChange}
        label='Align Text'
        options={alignmentOptions}
    />

AlignField.propTypes = {
    value: propTypes.any,
    onChange: propTypes.func,
}

export const ColLimitField = ({ value, onChange }) =>
    <SelectField
        className='table-select-box'
        value={value}
        onChange={onChange}
        label='# of Columns'
        options={colOptions}
    />

ColLimitField.propTypes = {
    value: propTypes.any,
    onChange: propTypes.func,
}

const showRelativePages = ({ totalResults, pageSize, page }) => {
    const totalPages = Math.ceil(totalResults / pageSize)

    let showNext = (totalResults > (page + 1) * pageSize)
    let showLast = (page) < totalPages - 2

    return {
        showFirst: page > 1,
        showPrevious: page > 0,
        showNext: showNext,
        showLast: showNext && showLast
    }
}

const getPageNumbers = ({ page, pageSize, totalResults, numberOfPageButtons = 5 }) => {
    const pages = []
    const numOfPages = Math.ceil(totalResults / pageSize)

    let firstPage = page - Math.floor((numberOfPageButtons - 1) / 2)
    let lastPage = page + Math.ceil((numberOfPageButtons - 1) / 2)

    if (lastPage > numOfPages - 1) {
        const diff = numOfPages - 1 - lastPage
        lastPage += diff
        firstPage += diff
    }

    if (firstPage < 0) {
        const diff = 0 - firstPage
        lastPage += diff
        firstPage += diff
    }

    for (let i = firstPage; i <= lastPage; i++) {
        if (i < numOfPages) {
            pages.push({ index: i, label: i + 1 })
        }
    }

    return pages
}

const PageButton = ({ setPage, index, label, page, disabled, className = '' }) =>
    <button
        disabled={disabled}
        className={`${className} table-page-button active-${page == index} disabled-${disabled}`}
        onClick={() => !disabled && setPage(index)}
        key={label}>
        {label}
    </button>

PageButton.propTypes = {
    setPage: propTypes.func,
    index: propTypes.number,
    label: propTypes.any,
    page: propTypes.number,
    disabled: propTypes.bool,
    className: propTypes.string,
}

export const PageButtons = ({ page, pageSize, totalResults, setPage }) => {
    const pageNumberArray = getPageNumbers({ page, pageSize, totalResults, numberOfPageButtons: 5 })
    const { showFirst, showPrevious, showNext, showLast } = showRelativePages({ page, pageSize, totalResults })

    return (
        <div className='table-page-button-group'>
            <PageButton
                className='page-button-arrow'
                disabled={!showFirst}
                index={0}
                setPage={setPage}
                label={'\u2BC7\u2BC7'}
            />
            <PageButton
                className='page-button-arrow'
                disabled={!showPrevious}
                index={page - 1}
                setPage={setPage}
                label={'\u2BC7'}
            />
            {pageNumberArray?.map(({ index, label }) =>
                <PageButton
                    key={label}
                    index={index}
                    page={page}
                    setPage={setPage}
                    label={label}
                />
            )}
            <PageButton
                className='page-button-arrow'
                disabled={!showNext}
                index={page + 1}
                setPage={setPage}
                label={'\u2BC8'}
            />
            <PageButton
                className='page-button-arrow'
                disabled={!showLast}
                index={Math.ceil(totalResults / pageSize) - 1}
                setPage={setPage}
                label={'\u2BC8\u2BC8'}
            />
        </div>
    )
}

PageButtons.propTypes = {
    page: propTypes.number,
    pageSize: propTypes.number,
    totalResults: propTypes.number,
    setPage: propTypes.func,
}