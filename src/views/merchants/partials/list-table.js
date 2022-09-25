import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
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
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  MARCHANT_LIST,
  MARCHANT_DELETE,
  MARCHANT_SEARCH,
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"


const ListTable = () => {
  const [merchants, setMerchants] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()

    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(MARCHANT_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => fetchMerchantsData())
        }
      }
    )
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
    fetchMerchantsData()
  }, [])

  
  useEffect(() => {
    if(!statusModalState) {
      clearData()
    }
    fetchMerchantsData()
  }, [statusModalState])

  const fetchMerchantsData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_LIST))
      .then((res) => {
        setMerchants(res.data)
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const fetchSearchMerchantsData = searchTerm => {
    return useJwt
      .axiosGet(getApi(MARCHANT_SEARCH)+'?search='+ searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 2) {
      fetchSearchMerchantsData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setMerchants(data)
          }else{
            console.log("No data")
          }
        })
    }
    
  }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  function debounce (fn, time) {
    let timeoutId
    return wrapper
    function wrapper (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
  }

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={"/merchants/add"}>
                <Button.Ripple color="primary">Add Merchant</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Marchant"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={handleSearch}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
      <Table bordered>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Contact Number 1*</th>
            {/* <th>Contact Number 2*</th>
            <th>Identity</th>
            <th>Identity No*</th> */}
            <th>Email</th>
            {/* <th>Preferred Payment Method*</th>
            <th>Bank Name</th>
            <th>Bank Account Name</th>
            <th>Account Number</th> */}
            <th>City Name</th>
            <th>Area Name</th>
            {/* <th>Business Name</th>
            <th>Address</th>
            <th>Pickup Address</th>
            <th>Password</th>
            <th>Confirm Password</th> */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {merchants &&
            merchants.map((info) => (
              <tr key={info.id}>
                <td>
                  <span className="align-middle fw-bold">{info.full_name}</span>
                </td>
                <td>{info.contact_no}</td>
                {/* <td>{info.contact_no_two}</td>
                <td>{info.identity}</td>
                <td>{info.identity_no}</td> */}
                <td>{info.email}</td>
                {/* <td>{info.payment_method}</td>
                <td>{info.bank_name}</td>
                <td>{info.bank_account_name}</td>
                <td>{info.bank_account_num}</td> */}
                <td>{info.city}</td>
                <td>{info.area}</td>
                {/* <td>{info.business_name}</td>
                <td>{info.address}</td>
                <td>{info.pickup_address}</td>
                <td>{info.password}</td>
                <td>{info.confirm_password}</td> */}
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
                      <DropdownItem href={"/merchants/view/" + info.id} >
                        <Eye className="me-50" size={15} />{" "}
                        <span className="align-middle">View</span>
                      </DropdownItem>
                      <DropdownItem href={"/merchants/edit/" + info.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem
                        href="/"
                        onClick={(e) => deleteAction(e, info.id)}
                      >
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
      </div>
     
      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Marchant Status"}
      >
        <div className='demo-inline-spacing'>
          <div className='form-check'>
            <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "approved" ? true : false} onChange={() => setSelectedStatus("approved")} />
            <Label className='form-check-label' for='ex1-active'>
            Approved
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "inactive" ? true : false} onChange={() => setSelectedStatus("inactive")} />
            <Label className='form-check-label' for='ex1-inactive'>
             Inactive
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "pending" ? true : false} onChange={() => setSelectedStatus("pending")} />
            <Label className='form-check-label' for='ex1-inactive'>
             Pending
            </Label>
          </div>
        </div>
      </StatusModal>
    </>
  )
}

export default ListTable
