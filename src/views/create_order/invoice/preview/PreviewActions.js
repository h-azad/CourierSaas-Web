// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, setSendSidebarOpen, setAddPaymentOpen, handlePDFQuery }) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        {/* <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
          Send Invoice
        </Button> */}
        {/* <Button color='secondary' block outline className='mb-75'>
          Download
        </Button> */}
        <Button onClick={()=>handlePDFQuery(id)} color='success' block outline className='mb-75'>
          Print
        </Button>
        {/* <Button tag={Link} to={`/apps/invoice/edit/${id}`} color='secondary' block outline className='mb-75'>
          Edit
        </Button>
        <Button color='success' block onClick={() => setAddPaymentOpen(true)}>
          Add Payment
        </Button> */}
      </CardBody>
    </Card>
  )
}

export default PreviewActions
