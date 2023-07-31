import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3 } from "react-feather"
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
import { getApi, ROUTE, AREAS_SEARCH } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"
import { Descriptions } from 'antd'

const ListTable = () => {
  const [route, setRoute] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()
    // console.log("Deleted", id)
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(ROUTE + id + '/'))
          .then((res) => {
            // console.log("res", res.data)
            SwalAlert("Deleted Successfully")

            // return res.data
          })
          .finally(() => fetchAreasData())

      }
    })

  }


  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(ROUTE) + selectedInfo.id + "/", {
        status: selectedStatus,
      })
      .then((res) => {
        setStatusModalState(false)
      })
  }





  useEffect(() => {
    fetchAreasData()
  }, [])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchAreasData()
  }, [statusModalState])

  const fetchAreasData = () => {
    return useJwt
      .axiosGet(getApi(ROUTE))
      .then((res) => {
        console.log("res", res.data)
        setRoute(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchAreaData = searchTerm => {
    return useJwt
      .axiosGet(getApi(AREAS_SEARCH) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchAreaData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setRoute(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchAreasData()
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
              <Link to={'/route/add'}>
                <Button.Ripple color="primary">Add Route</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Route"
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
          {/* <tr>
            <th>Route Title</th>
          </tr> */}
        </thead>
        <tbody>
          {route &&
            route.map((info) => (
              <tr key={info.id}>
                <td>
                  <Descriptions>
                    <Descriptions.Item label="Title">{info.title}</Descriptions.Item>
                    <Descriptions.Item label="Start Time">{info.start_time}</Descriptions.Item>
                    <Descriptions.Item label="Start Location">{info.start_location}</Descriptions.Item>
                    <Descriptions.Item label="Areas">
                      {info.area}
                    </Descriptions.Item>
                  </Descriptions>
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
                      <DropdownItem href={"/route/edit/" + info.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
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
