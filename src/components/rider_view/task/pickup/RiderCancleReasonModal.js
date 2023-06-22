import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
const { TextArea } = Input

function RiderCancleReasonModal({ cancleModalState, setCancleModalState, taskInfo, fetchPickupData }) {
    const [reason, setReason] = useState()
    console.log('taskInfojjjjjjjjjjjjjj', taskInfo)

    const cancelByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason
        }
        useJwt
            // .axiosPost(getApi(`${RIDER_ASSIGNMENT}/${taskInfo.id}/cancel_by_pickup/`, formData))
            .axiosPost(getApi(RIDER_ASSIGNMENT) + `/${taskInfo?.id}/cancel_by_pickup/`, formData)
            .then((res) => {
                toast.success(res.data)
                
                toast.success('Cancelled Successfully!')
                setCancleModalState(false)
                fetchCurrentTaskData()
            })
            .catch((err) => {
                toast.error('Cancle Failed!')
                setCancleModalState(false)
            })
    }

    // const updateStatusAction = (e) => {
    //     e.preventDefault()
    //     console.log("reason", reason)
    //     const formData = {
    //         'return_to_delivery_reason': reason,
    //     }

    //     useJwt
    //         .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/return_to_delivery/`, formData)
    //         .then((res) => {
    //             toast.success('Delivary Status Updated Successfully!')
    //             setsetModalState(false)
    //             fetchCurrentTaskData()
    //         })
    //         .catch(err => {
    //             toast.success('Delivary Status Updated Failed!')
    //             setsetModalState(false)
    //         })
    //     return false

    // }

    return (
        <Modal isOpen={cancleModalState} toggle={() => setCancleModalState(!cancleModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setCancleModalState(!cancleModalState)}>Reason Cancle rider</ModalHeader>
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
