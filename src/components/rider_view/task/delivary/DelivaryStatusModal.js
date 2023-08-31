import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Select from "react-select"
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, DELIVERY_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
const { TextArea } = Input

function ChangeStatusModalRider({ statusModalState, setStatusModalState, taskInfo, fetchDelivaryData, }) {
    const [selectedOption, setSelectedOption] = useState()
    const [reason, setReason] = useState()
    
    // console.log("taskInfo", taskInfo)
    let statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "accepted", label: "Accepted" },
        { value: "pickedup", label: "Picked Up" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "hold", label: "Hold" },
        { value: "returned", label: "Returned" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" },
    ]

    const updateStatusAction = (e) => {
        e.preventDefault()
        console.log("reason", reason)
        const formData = {
            'return_to_delivery_reason': reason,
        }

        useJwt
            .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/return_to_delivery/`, formData)
            .then((res) => {
                toast.success('Delivary Status Updated Successfully!')
                setStatusModalState(false)
                fetchDelivaryData()
            })
            .catch(err => {
                toast.success('Delivary Status Updated Failed!')
                setStatusModalState(false)
            })
        return false

    }

    const changeStatusAction = (selected,) => {
        setSelectedOption(selected.value)
    }

    return (
        <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>Reason</ModalHeader>
            <ModalBody>
                <TextArea onChange={(e)=>{setReason(e.target.value)}} rows={4} placeholder="Please Return Reason" />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={updateStatusAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ChangeStatusModalRider
