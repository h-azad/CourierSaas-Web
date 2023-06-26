import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, DELIVERY_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Radio } from 'antd'
const { TextArea } = Input

function CancelReasonModal({ cancelModalState, setCancelModalState, taskInfo }) {
    const [reason, setReason] = useState()
    const [value, setChekedValue] = useState()

    const onChange = (e) => {
        setChekedValue(e.target.value)
        setReason(e.target.value)
    }

    const cancelByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason
        }
        useJwt
            .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/cancel_delivery/`, formData)
            .then((res) => {                
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
            <ModalHeader toggle={() => setCancelModalState(!cancelModalState)}>Reason</ModalHeader>
            <ModalBody>
                <TextArea value={reason} onChange={(e) => { setReason(e.target.value) }} rows={4} placeholder="Please Written Reason" />
            </ModalBody>
            <Radio.Group onChange={onChange} value={value}
                style={{
                    width: '100%',
                    paddingLeft: '20px'
                }}>
                <Radio value={'Personal Issue'}>Personal Issue</Radio>
                <Radio value={'Location Not Found'}>Location Not Found</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>
            <ModalFooter>
                <Button color='primary' onClick={cancelByRiderAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CancelReasonModal
