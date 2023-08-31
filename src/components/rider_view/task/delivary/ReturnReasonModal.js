import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, DELIVERY_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Radio, Select, DatePicker, Space  } from 'antd'
const { TextArea } = Input

function ReturnReasonModal({ returnModalState, setReturnModalState, taskInfo, fetchDelivaryData}) {
    const [reason, setReason] = useState()
    const [value, setChekedValue] = useState()

    const onChange = (e) => {
        setChekedValue(e.target.value)
        setReason(e.target.value)
    }

    const returnByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason,
        }
        useJwt
            .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/return_to_warehouse/`, formData)
            .then((res) => {
                toast.success('Return Successfully!')
                setReturnModalState(false)
                fetchDelivaryData()
            })
            .catch((err) => {
                toast.error('Return Failed!')
                setReturnModalState(false)
            })
    }

    const onChangeDate = (date, dateString) => {
      console.log(date, dateString)
      setHoldDate(dateString)
    }

    return (
        <Modal isOpen={returnModalState} toggle={() => setReturnModalState(!returnModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setReturnModalState(!returnModalState)}>Reason</ModalHeader>
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
                <Button color='primary' onClick={returnByRiderAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ReturnReasonModal
