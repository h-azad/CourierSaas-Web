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
import { getApi, MARCHANT_PICKUP_ADDRESS, MARCHANT_ORDER_STATUS_UPDATE, CREATE_ORDER_DELETE, SEARCH_CREATE_ORDER } from "../../../../constants/apiUrls"
import SwalAlert from "../../../../components/SwalAlert"
import SwalConfirm from "../../../../components/SwalConfirm"
import StatusModal from "../../../../components/StatusModal"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import Select from "react-select"
import ChangeStatusModal from "../../../../components/merchant_views/order/ChangeStatusModal"

const MarchantPickupAddressList = () => {
  const [pickupAddressData, setPickupAddressData] = useState([])
  console.log("pickupAddressData", pickupAddressData)
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(MARCHANT_PICKUP_ADDRESS + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchPickupAddressData())

      }
    })

  }


  const defaultAddress = (e, info) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(MARCHANT_PICKUP_ADDRESS + info.id + '/'), {
        id: info.id
      })
      .then((res) => {
        // SwalConfirm("Default Address Set")
        fetchPickupAddressData()
      })
  }

  useEffect(() => {
    fetchPickupAddressData()
  }, [])

  const fetchPickupAddressData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_PICKUP_ADDRESS))
      .then((res) => {
        console.log("res", res.data)
        setPickupAddressData(res.data)
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
              <Link to={'/marchant-pickup-address/add'}>
                <Button.Ripple color="primary">Add Pickup Address</Button.Ripple>
              </Link>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>City</th>
              <th>Area</th>
              <th>Street Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pickupAddressData &&
              pickupAddressData.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.city.city_name}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.area.area_name}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.street_address}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.phone}</span>
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
                        <DropdownItem href={"/marchant-pickup-address/edit/" + info.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => defaultAddress(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Default</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <ChangeStatusModal
          statusModalState={statusModalState}
          setStatusModalState={setStatusModalState}
          orderInfo={selectedInfo}
          fetchPickupAddressData={fetchPickupAddressData}
        />

      </div>

    </>
  )
}

export default MarchantPickupAddressList
