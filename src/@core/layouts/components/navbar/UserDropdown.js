// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Actions
import { handleLogout } from "@store/authentication"

// ** Custom Components
import Avatar from "@components/avatar"
import useJwt from '@src/auth/jwt/useJwt'
import {
  getApi,
  GET_USER,
} from "@src/constants/apiUrls"
// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Key
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"

const UserDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInformation, setUserInformation] = useState({
    name: null,
    email: null,
    role: null,
    admin_role: null,
    profile_picture: null
  })

  const submitLogout = async (e) => {
    if (e != undefined) {
      // console.log(e)
      e.preventDefault()
      await dispatch(handleLogout())
      navigate('/login')
      return true
    }
    return false
  }


  const fetchUserData = () => {
    return useJwt
      .axiosGet(getApi(GET_USER))
      .then((res) => {
        console.log("profile_picture", res.data.image[0].profile_picture)
        setUserInformation({
          name: res.data.data.name,
          email: res.data.data.email,
          role: res.data.data.role,
          admin_role: res.data.data.admin_role,
          profile_picture: res?.data?.image[0]?.profile_picture
        })
        // console.log('res.data.profile_picture', res.data.profile_picture)
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{userInformation.name}</span>
          <span className="user-status">{userInformation.role ? userInformation.role : userInformation.admin_role}</span>
        </div>
        <Avatar
          img={userInformation.profile_picture ? "http://localhost:8000/media/"+userInformation.profile_picture : Avatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>

      <DropdownItem tag={Link} onClick={(e) => {
          {
            e.preventDefault(),
              navigate('/profile')
            return true
          }
        }}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem tag={Link} onClick={(e) => {
          {
            e.preventDefault(),
              navigate('/setting/password')
            return true
          }
        }}>
          <Key size={14} className="me-75" />
          <span className="align-middle">Change Password</span>
        </DropdownItem>
        
        {/* 
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem>
        <DropdownItem divider /> */}
        <DropdownItem
        // tag={Link}
        // onClick={(e)=>{{
        //   e.preventDefault()
        //   navigate('/pages/setting')
        //   return true
        // }}}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} onClick={(e) => submitLogout(e)} to="/login">
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
