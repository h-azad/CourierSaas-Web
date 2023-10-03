import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Card } from 'antd'

const MySwal = withReactContent(Swal)

export default function RiderPickupConfirmSwalAlert(pickupAddress, sender, phone, title) {
  return MySwal.fire({
    html:
      <Card size="small" title={pickupAddress} style={{ width: 300, margin: 'auto' }}>
        <p><b>Sender : </b> {sender}</p>
        {phone && <p><b>Phone</b> : {phone}</p>}
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
