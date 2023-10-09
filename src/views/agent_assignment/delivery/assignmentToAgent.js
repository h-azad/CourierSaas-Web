

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
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  AGENT_LIST_VIEW,
  RIDER_DELETE,
  RIDER_SEARCH,
  UNPICKUP_ORDER_LIST,
  RIDER_SEARCH_FILTER,
  RIDER_UPDATE_STATUS,
  CREATE_ORDER_LIST,
  UNDELIVERY_ORDER_LIST,
  DELIVERY_ASSIGN_TO_AGENT,
  DELIVERY_TO_AGENT_TASK_LIST,
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"


const AssignmentToAgent = () => {
  const [agent, setAgent] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [orders, setOrder] = useState([])

  const [selectedOrderIds, setselectedOrderid] = useState([])
  const [agentID, setRiderID] = useState()
  const [assignType, setAssignType] = useState()



  const delivaryHandler = (e) => {

    e.preventDefault()
    useJwt
      .axiosPost(getApi(DELIVERY_ASSIGN_TO_AGENT + "/"), {
        agentID: agentID,
        selectedOrderIds: selectedOrderIds
      })
      .then((res) => {
        console.log("res", res.data)
        setStatusModalState(false)
      })
    //   .finally(() => fetchAgentData())
  }


  const handleselectedOrderId = (e) => {
    const { value, checked } = e.target
    if (checked) {
      let prevFormValues = [...selectedOrderIds, value]
      setselectedOrderid(prevFormValues)
    } else {
      let currentFromValues = selectedOrderIds.filter(item => item !== value)
      setselectedOrderid(currentFromValues)
    }

  }


  const deliveryAssign = (e, info) => {
    e.preventDefault()
    setselectedOrderid([])
    setAssignType('delivery')
    setRiderID(info.id)
    fetchUnDeliveryData()
    setStatusModalState(true)
  }

  useEffect(() => {
    fetchAgentData()
  }, [])


  useEffect(() => {
    fetchAgentData()
  }, [statusModalState])

  const fetchAgentData = () => {
    return useJwt
      .axiosGet(getApi(AGENT_LIST_VIEW))
      .then((res) => {
        setAgent(res.data)
        return res.data
      })
      .catch((err) => console.log(err))
  }


  const fetchUnDeliveryData = () => {
    return useJwt.axiosGet(getApi(UNDELIVERY_ORDER_LIST))
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
            setAgent(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchAgentData()
    }

  }, 300)


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
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search agent"
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
              <th>Type</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agent &&
              agent.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.full_name}</span>
                  </td>
                  <td>{info.types.name}</td>
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
                        <DropdownItem href="/" onClick={e => deliveryAssign(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Delivary</span>
                        </DropdownItem>
                        <DropdownItem tag={Link} to={"/agent-assignment/delivery/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">Delivery Tasks</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
        <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>{assignType==="pickup" ? 'Pickup Assign' : 'Delivery Assign'}</ModalHeader>
        <ModalBody>

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
                  orders.map((info, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span className="align-middle fw-bold">{info.delivary_address}</span>
                        </td>
                        <td><a target="_blank" href={"/create_order/view/" + info.id}>{info.parcel_id}</a></td>
                        <td>
                          <Input type='checkbox' value={info.id} onClick={(e) => { handleselectedOrderId(e) }} name="order_id" id='remember-me' />
                        </td>
                      </tr>
                    )

                  })}
              </tbody>
            </Table>
          </div>
          {/* </div> */}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={delivaryHandler}>Assign</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AssignmentToAgent

