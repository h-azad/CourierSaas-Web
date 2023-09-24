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
  const [fields, setFields] = useState([])
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
    let isFormValid = true

    if (!(data.item_details)) {
      setError("item_details", {
        type: "required",
        message: "Item Details is required",
      })
      isFormValid = false
    }
    if (!(data.item_quantity)) {
      setError("item_quantity", {
        type: "required",
        message: "Item Quantiry is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (
      data.item_details !== null &&
      data.item_quantity !== null

    ) {

      parcellItemPropsData.setProductDetails(data.item_details)
      parcellItemPropsData.setItemQuentiry(data.item_quantity)
      parcellItemPropsData.next()

    }
  }


  const addField = () => {
    setFields([...fields, ''])
  }

  const removeField = (index) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  const handleFieldChange = (value, index) => {
    const newFields = [...fields]
    newFields[index] = value
    setFields(newFields)
  }

  return (

    <Card>
      <CardHeader>
        <CardTitle tag="h4">Parcel Items</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="item_details">
                  Item Details*
                </Label>
                <Controller
                  defaultValue={parcellItemPropsData?.productDetails}
                  control={control}
                  id="item_details"
                  name="item_details"
                  render={({ field }) => (
                    <Input
                      placeholder=""
                      invalid={errors.item_details && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.item_details && (
                  <span>{errors.item_details.message}</span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="item_quantity">
                  Item Quantity*
                </Label>
                <Controller
                  defaultValue={parcellItemPropsData?.itemQuentity}
                  control={control}
                  id="item_quantity"
                  name="item_quantity"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder=""
                      invalid={errors.item_quantity && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.item_quantity && (
                  <span>{errors.item_quantity.message}</span>
                )}
              </div>
            </div>
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
          </div>
        </Form>


        {/* <div>
          <button onClick={addField}>Add Field</button>
          {fields.map((field, index) => (
            <div key={index}>
              <input
                type="text"
                value={field}
                onChange={(e) => handleFieldChange(e.target.value, index)}
              />
              <button onClick={() => removeField(index)}>Remove</button>
            </div>
          ))}
        </div> */}
        
      </CardBody>
    </Card>

  )
}
export default ParcelItems