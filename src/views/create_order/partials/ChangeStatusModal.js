import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Select from "react-select"
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ORDER_STATUS_UPDATE } from "@src/constants/apiUrls"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { OrderStatusOptions } from '@src/components/orderRelatedData'

function ChangeStatusModal({ statusModalState, setStatusModalState, orderInfo, fetchCreateOrderData }) {
  const [selectedOption, setSelectedOption] = useState()
  const [error, setError] = useState(false)

  const updateStatusAction = (e) => {
    e.preventDefault()
    const formData = {
      'status': selectedOption,
      'previous_status': orderInfo.status
    }
    useJwt
      .axiosPatch(getApi(ORDER_STATUS_UPDATE) + `${orderInfo.id}/`, formData)
      .then((res) => {
        if (res?.data?.error == true){
          toast.error(res?.data?.message)
          setError(res?.data?.message)
          setStatusModalState(true)
        }else{
          toast.success(res?.data?.message)
          setStatusModalState(false)
          fetchCreateOrderData()
        }
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
      
      {error && <ModalHeader><p className='text-danger'>{error}</p></ModalHeader>}
      <ModalBody>
        <Select
          id="status"
          name="status"
          onChange={changeOrderStatusAction}
          className={classnames('react-select')}
          classNamePrefix='select'
          options={OrderStatusOptions}
        />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={updateStatusAction}>Update</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ChangeStatusModal
