import React from 'react'

import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

import { Toast, ToastBody, ToastHeader, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'

function ToastContent({ t, type, message }) {
    let toastContent = null

    switch (type) {
        case 'SUCCESS':
            toastContent = success(message)
            break
    
        default:
            toastContent = defaultToast(message)
            break
    }

    return toastContent
}

function success(message, heading='Success') {
    return (
   
            <Toast>
                <ToastHeader close={close}  icon="success"> {heading} </ToastHeader>
                <ToastBody>
                    {message}
                </ToastBody>
            </Toast>
 
    )
}

function defaultToast(message, heading='INFO') {
    return (

          <Toast>
            <ToastHeader close={close} icon="info">{ heading }</ToastHeader>
            <ToastBody>
              { message }
            </ToastBody>
          </Toast>

    )
}

const close = (
    <button type='button' className='ms-1 btn-close'>
        <span>×</span>
    </button>
)

export default ToastContent
