// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col,  } from 'reactstrap'

// ** Demo Components
import ProfileAbout from './ProfileAbout'
import ProfileHeader from './ProfileHeader'

// ** Styles
import '@styles/react/pages/page-profile.scss'

import useJwt from "@src/auth/jwt/useJwt"
import { getApi, PROFILE } from "@src/constants/apiUrls"

const Profile = () => {
  // ** States
  const [data, setData] = useState(null)

  const fetchProfileData = () => {
    return useJwt
      .axiosGet(getApi(PROFILE))
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchProfileData()
  }, [])
  return (
    <Fragment>
      {data !== null ? (
        <div id='user-profile'>
          <Row>
            <Col  sm='12'>
              <ProfileHeader />
            </Col>
          </Row>
          <section id='profile-info'>
            <Row>
              <Col sm='12'>
              <ProfileAbout data={data} />
              </Col>
            </Row>
          </section>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Profile
