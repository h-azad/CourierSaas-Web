import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Select from "react-select"
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_PICKUP_STATUS_UPDATE } from "@src/constants/apiUrls"
import { useState } from 'react'
import ToastContent from '../../../ToastContent'
import toast from 'react-hot-toast'

function PickupStatusModal({ statusModalState, setStatusModalState, orderInfo, fetchPickupData }) {
    const [selectedOption, setSelectedOption] = useState()

    let statusOptions = [
        { value: "False", label: "No" },
        { value: "True", label: "Yes" },
    ]

    const updateStatusAction = (e) => {
        e.preventDefault()
        // console.log("selectedInfo", selectedOption)
        const formData = {
            'status': selectedOption
        }

        useJwt
            .axiosPatch(getApi(RIDER_PICKUP_STATUS_UPDATE) + `${orderInfo.id}/`, formData)
            .then((res) => {
                toast.success('Order Status Updated Successfully!')
                setStatusModalState(false)
                fetchPickupData()
            })
            .catch(err => {
                toast.success('Order Status Updated Failed!')
                setStatusModalState(false)
            })
        return false

    }

    const changeOrderStatusAction = (selected,) => {
        setSelectedOption(selected.value)
    }

    return (
        <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>Update Order Status</ModalHeader>
            <ModalBody>
                <Select
                    id="status"
                    name="status"
                    onChange={changeOrderStatusAction}
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

export default PickupStatusModal
