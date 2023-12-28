import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function SweetAlartConfirm(message, _color, btnName = 'Yes', title = 'Are you sure?') {

  return MySwal.fire({
    title: title,
    text: message,
    color: _color,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: btnName,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  })
}