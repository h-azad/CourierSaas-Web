// ** Reactstrap Imports
import { Card, CardHeader, Progress, Table } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import useJwt from '@src/auth/jwt/useJwt'


// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect } from 'react'

const CreateOrderInfoList = ({orderDetails}) => {
  // useEffect(() => {
    console.log(orderDetails)
  // }, [orderDetails])

  return (
    <Card>
      <CardHeader tag='h4'>Order Info</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        {orderDetails && (
          <Table responsive>
          <tbody>
            
            <tr>
              <th>Marchant</th>
              <th>{orderDetails.marchant?.full_name}</th>
            </tr> 
            <tr>
              <th>Product Type</th>
              <th>
                {orderDetails.product_type?.product_type}
              </th>
            </tr>
            <tr>
              <th>Delivary Area</th>
              <th>{orderDetails.delivary_area?.area_name}</th>
            </tr>
            <tr>
              <th>Amount to be collected</th>
              <th>{orderDetails.amount_to_be_collected}</th>
            </tr>
              <tr>
                <th>Product Type</th>
                <th>{orderDetails.shipment_type?.shipment_type}</th>
              </tr>
              <tr>
                <th>Shipment Type</th>
                <th>{orderDetails.product_type?.product_type}</th>
              </tr>
              <tr>
                <th>Status</th>
                <th>{orderDetails.status}</th>
              </tr>
              
            <tr>
              <th>Delivary Charge</th>
              <th>{orderDetails.delivary_charge}</th>
            </tr>

            <tr>
                <th>Cash On Delivery Charge</th>
                <th>{orderDetails.cash_on_delivery_charge}</th>
            </tr>
              <tr>
                <th>Collection Amount</th>
                <th>{orderDetails.amount_to_be_collected}</th>
              </tr>
              <tr>
                <th>Total Amount</th>
                <th>{Number(orderDetails?.amount_to_be_collected) + Number(orderDetails?.delivary_charge) + Number(orderDetails?.cash_on_delivery_charge)}</th>
              </tr>
          </tbody>
        </Table>
        )}
        
      </div>
    </Card>
  )
}

export default CreateOrderInfoList
