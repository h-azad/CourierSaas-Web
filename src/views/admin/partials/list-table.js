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
import { getApi, ADMIN_LIST, ADMIN_DELETE } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

const AdminList = () => {
  const [admin, setAdmin] = useState([])
  const MySwal = withReactContent(Swal)


  const deleteAction = (e, id) => {
    console.log('id is ', id)
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(ADMIN_DELETE+id+'/'))
        .then((res) => {
          // console.log("res", res.data)
          SwalAlert("Deleted Successfully")
          
          // return res.data
        })
        .finally(() => fetchadminData())
        
      }
    })
   
  }


  useEffect(() => {
    fetchadminData()
  }, [])

  const fetchadminData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_LIST))
      .then((res) => {
        console.log("res", res.data)
        setAdmin(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  // const fetchSearchadminData = searchTerm => {
  //   return useJwt
  //     .axiosGet(getApi(ACCOUNT_WALLET_SEARCH)+'?search='+ searchTerm)
  //     .then((res) => {
  //       return res.data
  //     })
  //     .catch((err) => console.log(err))
  // }

  // const handleSearch = debounce(e => {
  //   console.log(e.target.value)
  //   const searchTerm = e.target.value
  //   if (searchTerm.length > 0) {
  //     fetchSearchadminData(searchTerm)
  //       .then(data => {
  //         if (data?.length > 0) {
  //           console.log('res', data)
  //           setAdmin(data)
  //         }else{
  //           console.log("No data")
  //         }
  //       })
  //   }else{
  //     fetchadminData()
  //   }
    
  // }, 300)



  return (
    <>
      <CardText>
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="d-flex align-items-center">
                <Link to={'/admin/add'}>
                  <Button.Ripple color="primary">Add Admin</Button.Ripple>
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              {/* <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Admin"
                  name="marchant_name"
                  type="text"
                  class="form-control"
                  // onChange={handleSearch}
                />
                <Button.Ripple className="btn-icon ms-1" outline color="primary">
                  <Search size={16} />
                </Button.Ripple>
              </div> */}
            </div>
          </div>
        </CardText>
      <Table bordered>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Admin Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admin &&
            admin.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <span className="align-middle fw-bold">{admin?.name}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{admin?.email}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{admin?.admin_role?.name}</span>
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
                      <DropdownItem href={"/admin/edit/" + admin.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, admin.id)}>
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
