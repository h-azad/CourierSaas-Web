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
import { getApi, VOLUMETRIC_POLICY_LIST, VOLUMETRIC_POLICY_DELETE ,SEARCH_VOLUMETRIC_POLICY } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

const ListTable = () => {
  const [volumetricpolicy, setVolumetricPolicy] = useState([])
  const MySwal = withReactContent(Swal)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(VOLUMETRIC_POLICY_DELETE+id+'/'))
        .then((res) => {
          SwalAlert("Deleted Successfully")
        })
        .finally(() => fetchVolumetricPolicyData())
        
      }
    })
   
  }

  useEffect(() => {
    fetchVolumetricPolicyData()
  }, [])

  const fetchVolumetricPolicyData = () => {
    return useJwt
      .axiosGet(getApi(VOLUMETRIC_POLICY_LIST))
      .then((res) => {
        console.log("res", res.data)
        setVolumetricPolicy(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchVolumetricPolicyData = searchTerm => {
    return useJwt
      .axiosGet(getApi(SEARCH_VOLUMETRIC_POLICY)+'?search='+ searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchVolumetricPolicyData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setVolumetricPolicy(data)
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
              <Link to={'/volumetric_policy/add'}>
                <Button.Ripple color="primary">Add Pricing Policy</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Volumetric Policy "
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
      <div class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>Policy Title</th>
              <th>Product Type</th>
              <th>Delivary Charge</th>
              <th>Min Dimention</th>
              <th>Max Dimention</th>
              <th>Max Weight/Kg</th>
              <th>Additional Charge</th>
              <th>Per Dimention</th>
              <th>COD Charge</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volumetricpolicy &&
              volumetricpolicy.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.policy_title}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.product.product_type}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.delivary_charge}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.min_dimention}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.max_dimention}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.max_weight}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.additional_charge}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.per_dimention}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.cod_charge}</span>
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
                        <DropdownItem href={"/volumetric_policy/edit/" + info.id}>
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
      </div>
      
    </>
  )
}

export default ListTable
