import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash,Search, Edit3 } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Label,
  Input,
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PAYMENT_METHOD_LIST, PAYMENT_METHOD_DELETE} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"


const ListTable = () => {
  const [payment, setPayment] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const MySwal = withReactContent(Swal)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(PAYMENT_METHOD_DELETE+id+'/'))
        .then((res) => {
          SwalAlert("Deleted Successfully")
        
        })
        .finally(() => fetchPaymentMethodData())
        
      }
    })
   
  }

  const updateStatusAction = (e) => {
    e.preventDefault()
    console.log("selectedInfo", selectedInfo)
    console.log("selectedStatus", selectedStatus)
  return false
  // useJwt
  // .axiosPost(getApi(SHIPMENT_UPDATE_STATUS) + selectedInfo.id + "/")
  // .then((res) => {
  //   console.log("res", res.data)
  //   setStatusModalState(false)
  //   // SwalAlert("Deleted Successfully")
  
  // })
  // .finally(() => fetchShipmentData())
  
}


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchPaymentMethodData()
  }, [])

  useEffect(() => {
    if(!statusModalState) {
      clearData()
    }
    fetchPaymentMethodData()
  }, [statusModalState])

  const fetchPaymentMethodData = () => {
    return useJwt
      .axiosGet(getApi(PAYMENT_METHOD_LIST))
      .then((res) => {
        console.log("res", res.data)
        setPayment(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  // const fetchSearchShipmentData = searchTerm => {
  //   return useJwt
  //     .axiosGet(getApi(SEARCH_SHIPMENT)+'?search='+ searchTerm)
  //     .then((res) => {
  //       return res.data
  //     })
  //     .catch((err) => console.log(err))
  // }

  // const handleSearch = debounce(e => {
  //   console.log(e.target.value)
  //   const searchTerm = e.target.value
  //   if (searchTerm.length > 2) {
  //     fetchSearchShipmentData(searchTerm)
  //       .then(data => {
  //         if (data.length > 0) {
  //           console.log('res', data)
  //           setShipment(data)
  //         }else{
  //           console.log("No data")
  //         }
  //       })
  //   }
    
  // }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  // function debounce (fn, time) {
  //   let timeoutId
  //   return wrapper
  //   function wrapper (...args) {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId)
  //     }
  //     timeoutId = setTimeout(() => {
  //       timeoutId = null
  //       fn(...args)
  //     }, time)
  //   }
  // }

  return (
    <>
      <CardText>
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="d-flex align-items-center">
                <Link to={'/payment_method/add'}>
                  <Button.Ripple color="primary">Add Payment Method</Button.Ripple>
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-5">
              <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Shipment"
                  name="user_name"
                  type="text"
                  class="form-control"
                  onChange={handleSearch}
                />
                <Button.Ripple className="btn-icon ms-1" outline color="primary">
                  <Search size={16} />
                </Button.Ripple>
              </div>
            </div> */}
          </div>
        </CardText>

      <Table bordered>
        <thead>
          <tr>
            <th>Payment Method Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payment &&
            payment.map((info) => (
              <tr key={info.id}>
                <td>
                  <span className="align-middle fw-bold">{info.payment_method_name}</span>
                </td>
                <td>
                  <Badge pill color="light-primary" className="me-1">
                    {info.status}
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href={"/payment_method/edit/" + info.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, info.id)}>
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>changeStatusAction(e, info)}>
                        <Edit3 className="me-50" size={15} />{" "}
                        <span className="align-middle">Change Status</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Payment method Status"}
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
        </div>
      </StatusModal>
    </>
  )
}

export default ListTable
