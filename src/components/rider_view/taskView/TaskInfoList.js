import { Card, CardHeader, Progress, Table } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const TaskInfoList = ({userInfo}) => {
  // console.log(userInfo)
  return (
    <Card>
      <CardHeader tag='h4'>Task Info</CardHeader>
      <hr></hr>
      <div className='react-dataTable user-view-account-projects'>
        {userInfo && (
          <Table responsive>
          <tbody>
            
            <tr>
              <th>Percel Id</th>
              <th>
                  {userInfo.parcel_id}
              </th>
            </tr>
            <tr>
              <th>Receipient Name</th>
              <th>
                  {userInfo.recipient_name}
              </th>
            </tr>
            <tr>
              <th>Phone Number</th>
              <th>
                  {userInfo.phone_number}
              </th>
            </tr>
            <tr>
              <th>Delivary Address</th>
              <th>
                  {userInfo.delivary_address}
              </th>
            </tr>
            <tr>
              <th>Product Type</th>
              <th>
                {userInfo.product_type?.product_type}
              </th>
            </tr>
            <tr>
              <th>Delivary Area</th>
              <th>{userInfo.delivary_area?.area_name}</th>
            </tr>
              <tr>
                <th> Pickup Status</th>
                <th>{userInfo.pickup_status == true ? 'Yes' : 'No'}</th>
              </tr>
            <tr>
              <th>Amount to be collected</th>
              <th>{userInfo.amount_to_be_collected}</th>
            </tr>
              <tr>
                <th>Product Type</th>
                <th>{userInfo.shipment_type?.shipment_type}</th>
              </tr>
              <tr>
                <th>Shipment Type</th>
                <th>{userInfo.product_type?.product_type}</th>
              </tr>
            
              
            <tr>
              <th>Delivary Charge</th>
              <th>{userInfo.delivary_charge}</th>
            </tr>
              <tr>
                <th> Delivary Status</th>
                <th>{userInfo.status}</th>
              </tr>
            
          </tbody>
        </Table>
        )}
        
      </div>
    </Card>
  )
}

export default TaskInfoList
