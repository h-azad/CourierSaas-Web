import AvatarGroup from "@components/avatar-group"
import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import ToastContent from "../../../components/ToastContent"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_LIST, RIDER_DELETE } from "../../../constants/apiUrls"

const ListTable = () => {
  const [rider, setRider] = useState([])

  const deleteAction = (e, id) => {
    e.preventDefault()
    console.log("Deleted", id)

    useJwt
      .axiosDelete(getApi(RIDER_DELETE+id+'/'))
      .then((res) => {
        // console.log("res", res.data)
        toast(t => (
          <ToastContent t={t} message={'Rider Deleted Successfully'} />
        ))
        fetchRiderData()
        // return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchRiderData()
  }, [])

  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_LIST))
      .then((res) => {
        // console.log("res", res.data)
        setRider(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  return (
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
        {rider &&
          rider.map((info) => (
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
                    <DropdownItem href={"/rider/edit/" + info.id}>
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
  )
}

export default ListTable
