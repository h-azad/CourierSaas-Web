import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Table, Input, Label, Form } from "reactstrap"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { getApi, PERMISSION_LIST, ADMIN_ROLE, ROLE_BASAED_PERMISSION } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

function PermissionList() {
  const [selectedPermissionid, setSelectedPermissionid] = useState([])
  const [permissionData, setPermissionData] = useState([])
  const [adminRoleData, setAdminRoleData] = useState([])
  const [allPermissionSelectStatus, setAllPermissionSelectStatus] = useState(false)
  const {
    control,
    setError,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({

  })



  const fetchPermissionData = () => {
    return useJwt
      .axiosGet(getApi(PERMISSION_LIST))
      .then((res) => {
        setPermissionData(res.data)
      })
      .catch((err) => console.log(err))
  }

  const fetchAdminRoleData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_ROLE))
      .then((res) => {
        let roleData = []
        res.data.map(data => {
          roleData.push({ value: data.id, label: data.name })
        })
        setAdminRoleData(roleData)

      })
      .catch((err) => console.log(err))
  }


  const fetchAdminRolePermissionData = (adminRoleID) => {
    return useJwt
      .axiosGet(getApi(ROLE_BASAED_PERMISSION) + adminRoleID + "/")
      .then((res) => {
        let roleData = []
        res.data.map(data => {
          roleData.push(data.permission)

        })
        setSelectedPermissionid(roleData)

      })
      .catch((err) => console.log(err))
  }



  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "admin_role" && type == "change") {
        fetchAdminRolePermissionData(value?.admin_role?.value)
      }

    })
    return () => subscription.unsubscribe()
  }, [watch])


  useEffect(() => {
    fetchPermissionData()
    fetchAdminRoleData()
    console.log('selectedPermissionid', selectedPermissionid)
  }, [selectedPermissionid])

  const onSubmit = data => {

    let isFormValid = true

    if (!data.admin_role) {
      setError("admin_role", {
        type: "required",
        message: "Admin role is required",
      })
      isFormValid = false
    }

    if (!data.admin_role) {
      setError("admin_role", {
        type: "required",
        message: "Admin role is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.admin_role !== null && selectedPermissionid !== null) {

      let formData = {
        role: data.admin_role.value,
        permissionsID: selectedPermissionid
      }
      const conformPermission = () => {
        return SwalConfirm(`Sets Permission`, "Permission").then(
          function (result) {
            if (result.value) {
              useJwt
                .axiosPost(getApi(ROLE_BASAED_PERMISSION), formData)
                .then((res) => {
                  SwalAlert("Permission Added Successfully")
                  navigate("/permission")
                })
                .catch(err => console.log(err))
              // .finally(() => fetchMerchantsData())
            }
          }
        )
      }
      conformPermission()
    }
  }


  const handleSelectedPermissionId = (permissionId) => {
    const index = selectedPermissionid.indexOf(permissionId)

    if (index === -1) {
      setSelectedPermissionid([...selectedPermissionid, permissionId])
      console.log(' permissionId -1', permissionId)
    } else {
      setSelectedPermissionid(selectedPermissionid.filter(id => id !== permissionId))
      console.log('1', permissionId)
    }
  }


  const groupedData = {}
  permissionData.forEach(item => {
    const { title, id } = item
    if (!groupedData[item.module_name]) {
      groupedData[item.module_name] = { titles: [{ id, title }], id: id, name: item.module_name }
    } else {
      groupedData[item.module_name].titles.push({ id, title })
    }
  })

  const groupedDataArray = Object.values(groupedData)


  const handleSelectedPermissionAllId = () => {
    if (allPermissionSelectStatus === false) {
      let allPermissionArr = []
      permissionData.map(data => {
        allPermissionArr.push(data.id)
      })
      setSelectedPermissionid(allPermissionArr)
      setAllPermissionSelectStatus(true)
    } else {
      setSelectedPermissionid([])
      setAllPermissionSelectStatus(false)
    }

  }


  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card title="Bordered">
            <CardBody>
              <div className="d-flex gap-1">
              <span className="align-middle fw-bold">Checked All</span>
                <Input type='checkbox' checked={permissionData.length === selectedPermissionid.length } onClick={handleSelectedPermissionAllId} id='remember-me' />
              </div>
            </CardBody>
          </Card>

          <Card title="Bordered">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div class="row">
                  <div className='mb-1 col-md-4'>
                    <Label className='form-label' for='admin_role'>
                      Admin Role
                    </Label>
                    <Controller
                      id="admin_role"
                      name="admin_role"
                      control={control}
                      render={({ field }) => <Select
                        isClearable
                        className={classnames('react-select', { 'is-invalid': errors.admin_role && errors.admin_role.value && true })}
                        classNamePrefix='select'
                        options={adminRoleData}
                        {...field}
                      />}
                    />
                    {errors && errors.admin_role && <span className="invalid-feedback">{errors.admin_role.message}</span>}
                  </div>

                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Module Name</th>
                        <th>Permission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedDataArray &&
                        groupedDataArray.map((permission, index) => (
                          <tr key={index}>
                            <td>
                              <span className="align-middle fw-bold">{permission.name}</span>
                            </td>
                            <ul style={{ listStyleType: 'none', padding: 10 }}>
                              {permission.titles.map((data, index_) => (
                                <>
                                  <li key={index_}>
                                    <div className="d-flex gap-1">
                                      <Input type='checkbox'
                                        checked={selectedPermissionid.includes(data.id)}
                                        value={data.id} onClick={(e) => { handleSelectedPermissionId(data.id) }} id='remember-me' />
                                      <span className="align-middle fw-bold">{data.title}</span>
                                    </div>
                                  </li>
                                </>
                              ))}
                            </ul>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div className='d-flex pt-2'>
                    <Button className='me-1' color='primary' type='submit'>
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PermissionList