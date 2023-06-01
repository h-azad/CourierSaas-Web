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

import SwalAlert from "../../../../components/SwalAlert"
import StatusModal from "../../../../components/StatusModal"
import SwalConfirm from "../../../../components/SwalConfirm"
import { getApi, WITHDRAW_REQUEST_LIST, WITHDRAW_REQUEST_DELETE, WITHDRAW_REQUEST_SEARCH, WITHDRAW_REQUEST_UPDATE_STATUS } from "../../../../constants/apiUrls"

const MarchantBalanceWithrawRequestList = () => {
  const [withdrawRequest, setWithdrawRequest] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)
  console.log('withdrawRequest', withdrawRequest)
  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(WITHDRAW_REQUEST_DELETE + id + '/'))
          .then((res) => {
            // console.log("res", res.data)
            SwalAlert("Deleted Successfully")

            // return res.data
          })
          .finally(() => fetchWithdrawRequesttData())

      }
    })

  }


  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(WITHDRAW_REQUEST_UPDATE_STATUS) + selectedInfo.id + "/", {
        withdraw_status: selectedStatus, info: selectedInfo
      })
      .then((res) => {
        setStatusModalState(false)
      })
  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.withdraw_status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchWithdrawRequesttData()
  }, [])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchWithdrawRequesttData()
  }, [statusModalState])

  const fetchWithdrawRequesttData = () => {
    return useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_LIST))
      .then((res) => {
        console.log("res", res.data)
        setWithdrawRequest(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchWithdrawRequestData = searchTerm => {
    return useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_SEARCH) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchWithdrawRequestData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setWithdrawRequest(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchWithdrawRequesttData()
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
              <Link to={'/marchant-withdraw-request/add'}>
                <Button.Ripple color="primary">Add Withdraw Request</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Withdraw Request"
                name="marchant_name"
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
            <th>Marchant Name</th>
            <th>Previous Balance</th>
            <th>Withdraw Balance</th>
            <th>Current Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawRequest &&
            withdrawRequest.map((wallet) => (
              <tr key={wallet.id}>
                <td>
                  <span className="align-middle fw-bold">{wallet?.account_wallet?.marchant?.full_name}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.balance}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.withdraw_balance}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.current_balance}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.withdraw_status
                  }</span>
                </td>
                {wallet.withdraw_status ==="Pending" &&
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
                      <DropdownItem href="/" onClick={e => changeStatusAction(e, wallet)}>
                        <Edit3 className="me-50" size={15} />{" "}
                        <span className="align-middle">Cancel</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>}

              </tr>
            ))}
        </tbody>
      </Table>
      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Withdraw Request Status"}
      >
        <div className='form-check'>
          <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "Cancel" ? true : false} onChange={() => setSelectedStatus("Cancel")} />
          <Label className='form-check-label' for='ex1-inactive'>
            Cancel
          </Label>
        </div>
      </StatusModal>
    </>
  )
}

export default MarchantBalanceWithrawRequestList
