import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash,Search } from "react-feather"
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
import { getApi, SERVICE_TYPE_LIST, SERVICE_TYPE_DELETE,SEARCH_SERVICE } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

const ListTable = () => {
  const [service, setService] = useState([])
  const MySwal = withReactContent(Swal)

  const deleteAction = (e, id) => {
    e.preventDefault()
    // console.log("Deleted", id)

    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(SERVICE_TYPE_DELETE+id+'/'))
        .then((res) => {
          // console.log("res", res.data)
          SwalAlert("Deleted Successfully")
          
          // return res.data
        })
        .finally(() => fetchServiceTypeData())
        
      }
    })
   
  }

  useEffect(() => {
    fetchServiceTypeData()
  }, [])

  const fetchServiceTypeData = () => {
    return useJwt
      .axiosGet(getApi(SERVICE_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        setService(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchServiceData = searchTerm => {
    return useJwt
      .axiosGet(getApi(SEARCH_SERVICE)+'?search='+ searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 2) {
      fetchSearchServiceData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setService(data)
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
                <Link to={'/service_type/add'}>
                  <Button.Ripple color="primary">Add Service Type</Button.Ripple>
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Service"
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
            <th>Service Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {service &&
            service.map((info) => (
              <tr key={info.id}>
                <td>
                  <span className="align-middle fw-bold">{info.service_type}</span>
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
                      <DropdownItem href={"/service_type/edit/" + info.id}>
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
