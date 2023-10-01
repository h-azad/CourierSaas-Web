import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Card } from 'antd'

const MySwal = withReactContent(Swal)

export default function RiderDeliveryConfirmSwalAlert(deliveryAddress, receiver, phone, title) {
  return MySwal.fire({
    html:
      <Card size="small" title={deliveryAddress} style={{ width: 300, margin: 'auto' }}>
        <p><b>Recipient : </b> {receiver}</p>
        <p><b>Phone</b> : {phone}</p>
      </Card >,
    title: title,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  })
}
