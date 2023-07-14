import { useCallback, useEffect, useMemo, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
// GiSettingsKnobs
import { Container } from 'react-bootstrap'
import propTypes from 'prop-types'

import { AlignField, ColLimitField, PageButtons, TableRowsField } from './TableControls'
import useGetTableData from './getTableData'
import Modal from '../Modal/Modal'
import './index.scss'

const EmptyDataRows = ({ numOfRows = 0, numOfColumns = 0 }) => {
    if (numOfRows <= 0 || numOfColumns <= 0) return <></>
    return (
        <>
            {
                [...Array(numOfRows).keys()]
                    .map((i) =>
                        <tr key={i}>
                            {[...Array(numOfColumns).keys()].map((j) =>
                                <td key={`${i}-${j}`}>
                                    &nbsp;
                                </td>
                            )}
                        </tr>
                    )
            }
        </>
    )
}

EmptyDataRows.propTypes = {
    numOfRows: propTypes.any,
    numOfColumns: propTypes.any,
}

const DataRow = ({ rowIndex, rowData, dataColumns }) =>
    <tr>
        {dataColumns?.map(h =>
            <td key={`row-${rowIndex}-${rowData?.[h]?.value}`}>
                {rowData?.[h]?.value || <>&nbsp;</>}
            </td>
        )}
    </tr>

DataRow.propTypes = {
    rowData: propTypes.object,
    dataColumns: propTypes.array,
    rowIndex: propTypes.number,
}

const HeaderCol = ({ sort, label, colKey }) => {
    let sortKey = sort || ''
    let desc = false

    if (sortKey.startsWith(`~`)) {
        sortKey = sort.slice(1)
        desc = true
    }

    return (
        <span className='text-dark'>
            {label}
            {(sortKey === colKey && desc) && '\u2BC5'}
            {(sortKey === colKey && !desc) && '\u2BC6'}
        </span>
    )
}

HeaderCol.propTypes = {
    sort: propTypes.string,
    label: propTypes.string,
    colKey: propTypes.string,
}

const Table = () => {
    const { getTableData } = useGetTableData()

    const [showSettings, setShowSettings] = useState(false)
    const [align, setAlign] = useState('left')
    const [data, setData] = useState([])
    const [resultsLength, setResultsLength] = useState(0)
    const [filter, setFilter] = useState({})
    const [tableState, setTableState] = useState({ page: 0, pageSize: 10, sort: '' })
    const [colLimit, setColLimit] = useState(4)

    const setPage = useCallback(index => {
        setTableState(prev => {
            return { ...prev, page: +index }
        })
    }, [])

    const setSort = useCallback(newSort => {
        setTableState(prev => {
            const { sort } = prev
            if (sort === newSort) {
                return { ...prev, sort: '~' + sort }
            }
            return { ...prev, sort: newSort }
        })
    }, [])

    const setPageSize = useCallback(newPageSize => {
        setTableState(p => ({ ...p, pageSize: +newPageSize }))
        setPage(0)
    }, [setPage])

    const headers = useMemo(() => {
        return Object.entries(data?.[0] || {})?.map(([key, e]) => ({ label: e.header, key })).splice(0, colLimit)
    }, [colLimit, data])

    const dataColumns = useMemo(() => {
        return Object.keys(data?.[0] || {}).splice(0, colLimit)
    }, [colLimit, data])

    useEffect(() => {
        const [tempData, totalResultsCount] = getTableData(filter, tableState)
        setData(tempData)
        setResultsLength(totalResultsCount)
    }, [getTableData, filter, tableState])

    return (
        <Container fluid className='table-demo blur-table'>
            {showSettings &&
                <Modal modalClassName='settings-modal' onClose={() => setShowSettings(false)} body={
                    <div className='settings-modal-body'>
                        <TableRowsField value={tableState.pageSize} onChange={setPageSize} />
                        <AlignField value={align} onChange={setAlign} />
                        <ColLimitField value={colLimit} onChange={setColLimit} />
                        <div>
                            <button className='close-settings-button' onClick={() => setShowSettings(false)}>Close</button>
                        </div>
                    </div>
                } />
            }
            <div className='header-controls'>
                <span className='control-span text-start'>
                    <TableRowsField value={tableState.pageSize} onChange={setPageSize} />
                </span>
                <span className='control-span page-selector'>
                    <PageButtons {...tableState} setPage={setPage} totalResults={resultsLength} />
                </span>
                <span className='control-span text-end mx-2'>
                    <AiFillSetting className='settings-button' size='22px' onClick={() => setShowSettings(true)} />
                </span>
            </div>
            <table className='demo-table'>
                <thead className={`table-header align-${align}`}>
                    <tr className='underline'>
                        {headers?.map(({ label, key }) =>
                            <td key={label} onClick={() => setSort(key)}>
                                <HeaderCol sort={tableState.sort} label={label} colKey={key} />
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody className={`table-body align-${align}`}>
                    {data?.map((rowData, rowIndex) =>
                        <DataRow
                            key={`data-row-${rowIndex}`}
                            rowIndex={rowIndex}
                            rowData={rowData}
                            dataColumns={dataColumns}
                        />
                    )}
                    <EmptyDataRows numOfRows={tableState.pageSize - data.length} numOfColumns={dataColumns?.length} />
                </tbody>
            </table>
            <div className='footer-controls'>
                <span className='control-span'>
                    {/* <SelectInputField options={[{ value: 1, label: 1 }]} label='Select...' /> */}
                </span>
                <span className='control-span page-selector'>
                    <PageButtons {...tableState} setPage={setPage} totalResults={resultsLength} />
                </span>
                <span className='control-span text-end mx-2'>
                    <AiFillSetting size='22px' onClick={() => setShowSettings(true)} />
                </span>
            </div>
        </Container>
    )
}

export default Table
