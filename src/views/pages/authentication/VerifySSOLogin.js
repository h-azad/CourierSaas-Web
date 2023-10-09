// ** React Imports
//n
import { useContext, useEffect, useState } from 'react'

// import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
//n
import { isUserLoggedIn } from '@utils/'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin, handleLogout } from '@store/authentication'

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

import { Space, Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'


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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    const bearerToken = searchParams.get('bearer')
    const authtoken = searchParams.get('token')

    if (bearerToken && authtoken) {
      ssoVerifyLogin(bearerToken, authtoken)
    }

  }, [])

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

        await dispatch(handleLogin(data))

        toast(t => (
          <ToastContent t={t} role={data.role || 'admin'} name={data.name || 'John Doe'} />
        ))

        navigate(getHomeRouteForLoggedInUser(data.role))

      })
      .catch(err => setErrors(err.response.data.errors.non_field_errors))
  }

  const [error, setErrors] = useState()
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const abilityCtx = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({})
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const dummyAbility = [
    {
      action: 'read',
      subject: 'ACL'
    },
    {
      action: 'read',
      subject: 'Auth'
    }
  ]

  //n
  // useEffect(() => {
  //   if (isUserLoggedIn()) {
  //     navigate('/home')
  //   }
  // }, [])


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
