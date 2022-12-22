import Axios from "axios"
import { useContext, useEffect, useMemo, useState } from "react";
import dateContext from "../context/dateContext";
import format from 'date-fns/format'
import { COLUMNS } from './columns'
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import defaultData from './defaultData.json'
import arrow from '../images/arrow.png'
import down from '../images/down.png'
import up from '../images/up.png'

const TableComp = () => {

    const [range, setRange] = useContext(dateContext);
    
    const start = format(range[0].startDate, "yyyy-MM-dd");
    const end = format(range[0].endDate, "yyyy-MM-dd");
    const [data, setData] = useState(defaultData);
    
    const fetchData = async () => {
        Axios.get(`https://go-dev.greedygame.com/v3/dummy/report?startDate=${start}&endDate=${end}`).then((res) => {
            setData(res.data.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, [range])

    console.log(data);

    const columns = useMemo(() => COLUMNS, []);

    const tableInstance = useTable({
        columns,
        data,
    }, useSortBy,
    usePagination)

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        setPageSize,
        prepareRow,
    } = tableInstance;

    const { pageIndex, pageSize } = state;

    return (
        <>
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <img src={column.isSorted ? (column.isSortedDesc ? down : up) : arrow}/>
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                | Go to page: {' '}
                <input type='number' defaultValue = {pageIndex + 1}
                 onChange = {e => {
                     const pageNumber = e.target.value ? Number(e.target.value - 1) : 0
                     gotoPage(pageNumber)
                 }}   
                 style={{width: '50px'}}
                />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                 {
                     [10, 25, 50].map(pageSize => (
                         <option key = {pageSize} value={pageSize}>
                            Show {pageSize}
                         </option>
                     ))
                 }
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
        </>
    )
}

export default TableComp
