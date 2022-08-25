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
        <div className='p-3 bg-success my-2 rounded'>
            <Toast>
                <ToastHeader close={close}> {heading} </ToastHeader>
                <ToastBody>
                    {message}
                </ToastBody>
            </Toast>
        </div>
    )
}

function defaultToast(message, heading='INFO') {
    return (
        <div className='p-3 bg-info my-2 rounded'>
          <Toast>
            <ToastHeader close={close}>{ heading }</ToastHeader>
            <ToastBody>
              { message }
            </ToastBody>
          </Toast>
        </div>
    )
}

const close = (
    <button type='button' className='ms-1 btn-close'>
        <span>×</span>
    </button>
)

export default ToastContent
