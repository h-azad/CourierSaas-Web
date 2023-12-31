import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Button } from 'antd'

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
  const [responseError, setResponseError] = useState()

  const [loadings, setLoadings] = useState([])

  const enterLoading = (index) => {
    if (index === true) {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[1] = true
        return newLoadings
      })
    } else {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[1] = false
        return newLoadings
      })
    }
  }



  const updateStatusAction = (e) => {
    e.preventDefault()
    enterLoading(true)
    const formData = {
      'status': selectedOption,
      'previous_status': orderInfo.status
    }
    useJwt
      .axiosPatch(getApi(ORDER_STATUS_UPDATE) + `${orderInfo.id}/`, formData)
      .then((res) => {
        if (res?.data?.error == true){
          enterLoading(false)
          toast.error(res?.data?.message)
          setError(res?.data?.message)
          setStatusModalState(true)
        }else{
          toast.success(res?.data?.message)
          enterLoading(false)
          setStatusModalState(false)
          fetchCreateOrderData()
        }
      })
      .catch(err => {
        enterLoading(false)
        toast.error('Order Status Updated Failed!')
        err?.response?.data?.message ? toast.error(err?.response?.data?.message) : setStatusModalState(true)
        setResponseError(err?.response?.data?.message)

      })
    return false

  }

  const changeOrderStatusAction = (selected,) => {
    setSelectedOption(selected.value)
  }

  return (
    <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
      <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>Update 2 Order Status</ModalHeader>
      {responseError && <h3 style={{ color: 'red' }}>{responseError}</h3>}
      
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

        <Button
          type="primary"
          // icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={updateStatusAction }
        >
          Update
        </Button>

        {/* <Button color='primary' onClick={updateStatusAction}>Update</Button> */}
      </ModalFooter>
    </Modal>
  )
}

export default ChangeStatusModal
