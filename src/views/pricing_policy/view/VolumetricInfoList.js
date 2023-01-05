// ** Reactstrap Imports
import { Card, CardHeader, Progress, Table } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

import useJwt from '@src/auth/jwt/useJwt'



// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect } from 'react'

const PricingInfoList = ({userInfo}) => {
  // useEffect(() => {
  //   console.log(userInfo)
  // }, [userInfo])

  return (
    <Card>
      <CardHeader tag='h4'>Pricing Policy Info</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        {userInfo && (
          <Table responsive>
          <tbody>
            <tr>
              <th>Min Dimention</th>
              <th>{userInfo.min_dimention}</th>
            </tr>
            <tr>
              <th>Max Dimention</th>
              <th>{userInfo.max_dimention}</th>
            </tr>
            <tr>
              <th>Max Weight</th>
              <th>{userInfo.max_weight}</th>
            </tr>
            <tr>
              <th>Per Dimention</th>
              <th>{userInfo.per_dimention}</th>
            </tr>
            <tr>
              <th>Additional Charge :</th>
              <th>{userInfo.additional_charge}</th>
            </tr>
            <tr>
              <th>COD Charge:</th>
              <th>{userInfo.cod_charge}</th>
            </tr>
            
          </tbody>
        </Table>
        )}
        
      </div>
    </Card>
  )
}

export default PricingInfoList
