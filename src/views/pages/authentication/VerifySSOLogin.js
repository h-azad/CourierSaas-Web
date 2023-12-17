// ** React Imports
//n
import { useContext, useEffect } from 'react'

// import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

// ** Custom Hooks


// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Coffee, X } from 'react-feather'

// ** Actions
// import { handleLogin, handleLogout } from '@store/authentication'
import { handleLogin, handleProfileData, handleApplicationData, handleLogout } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import axios from 'axios'

import { Spin } from 'antd'

import {
  getApi,
  GET_USER,
  PROFILE,
  APPLICATION_SETTING
} from "@src/constants/apiUrls"

import { isUserLoggedIn } from '@utils/'


const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}


const VerifySSOLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const abilityCtx = useContext(AbilityContext)

  const fetchApplicationData = () => {
    console.log('fetchApplicationData')
    return useJwt
      .axiosGet(getApi(APPLICATION_SETTING))
      .then((res) => {
        if (res?.data.length > 0) {
          console.log('application data', res?.data)
          dispatch(handleApplicationData(res?.data[0]))
        } else {
          return true
        }
      })
      .catch(err => console.log(err))
  }


  const fetchProfileData = () => {
    console.log('fetchProfileData')
    return useJwt
      .axiosGet(getApi(PROFILE))
      .then((res) => {
        console.log('profile', res?.data)
        dispatch(handleProfileData(res?.data))
      })
      .catch(err => console.log(err))
  }

  const fetchUserData = () => {
    return useJwt
      .axiosGet(getApi(GET_USER))
      .then((res) => {
        console.log('response user', res?.data)
        if (res?.data?.role == null) {
          dispatch(handleProfileData(res?.data))
        } else {
          fetchProfileData()
        }
      })
      .catch(err => { console.log(err), console.log('error response user') })
  }

  const ssoVerifyLogin = async (bearerToken, authtoken) => {
    localStorage.removeItem('domainName')

    await dispatch(handleLogout())

    axios
      .post("http://localhost:8000/api/user/verify_sso/", {
        token: authtoken
      }, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      })
      .then(async (res) => {
        const data = { ...res.data.info, accessToken: res.data.token.access, refreshToken: res.data.token.refresh }
        abilityCtx.update(res.data.info.ability)

        localStorage.setItem('domainName', res.data?.settings?.api_domain)

        // await dispatch(handleLogin(data))
        dispatch(handleLogin(data))

        abilityCtx.update(res.data.info.ability)
        navigate(getHomeRouteForLoggedInUser(data))
        fetchUserData()
        fetchApplicationData()

        toast(t => (
          <ToastContent t={t} role={data.role || 'admin'} name={data.name || 'John Doe'} />
        ))

        

        // navigate(getHomeRouteForLoggedInUser(data.role))

      })
      .catch(err => console.log(err?.response?.data?.errors?.non_field_errors))
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    const bearerToken = searchParams.get('bearer')
    const authtoken = searchParams.get('token')

    if (bearerToken && authtoken) {
      ssoVerifyLogin(bearerToken, authtoken)
    }

  }, [])





  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Spin tip="User Verification Loading ...." size="large">
          <div className="content" />
        </Spin>
      </Row>
    </div>
  )
}

export default VerifySSOLogin
