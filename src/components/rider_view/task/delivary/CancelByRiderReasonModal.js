import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, DELIVERY_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
const { TextArea } = Input

function CancelByRiderReasonModal({ cancelModalState, setCancelModalState, taskInfo, fetchDelivaryData }) {
    const [reason, setReason] = useState()
    const cancelByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason
        }
        useJwt
            .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/cancel_by_rider/`, formData)
            .then((res) => {
                toast.success(res.data)
                
                toast.success('Cancelled Successfully!')
                setCancelModalState(false)
                fetchDelivaryData()
            })
            .catch((err) => {
                toast.error('Cancle Failed!')
                setCancelModalState(false)
            })
    }

    return (
        <Modal isOpen={cancelModalState} toggle={() => setCancelModalState(!cancelModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setCancelModalState(!cancelModalState)}>Reason</ModalHeader>
            <ModalBody>
                <TextArea onChange={(e) => { setReason(e.target.value) }} rows={4} placeholder="Please Written Reason" />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={cancelByRiderAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CancelByRiderReasonModal
