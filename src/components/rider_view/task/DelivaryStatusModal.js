import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Select from "react-select"
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_DELIVARY_STATUS_UPDATE } from "@src/constants/apiUrls"
import { useState } from 'react'
import ToastContent from '../../ToastContent'
import toast from 'react-hot-toast'

function ChangeStatusModalRider({ statusModalState, setStatusModalState, taskInfo, fetchCurrentTaskData, }) {
    const [selectedOption, setSelectedOption] = useState()

    console.log("taskInfo", taskInfo)

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
        console.log("selectedInfo", selectedOption)
        const formData = {
            'status': selectedOption
        }

        useJwt
            .axiosPatch(getApi(RIDER_DELIVARY_STATUS_UPDATE) + `${taskInfo?.id}/`, formData)
            .then((res) => {
                toast.success('Delivary Status Updated Successfully!')
                setStatusModalState(false)
                fetchCurrentTaskData()
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
            <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>Update task Status</ModalHeader>
            <ModalBody>
                <Select
                    name="status"
                    onChange={changeStatusAction}
                    className={classnames('react-select')}
                    classNamePrefix='select'
                    options={statusOptions}
                />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={updateStatusAction}>Update</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ChangeStatusModalRider
