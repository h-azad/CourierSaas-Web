import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash,Search, Edit3  } from "react-feather"
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
import { getApi, ADMIN_ROLE } from "../../../../constants/apiUrls"
import SwalAlert from "../../../../components/SwalAlert"
import SwalConfirm from "../../../../components/SwalConfirm"
import StatusModal from "../../../../components/StatusModal"

const AdminList = () => {
  const [adminRole, setAdminRole] = useState([])
  const MySwal = withReactContent(Swal)


  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {
      useJwt
        .axiosDelete(getApi(ADMIN_ROLE+id+'/'))
        .then((res) => {
          SwalAlert("Deleted Successfully")
        })
        .finally(() => fetchAdminRoleData())
        
      }
    })
   
  }


  useEffect(() => {
    fetchAdminRoleData()
  }, [])

  const fetchAdminRoleData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_ROLE))
      .then((res) => {
        console.log("res", res.data)
        setAdminRole(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <CardText>
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="d-flex align-items-center">
                <Link to={'/admin-role/add'}>
                  <Button.Ripple color="primary">Add adminRole</Button.Ripple>
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex align-items-center ">
                <input
                  placeholder="Search adminRole"
                  name="marchant_name"
                  type="text"
                  class="form-control"
                  // onChange={handleSearch}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminRole &&
            adminRole.map((adminRole) => (
              <tr key={adminRole.id}>
                <td>
                  <span className="align-middle fw-bold">{adminRole?.name}</span>
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
                      <DropdownItem href={"/admin-role/edit/" + adminRole.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, adminRole.id)}>
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

export default AdminList
