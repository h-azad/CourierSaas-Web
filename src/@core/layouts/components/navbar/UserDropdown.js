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
  PROFILE
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
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { apiBaseUrl } from "../../../../configs/apiConfig"

const UserDropdown = () => {

  const { profileData: profileInformation } = useSelector((state) => state.authentication)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [profileInformation, setProfileInformation] = useState({
  //   name: null,
  //   email: null,
  //   role: null,
  //   admin_role: null,
  //   profile_picture: null
  // })

  console.log("profileInformation", profileInformation)

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


  // const fetchProfileData = () => {
  //   return useJwt
  //     .axiosGet(getApi(PROFILE))
  //     .then((res) => {
  //       // setProfileInformation({
  //       //   name: res?.data?.full_name,
  //       //   email: res?.data?.email,
  //       //   profile_picture: res?.data?.profile_picture
  //       // })
  //     })
  //     .catch(err => console.log(err))
  // }

  // const fetchUserData = () => {
  //   return useJwt
  //     .axiosGet(getApi(GET_USER))
  //     .then((res) => {
  //       if(res?.data?.role==null){
  //         console.log('res?.data?', res?.data)
  //         setProfileInformation({
  //           name: res?.data?.name,
  //           email: res?.data?.email,
  //           profile_picture: res?.data?.profile_picture
  //         })
  //       }else{
  //         fetchProfileData()
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }


  // useEffect(() => {
  //   fetchUserData()
  // }, [])

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{profileInformation.name ? profileInformation.name : profileInformation.full_name }</span>
          <span className="user-status">{profileInformation.role ? profileInformation.role : profileInformation.admin_role}</span>
        </div>
        <Avatar
          img={profileInformation.profile_picture ? `${apiBaseUrl}`+profileInformation.profile_picture : Avatar}
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
