import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Select from "react-select"
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_PICKED_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from 'antd'
const { TextArea } = Input

function PickupStatusModal({ statusModalState, setStatusModalState, taskInfo, fetchPickupData }) {
    const [selectedOption, setSelectedOption] = useState()
    const [reason, setReason] = useState()

    let statusOptions = [
        { value: "False", label: "No" },
        { value: "True", label: "Yes" },
    ]

    const updateStatusAction = (e) => {
        e.preventDefault()
        console.log("reason", reason)
        const formData = {
            'reverso_ride_reason': reason,
        }

        useJwt
            .axiosPost(getApi(RIDER_PICKED_ASSIGNMENT) + `/${taskInfo?.id}/return_to_reverso_ride/`, formData)
            .then((res) => {
                setStatusModalState(false)
                fetchCurrentTaskData()
                toast.success('Delivary Status Updated Successfully!')
            })
            .catch(err => {
                setStatusModalState(false)
                toast.success('Delivary Status Updated Failed!')
            })
        return false

    }

    const changeOrderStatusAction = (selected,) => {
        setSelectedOption(selected.value)
    }

    return (
        <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>Reason</ModalHeader>
            <ModalBody>
                <TextArea onChange={(e) => { setReason(e.target.value) }} rows={4} placeholder="Please Written Revers Reason" />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={updateStatusAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PickupStatusModal
