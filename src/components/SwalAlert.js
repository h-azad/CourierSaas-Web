import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function SwalAlert(message, type='info', title='Information') {

    let confirmBtn = 'btn btn-primary'
    let timerInterval

    switch (type) {
        case 'success':
            type = 'success'
            title = 'Success'
            break

        case 'error':
            type = 'error'
            title = 'Error'
            confirmBtn = 'btn btn-danger'
            break
    
        default:
            type = 'info'
            break
    }

  return MySwal.fire({
    title: title,
    text: message,
    icon: type,
    timer: 1000,
    timerProgressBar: true,
    customClass: {
      confirmButton: confirmBtn
    },
    buttonsStyling: false,
    didOpen: () => {
        MySwal.showLoading()
        timerInterval = setInterval(() => { }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
  })
}

export default SwalAlert
