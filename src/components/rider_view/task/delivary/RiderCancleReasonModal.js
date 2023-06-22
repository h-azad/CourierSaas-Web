import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, DELIVERY_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
const { TextArea } = Input

function RiderCancleReasonModal({ cancelModalState, setCancelModalState, taskInfo }) {
    const [reason, setReason] = useState()
    console.log('taskInfo', taskInfo)
    const cancelByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason
        }
        useJwt
            .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/cancel_by_rider/`, formData)
            // .axiosPost(
            //     getApi(`${DELIVERY_ASSIGNMENT}/${info.id}/cancel_by_rider/`),
            //     { details: info }
            // )
            .then((res) => {
                toast.success(res.data)
                
                toast.success('Cancelled Successfully!')
                setCancelModalState(false)
                fetchCurrentTaskData()
            })
            .catch((err) => {
                toast.error('Cancle Failed!')
                setCancelModalState(false)
            })
    }

    return (
        <Modal isOpen={cancelModalState} toggle={() => setCancelModalState(!cancelModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setCancelModalState(!cancelModalState)}>Reason xxx </ModalHeader>
            <ModalBody>
                <TextArea onChange={(e) => { setReason(e.target.value) }} rows={4} placeholder="Please Return Reason" />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={cancelByRiderAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default RiderCancleReasonModal
