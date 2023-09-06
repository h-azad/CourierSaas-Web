// ** Reactstrap Imports
import { Card, CardHeader, Progress, Table } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import useJwt from '@src/auth/jwt/useJwt'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect } from 'react'


const RiderInfoList = ({userInfo}) => {

  return (
    <Card>
      <CardHeader tag='h4'>Rider Info</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        {userInfo && (
          <Table responsive>
          <tbody>
          
            <tr>
              <th>Address</th>
              <th>{userInfo.address}</th>
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
                <th>{userInfo?.payment_method?.payment_method_name}</th>
            </tr>
            <tr>
              <th>City:</th>
                <th>{userInfo?.city?.city_name}</th>
            </tr><tr>
              <th>Area:</th>
                <th>{userInfo?.area?.area_name}</th>
            </tr>
            <tr>
              <th>Contact(Optional):</th>
              <th>{userInfo.contact_optional}</th>
            </tr>
          </tbody>
        </Table>
        )}
        
      </div>
    </Card>
  )
}

export default RiderInfoList
