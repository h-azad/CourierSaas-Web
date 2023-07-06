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
import { getApi, ACCOUNT_WALLET_LIST, ACCOUNT_WALLET_DELETE,ACCOUNT_WALLET_SEARCH } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

const ListTable = () => {
  const [accountWallet, setAccountWallet] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(ACCOUNT_WALLET_DELETE+id+'/'))
        .then((res) => {
          // console.log("res", res.data)
          SwalAlert("Deleted Successfully")
          
          // return res.data
        })
        .finally(() => fetchAccountWalletData())
        
      }
    })
   
  }
  

  const updateStatusAction = (e) => {
  e.preventDefault()
  useJwt
    .axiosPatch(getApi(ACCOUNT_WALLET_UPDATE_STATUS) + selectedInfo.id + "/", {
      status: selectedStatus,
    })
    .then((res) => {
      setStatusModalState(false)
    })
}



  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    // setSelectedStatus(info.status)
    // setSelectedInfo(info)
  }

  useEffect(() => {
    fetchAccountWalletData()
    console.log('accountWallet', accountWallet)
  }, [])

  useEffect(() => {
    if(!statusModalState) {
      clearData()
    }
    fetchAccountWalletData()
  }, [statusModalState])

  const fetchAccountWalletData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST))
      .then((res) => {
        console.log("res", res.data)
        setAccountWallet(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchAccountWalletData = searchTerm => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_SEARCH)+'?search='+ searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchAccountWalletData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setAccountWallet(data)
          }else{
            console.log("No data")
          }
        })
    }else{
      fetchAccountWalletData()
    }
    
  }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

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
                <Link to={'/account-wallet/add'}>
                  <Button.Ripple color="primary">Add Account Wallet</Button.Ripple>
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Account Wallet"
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
            <th>User Name</th>
            <th>User Role</th>
            <th>Balance</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {accountWallet &&
            accountWallet.map((wallet) => (
              <tr key={wallet.id}>
                <td>
                  <span className="align-middle fw-bold">{wallet?.account_name}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet?.account_role}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet?.balance}</span>
                </td>
                {/* <td>
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
                      <DropdownItem href={"/account-wallet/edit/" + wallet.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, wallet.id)}>
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>changeStatusAction(e, wallet)}>
                        <Edit3 className="me-50" size={15} />{" "}
                        <span className="align-middle">Change Status</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td> */}
              </tr>
            ))}
        </tbody>
      </Table>
      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Account Wallet Status"}
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
          
        </div>
      </StatusModal>
    </>
  )
}

export default ListTable
