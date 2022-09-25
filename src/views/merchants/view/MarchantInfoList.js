// ** Reactstrap Imports
import { Card, CardHeader, Progress, Table } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

import useJwt from '@src/auth/jwt/useJwt'



// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect } from 'react'

const marchantsArr = [
  {
    title: 'Business Name',
    totalTasks: '233/240',  
  },
  {
    title: 'Payment Method',
    totalTasks: '9/50',    
  },
 
  {
    title: 'Bank Name',
    totalTasks: '100/190', 
  },

  {
    title: 'Bank Account Name',
    totalTasks: '214/627',  
  },
  {
    title: 'Bank Account Number',
    totalTasks: '214/627',  
  },
  {
    title: 'Address',
    totalTasks: '9/50',    
  },
  {
    title: 'Pickup Address',
    totalTasks: '9/50',    
  },
]

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Properties',
    selector: row => row.properties,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.properties}</span>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Values',
    selector: row => row.values
  },
]

const MarchantInfoList = ({userInfo}) => {
  // useEffect(() => {
  //   console.log(userInfo)
  // }, [userInfo])

  return (
    <Card>
      <CardHeader tag='h4'>Marchants Info</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        {userInfo && (
          <Table responsive>
          <tbody>
            <tr>
              <th>Business Name</th>
              <th>{userInfo.business_name}</th>
            </tr>
            <tr>
              <th>Address</th>
              <th>{userInfo.address}</th>
            </tr>
            <tr>
              <th>Pickup</th>
              <th>{userInfo.pickup_address}</th>
            </tr>
            <tr>
              <th>Identity</th>
              <th>{userInfo.identity}</th>
            </tr>
            <tr>
              <th>Identity Number</th>
              <th>{userInfo.identity_no}</th>
            </tr>
            <tr>
              <th>Bank Name:</th>
              <th>{userInfo.bank_name}</th>
            </tr>
            <tr>
              <th>Bank A/C Name:</th>
              <th>{userInfo.bank_account_name}</th>
            </tr>
            <tr>
              <th>Bank A/C Number:</th>
              <th>{userInfo.bank_account_num}</th>
            </tr>
            <tr>
              <th>Payment Method:</th>
              <th>{userInfo.payment_method}</th>
            </tr>
            <tr>
              <th>City:</th>
              <th>{userInfo.city}</th>
            </tr><tr>
              <th>Area:</th>
              <th>{userInfo.area}</th>
            </tr>
          </tbody>
        </Table>
        )}
        
      </div>
    </Card>
  )
}

export default MarchantInfoList
