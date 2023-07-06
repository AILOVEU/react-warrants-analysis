import React from 'react'
import { Table } from 'antd'
import {columns} from './columns'

const WarrantsTable = ({data})=> {
    return <Table columns={columns} dataSource={data}/>
    return <div>{JSON.stringify(data)}</div>
}
export default WarrantsTable