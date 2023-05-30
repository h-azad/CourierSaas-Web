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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRICING_POLICY_LIST, PRICING_POLICY_DELETE, SEARCH_PRICING_POLICY, PRICING_POLICY_UPDATE_STATUS } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

const ListTable = () => {
  const [pricingpolicy, setPricingPolicy] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(PRICING_POLICY_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchPricingPolicyData())

      }
    })

  }

  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(PRICING_POLICY_UPDATE_STATUS) + selectedInfo.id + "/", {
        status: selectedStatus,
      })
      .then((res) => {
        setStatusModalState(false)
      })
  }



  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchPricingPolicyData()
  }, [])

  const fetchPricingPolicyData = () => {
    return useJwt
      .axiosGet(getApi(PRICING_POLICY_LIST))
      .then((res) => {
        console.log("res", res.data)
        setPricingPolicy(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchPricingPolicyData()
  }, [statusModalState])

  const fetchSearchPricingPolicyData = searchTerm => {
    return useJwt
      .axiosGet(getApi(SEARCH_PRICING_POLICY) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchPricingPolicyData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setPricingPolicy(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchPricingPolicyData()
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
              <Link to={'/pricing_policy/add'}>
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
              {/* <th>Min Dimention</th>
              <th>Max Dimention</th>
              <th>Max Weight/Kg</th>
              <th>Additional Charge</th>
              <th>Per Dimention</th>
              <th>COD Charge</th> */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pricingpolicy &&
              pricingpolicy.map((info) => (
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
                  {/* <td>
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
                  </td> */}
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
                        <DropdownItem href={"/pricing_policy/view/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">View</span>
                        </DropdownItem>
                        <DropdownItem href={"/pricing_policy/edit/" + info.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
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
        <StatusModal
          statusModalState={statusModalState}
          setStatusModalState={setStatusModalState}
          updateStatusAction={updateStatusAction}
          title={"Change Pricing Policy Status"}
        >
          <div className='demo-inline-spacing'>
            <div className='form-check'>
              <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "active" ? true : false} onChange={() => setSelectedStatus("active")} />
              <Label className='form-check-label' for='ex1-active'>
                Active
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
      </div>

    </>
  )
}

export default ListTable
