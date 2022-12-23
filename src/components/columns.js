import format from 'date-fns/format'
import { useMemo } from 'react'
import {appData} from './appData'


export const COLUMNS = [
    {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => {
            return format(new Date(value), "dd MMMM yyyy");
        }
    },
    {
        Header: 'App',
        accessor: 'app_id',
        Cell: ({ value }) => {
            const obj = appData.find(o => o.app_id === value);
            return obj.app_name
        }
    },
    {
        Header: 'Ad Requests',
        accessor: 'requests',
        Cell: ({ value }) => {
            return value.toLocaleString();
        }
    },
    {
        Header: 'Ad Response',
        accessor: 'responses',
        Cell: ({ value }) => {
            return value.toLocaleString();
        }
    },
    {
        Header: 'Impression',
        accessor: 'impressions',
        Cell: ({ value }) => {
            return value.toLocaleString();
        }
    },
    {
        Header: 'Clicks',
        accessor: 'clicks',
        Cell: ({ value }) => {
            return value.toLocaleString();
        }
    },
    {
        Header: 'Revenue',
        accessor: 'revenue',
        Cell: ({ value }) => {
            return "$" + value.toFixed(2);
        }
    },
    {
        Header: 'Fill Rate',
        Cell: ({ row }) => {
            return ((row.values.requests / row.values.responses) * 100).toFixed(2)+"%";
        }
    },
    {
        Header: 'CTR',
        Cell: ({ row }) => {
            return ((row.values.clicks / row.values.impressions) * 100).toFixed(2)+"%";
        }
    }
]
