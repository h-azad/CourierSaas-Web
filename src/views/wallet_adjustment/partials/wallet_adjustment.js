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
import { getApi, ADJUSTMENT_LIST, MARCHANT_ORDER_STATUS_UPDATE, CREATE_ORDER_DELETE, SEARCH_CREATE_ORDER } from "../../../constants/apiUrls"

import SwalAlert from "../../../components/SwalAlert"

import SwalConfirm from "../../../components/SwalConfirm"
// import ChangeStatusModal from "../../../../components/merchant_views/order/ChangeStatusModal"


const WalletAdjustment = () => {
  const [adjustmentData, setAdjustmentData] = useState([])
  console.log("adjustmentData", adjustmentData)
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(ADJUSTMENT_LIST + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchAdjustmentData())

      }
    })

  }


  const defaultAddress = (e, info) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(ADJUSTMENT_LIST + info.id + '/'), {
        id: info.id
      })
      .then((res) => {
        // SwalConfirm("Default Address Set")
        fetchAdjustmentData()
      })
  }

  useEffect(() => {
    fetchAdjustmentData()
  }, [])

  const fetchAdjustmentData = () => {
    return useJwt
      .axiosGet(getApi(ADJUSTMENT_LIST))
      .then((res) => {
        console.log("res", res.data)
        setAdjustmentData(res.data)
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
              <Link to={'/wallet-adjustment/add'}>
                <Button.Ripple color="primary">Adjustment Wallet</Button.Ripple>
              </Link>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Marchant</th>
              <th>Receiver Admin</th>
              <th>Adjust Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adjustmentData &&
              adjustmentData.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.created_at}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.username}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.receiver}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.adjust_amount}</span>
                  </td>                
                  <td>
                    {/* <UncontrolledDropdown>
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href={"/wallet-adjustment/edit/" + info.id}>
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
                    </UncontrolledDropdown> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
{/* 
        <ChangeStatusModal
          statusModalState={statusModalState}
          setStatusModalState={setStatusModalState}
          orderInfo={selectedInfo}
          fetchAdjustmentData={fetchAdjustmentData}
        /> */}

      </div>

    </>
  )
}

export default WalletAdjustment
