import Axios from "axios"
import { forwardRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import dateContext from "../context/dateContext";
import format from 'date-fns/format'
import { COLUMNS } from './columns'
import { useTable, useSortBy, usePagination } from "react-table";
import defaultData from './defaultData.json'
import arrow from '../images/arrow.png'
import down from '../images/down.png'
import up from '../images/up.png'
import settingContext from "../context/settingContext";

const TableComp = () => {

    const [range, setRange] = useContext(dateContext);

    const [settingsOpen, setSettingsOpen] = useContext(settingContext);
    
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
        allColumns,
        getToggleHideAllColumnsProps
    } = tableInstance;

    const { pageIndex, pageSize } = state;

    const Checkbox = forwardRef(
        ({ indeterminate, ...rest }, ref) => {
          const defaultRef = useRef()
          const resolvedRef = ref || defaultRef
      
          useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
          }, [resolvedRef, indeterminate])
      
          return <input type="checkbox" ref={resolvedRef} {...rest} />
        }
      )

    return (
        <>
        <div className="container">
            {settingsOpen && <div className="filter"> 
            {
                allColumns.map(column => (
                    <div className="header" key = {column.id}>
                        <label>
                            {(column.id === "date" || column.id === "app_id") && <input className="exception" type="checkbox"/>}
                            {(column.id !== "date" && column.id !== "app_id") && <input type="checkbox" {...column.getToggleHiddenProps()}/>}
                            <span>{column.Header}</span>
                        </label>
                    </div>
                ))
            }
            </div>}
        </div>
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
        <div className="pagination">
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '} {'|'}
            </span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            <select className= "page-size" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                 {
                     [10, 25, 50].map(pageSize => (
                         <option key = {pageSize} value={pageSize}>
                            Show {pageSize}
                         </option>
                     ))
                 }
            </select>
        </div>
        </>
    )
}

export default TableComp;