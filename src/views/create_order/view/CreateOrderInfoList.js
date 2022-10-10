// ** Reactstrap Imports
import { Card, CardHeader, Progress, Table } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import useJwt from '@src/auth/jwt/useJwt'


// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect } from 'react'

const CreateOrderInfoList = ({userInfo}) => {
  // useEffect(() => {
    console.log(userInfo)
  // }, [userInfo])

  return (
    <Card>
      <CardHeader tag='h4'>Order Info</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        {userInfo && (
          <Table responsive>
          <tbody>
            
            <tr>
              <th>Marchant</th>
              <th>{userInfo.marchant?.full_name}</th>
            </tr> 
            <tr>
              <th>Product Type</th>
              <th>
                {userInfo.product_type?.product_type}
              </th>
            </tr>
            <tr>
              <th>Delivary Area</th>
              <th>{userInfo.delivary_area?.areas_name}</th>
            </tr>

            <tr>
              <th>Dimention</th>
              <th>{userInfo.dimention}</th>
            </tr>
            <tr>
              <th>Amount to be collected</th>
              <th>{userInfo.amount_to_be_collected}</th>
            </tr>
            <tr>
              <th>Delivary Charge</th>
              <th>{userInfo.delivary_charge}</th>
            </tr>
            
          </tbody>
        </Table>
        )}
        
      </div>
    </Card>
  )
}

export default CreateOrderInfoList
