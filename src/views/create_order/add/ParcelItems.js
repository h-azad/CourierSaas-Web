import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap"

import { useForm, Controller } from "react-hook-form"


const ParcelItems = ({ parcellItemPropsData }) => {

  const {
    control,
    setError,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  })

  const onSubmit = (data) => {
    parcellItemPropsData.setParcelItems(parcellItemPropsData.parcelItems)
    parcellItemPropsData.next()

    // let isFormValid = true

    // if (!(data.item_details)) {
    //   setError("item_details", {
    //     type: "required",
    //     message: "Item Details is required",
    //   })
    //   isFormValid = false
    // }
    // if (!(data.item_quantity)) {
    //   setError("item_quantity", {
    //     type: "required",
    //     message: "Item Quantiry is required",
    //   })
    //   isFormValid = false
    // }

    // if (!isFormValid) {
    //   return false
    // }

    // if (
    //   data.item_details !== null &&
    //   data.item_quantity !== null

    // ) {

    //   parcellItemPropsData.setParcelItems(data.item_details)
    //   parcellItemPropsData.setItemQuentiry(data.item_quantity)
    //   parcellItemPropsData.next()

    // }
  }


  const addField = () => {
    let filedDummy = [...parcellItemPropsData.parcelItems]
    filedDummy.push({
      'item_details': '',
      'item_quantity': ''
    })

    parcellItemPropsData.setParcelItems(filedDummy)
  }

  const removeField = (index) => {
    const newFields = [...parcellItemPropsData.parcelItems]
    newFields.splice(index, 1)
    parcellItemPropsData.setParcelItems(newFields)
  }

  const handleFieldChange = (value, state, index) => {
    const newFields = [...parcellItemPropsData.parcelItems]
    newFields[index][state] = value
    parcellItemPropsData.setParcelItems(newFields)
  }

  return (

    <Card>
      <CardHeader>
        <CardTitle tag="h4">Parcel Items</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            {parcellItemPropsData.parcelItems.map((item, index) => (
              <>
                <div class="col-lg-5">
                  <div className="mb-1">
                    <Label className="form-label" for="item_details">
                      Item Details*
                    </Label>
                    <Input
                      defaultValue={item?.item_details}
                      placeholder=""
                      onChange={(e) => handleFieldChange(e.target.value, 'item_details', index)}
                      invalid={errors.item_details && true}
                    />
                    {errors && errors.item_details && (
                      <span>{errors.item_details.message}</span>
                    )}
                  </div>
                </div>
                <div class="col-lg-5">
                  <div className="mb-1">
                    <Label className="form-label" for="item_quantity">
                      Item Quantity*
                    </Label>

                    <Input
                      type="number"
                      defaultValue={item.item_quantity}
                      placeholder=""
                      onChange={(e) => handleFieldChange(e.target.value, 'item_quantity', index)}
                      invalid={errors.item_quantity && true}

                    />
                    {errors && errors.item_quantity && (
                      <span>{errors.item_quantity.message}</span>
                    )}
                  </div>
                </div>
                {/* <div className='col-md-2 css flex-between'>
                  <Button className="me-1" color="danger"
                    style={{
                      marginTop: '20px',
                    }}
                    onClick={() => removeField(index)}
                  >
                    Remove
                  </Button>
                </div> */}

              </>

            ))}
            
          </div>
          <div className="d-flex">
            {parcellItemPropsData.currentStep > 0 && (
              <Button className="me-1" color="primary"
                style={{
                  margin: '0 8px',
                }}
                onClick={() => parcellItemPropsData.prev()}
              >
                Previous
              </Button>
            )}

            {parcellItemPropsData.currentStep < parcellItemPropsData?.stepsData?.length - 1 && (
              <Button className="me-1" color="primary" type="submit">
                Next
              </Button>
            )}

            <Button className="me-1" color="info" onClick={addField}>
              Add New
            </Button>

          </div>
        </Form>

      </CardBody>
    </Card>

  )
}
export default ParcelItems