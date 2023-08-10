// ** Reactstrap Imports
import { Card, CardBody, Table } from 'reactstrap'

const ProfileAbout = ({ data, userData }) => {
  console.log('data', data)
  console.log('userData', userData)

  return (
    <Card>
      <CardBody>
        {data &&
          <Table responsive>
            <tbody>
              <tr>
                <th>Full Name</th>
                <th>{data.full_name}</th>
              </tr>
              <tr>
                <th>Email</th>
                <th>{data.email}</th>
              </tr>
              <tr>
                <th>Status</th>
                <th>{data.status}</th>
              </tr>
              <tr>
                <th>Address</th>
                <th>{data.address}</th>
              </tr>
              <tr>
                <th>Identity</th>
                <th>{data.identity}</th>
              </tr>
              <tr>
                <th>Identity Number</th>
                <th>{data.identity_no}</th>
              </tr>
              <tr>
                <th>Bank Name:</th>
                <th>{data.bank_name}</th>
              </tr>
              <tr>
                <th>Bank A/C Name:</th>
                <th>{data.bank_account_name}</th>
              </tr>
              <tr>
                <th>Bank A/C Number:</th>
                <th>{data.bank_account_num}</th>
              </tr>
              <tr>
                <th>Payment Method:</th>
                <th>{data?.payment_method?.payment_method_name}</th>
              </tr>
              <tr>
                <th>City:</th>
                <th>{data?.city?.city_name}</th>
              </tr><tr>
                <th>Area:</th>
                <th>{data?.area?.area_name}</th>
              </tr>
              <tr>
                <th>Contact(Optional):</th>
                <th>{data.contact_no}</th>
              </tr>
            </tbody>
          </Table>
        }

        {userData &&
          <Table responsive>
            <tbody>
              <tr>
                <th>Full Name</th>
                <th>{userData.name}</th>
              </tr>
              <tr>
                <th>Email</th>
                <th>{userData.email}</th>
              </tr>
            </tbody>
          </Table>
        }

        {/* <h5 className='mb-75'>Full Name</h5>
        <CardText>{data.full_name}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{data.email}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Identity:</h5>
          <CardText>{data.identity}</CardText>
        </div> */}
        {/* <div className='mt-2'>
          <h5 className='mb-75'>Bank Name:</h5>
          <CardText>{data.bank_name}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Bank A/C Name:</h5>
          <CardText>{data.bank_account_name}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Bank A/C Number:</h5>
          <CardText>{data.bank_account_num}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Payment Method:</h5>
          <CardText>{data.payment_method}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Contact(Optional):</h5>
          <CardText>{data.contact_no}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>City:</h5>
          <CardText>{data.city}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Area:</h5>
          <CardText>{data.area}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Address:</h5>
          <CardText>{data.address}</CardText>
        </div> */}
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
