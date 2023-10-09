import { React, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_ASSIGNMENT } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Radio} from 'antd'
import { useForm } from "react-hook-form"
const { TextArea } = Input

function CancelByMarchantModal({ cancelByMarchantModalState, setCancelByMarchantModalState, taskInfo, fetchPickupData }) {
    const [reason, setReason] = useState('')
    const [value, setValue1] = useState(1)




    const cancelByRiderAction = (e) => {
        e.preventDefault()
        const formData = {
            'reason': reason
        }
        useJwt
            .axiosPost(getApi(RIDER_ASSIGNMENT) + `/${taskInfo?.id}/cancel_by_marchant/`, formData)
            .then((res) => {
                setCancelByMarchantModalState(false)
                fetchPickupData()
                toast.success('Cancelled Successfully!')
            })
            .catch((err) => {
                setCancelByMarchantModalState(false)
                toast.error('Cancle Failed!')
            })
    }

    const onChange = (e) => {
        setValue1(e.target.value)
        console.log(e.target.value)
        setReason(e.target.value)
    }



    return (
        <Modal isOpen={cancelByMarchantModalState} toggle={() => setCancelByMarchantModalState(!cancelByMarchantModalState)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setCancelByMarchantModalState(!cancelByMarchantModalState)}>Reason By Marchant</ModalHeader>
            <ModalBody>
                <TextArea value={reason} onChange={(e) => { setReason(e.target.value) }} rows={4} placeholder="Please Written Reason By Cancel" />
            </ModalBody>

            <Radio.Group onChange={onChange} value={value}
                style={{
                    width: '100%',
                    paddingLeft: '20px'
                }}>
                <Radio value={'Personal Issu'}>A</Radio>
                <Radio value={'Location Not Found'}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>

            <ModalFooter>
                <Button color='primary' onClick={cancelByRiderAction}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CancelByMarchantModal
