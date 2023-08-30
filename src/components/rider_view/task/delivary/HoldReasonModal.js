import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, DELIVERY_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Radio, Select, DatePicker, Space, Tag } from 'antd'
const { TextArea } = Input

function HoldReasonModal({ holdModalState, setHoldModalState, taskInfo }) {
    console.log('taskInfo', taskInfo)
    const [reason, setReason] = useState()
    const [holdDate, setHoldDate] = useState()
    const [value, setChekedValue] = useState()

    const onChange = (e) => {
        setChekedValue(e.target.value)
        setReason(e.target.value)
    }

    const cancelByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason,
            'hold_date': holdDate
        }
        useJwt
            .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${taskInfo?.id}/hold_delivery/`, formData)
            .then((res) => {
                toast.success('Cancelled Successfully!')
                setHoldModalState(false)
                fetchCurrentTaskData()
            })
            .catch((err) => {
                toast.error('Cancle Failed!')
                setHoldModalState(false)
            })
    }

    const onChangeDate = (date, dateString) => {
        console.log(date, dateString)
        setHoldDate(dateString)
    }

    return (
        <Modal isOpen={holdModalState} toggle={() => setHoldModalState(!holdModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setHoldModalState(!holdModalState)}>Reason</ModalHeader>
            <div className='container'>
                <label for="html">Hold Date</label><br></br>
                <DatePicker onChange={onChangeDate} rules={[{required: true}]} />
            </div>

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

export default HoldReasonModal
