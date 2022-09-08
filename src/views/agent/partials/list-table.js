import { MoreVertical, Edit, Trash, Search } from "react-feather"

import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { 
  getApi, 
  AGENT_LIST, 
  AGENT_DELETE ,
  AGENT_SEARCH ,
}from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import { Link } from "react-router-dom"

const ListTable = () => {
  const [agent, setAgent] = useState([])
  const MySwal = withReactContent(Swal)

  const deleteAction = (e, id) => {
    e.preventDefault()

    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(AGENT_DELETE+id+'/'))
        .then((res) => {
          SwalAlert("Deleted Successfully")
        })
        .finally(() => fetchAgentData())
      }
    })
  }
  useEffect(() => {
    fetchAgentData()
  }, [])

  const fetchAgentData = () => {
    return useJwt
      .axiosGet(getApi(AGENT_LIST))
      .then((res) => {
        setAgent(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchAgentData = searchTerm => {
    return useJwt
      .axiosGet(getApi(AGENT_SEARCH)+'?search='+ searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 2) {
      fetchSearchAgentData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setAgent(data)
          }else{
            console.log("No data")
          }
        })
    }
    
  }, 300)

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
              <Link to={'/agent/add'}>
                <Button.Ripple color="primary">Add Agent</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Agent"
                name="user_name"
                type="text"
                class="form-control"
                onChange={handleSearch}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agent &&
            agent.map((info) => (
              <tr key={info.id}>
                <td>
                  <span className="align-middle fw-bold">{info.user_name}</span>
                </td>
                <td>{info.phone_number}</td>
                <td>{info.address}</td>
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
                      <DropdownItem href={"/agent/edit/" + info.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, info.id)}>
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
    </>
  )
}

export default ListTable
