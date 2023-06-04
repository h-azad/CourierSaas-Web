

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
  RIDER_ASSIGNMENT,
  RIDER_DELETE,
  RIDER_SEARCH,
  UNPICKUP_ORDER_LIST,
  RIDER_SEARCH_FILTER,
  RIDER_UPDATE_STATUS
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"


const RiderAssignmentList = () => {
  const [rider, setRider] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [orders, setOrder] = useState([])
  const deleteAction = (e, id) => {
    e.preventDefault()

    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(RIDER_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => fetchRiderData())
        }
      }
    )
  }

  //   const updateStatusAction = (e) => {
  //     e.preventDefault()
  //     console.log("selectedInfo", selectedInfo)
  //     console.log("selectedStatus", selectedStatus)
  //   return false

  // }
  const updateStatusAction = (e) => {
    console.log(e)
    // e.preventDefault()
    // useJwt
    //   .axiosPatch(getApi(RIDER_UPDATE_STATUS) + "/" + selectedInfo.id + "/", {
    //     status: selectedStatus,
    //   })
    //   .then((res) => {
    //     console.log("res", res.data)
    //     setStatusModalState(false)
    //   })
    //   .finally(() => fetchRiderData())
  }





  const changeStatusAction = (e, info) => {
    e.preventDefault()
    fetchOrderData()
    setStatusModalState(true)
    setSelectedStatus(info)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchRiderData()
  }, [])


  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchRiderData()
  }, [statusModalState])

  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_ASSIGNMENT))
      .then((res) => {
        setRider(res.data)
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const fetchOrderData = () => {
    return useJwt.axiosGet(getApi(UNPICKUP_ORDER_LIST))
      .then((res) => {
        console.log(res.data)
        setOrder(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const fetchSearchRidersData = searchTerm => {
    return useJwt
      // .axiosGet(getApi(RIDER_SEARCH)+'?search='+ searchTerm) //after line
      .axiosGet(getApi(RIDER_SEARCH_FILTER) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchRidersData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setRider(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchRiderData()
    }

  }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  function debounce(fn, time) {
    let timeoutId
    return wrapper
    function wrapper(...args) {
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
              <Link to={"/rider/add"}>
                <Button.Ripple color="primary">Add Rider</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Rider"
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
              <th>Contact Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rider &&
              rider.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.full_name}</span>
                  </td>
                  <td>{info.contact_no}</td>
                  <td>{info.email}</td>
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
                        <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Pickup</span>
                        </DropdownItem>
                        {/* <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Delivary</span>
                        </DropdownItem> */}
                        <DropdownItem href={"/rider/view/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">View</span>
                        </DropdownItem>
                        <DropdownItem href={"/rider/edit/" + info.id}>
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
        title={"Pickup Assignment"}
      >
        {/* <div className='demo-inline-spacing'> */}

        <div class="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>Address</th>
                <th>parcel_id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((info,index) => {

                  return (
                    <tr key={index}>
                      <td>
                        <span className="align-middle fw-bold">{info.delivary_address}</span>
                      </td>
                      <td>{info.parcel_id}</td>
                      <td>
                        <Input type='checkbox' id='remember-me' />
                      </td>
                    </tr>
                  )

                })}
            </tbody>
          </Table>
        </div>
        {/* </div> */}
      </StatusModal>
    </>
  )
}

export default RiderAssignmentList

