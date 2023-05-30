// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X, CreditCard } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  RIDER_UPDATE_STATUS,
} from "../../../constants/apiUrls"


// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useNavigate } from 'react-router-dom'
import StatusModal from '../../../components/StatusModal'

const roleColors = {
  merchant: 'light-info',
  agent: 'light-danger',
  rider: 'light-warning'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  // { value: 'suspended', label: 'Suspended' }
]



const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(selectedUser?.status)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const navigate = useNavigate()
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.avatar?.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser?.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser?.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser?.fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  // const updateStatusAction = (e) => {
  //   e.preventDefault()
  //   console.log("selectedInfo", selectedInfo)
  //   console.log("selectedStatus", selectedStatus)
  //   return false
  //   // useJwt
  //   // .axiosPost(getApi(SHIPMENT_UPDATE_STATUS) + selectedInfo.id + "/")
  //   // .then((res) => {
  //   //   console.log("res", res.data)
  //   //   setStatusModalState(false)
  //   //   // SwalAlert("Deleted Successfully")

  //   // })
  //   // .finally(() => fetchShipmentData())

  // }

  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(RIDER_UPDATE_STATUS) + "/" + selectedInfo.id + "/", {
        status: selectedStatus,
      })
      .then((res) => {
        console.log("res", res.data)
        setStatusModalState(false)
      })
  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(selectedStatus)
    setSelectedInfo(info)
  }


  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser?.full_name}</h4>

                  <Badge color={roleColors['merchant']} className='text-capitalize'>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <CreditCard className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>1.23$</h4>
                <small>Payable</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>568</h4>
                <small>Delivery Done</small>
              </div>
            </div>
          </div>

          <h4 className='fw-bolder border-bottom pb-50 mb-1'> Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'> Email:</span>
                  <span>{selectedUser?.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Phone:</span>
                  <span >{selectedUser?.contact_no}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => { navigate("/rider/edit/" + selectedUser.id) }}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline onClick={e => changeStatusAction(e, selectedUser)}>
              Change Status
            </Button>
          </div>
        </CardBody>
      </Card>

      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Rider Status"}
      >
        <div className='demo-inline-spacing'>
          <div className='form-check'>
            <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "active" ? true : false} onChange={() => setSelectedStatus("active")} />
            <Label className='form-check-label' for='ex1-active'>
              Active
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "inactive" ? true : false} onChange={() => setSelectedStatus("inactive")} />
            <Label className='form-check-label' for='ex1-inactive'>
              Inactive
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-pending' checked={selectedStatus == "pending" ? true : false} onChange={() => setSelectedStatus("pending")} />
            <Label className='form-check-label' for='ex1-pending'>
              Pending
            </Label>
          </div>
        </div>
      </StatusModal>
    </Fragment>
  )
}

export default UserInfoCard
