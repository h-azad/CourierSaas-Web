
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


const RecipientInfo = ({ recipienInfoPropsData }) => {
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  })


  const onSubmit = (data) => {
    let isFormValid = true

    if (!data.recipient_name) {
      setError("recipient_name", {
        type: "required",
        message: "Recipient Name is required",
      })
      isFormValid = false
    }
    if (!data.phone_number) {
      setError("phone_number", {
        type: "required",
        message: "Phone Number is required",
      })
      isFormValid = false
    }
    if (!data.delivary_address) {
      setError("delivary_address", {
        type: "required",
        message: "Delivary Address is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (
      data.recipient_name !== null &&
      data.phone_number !== null &&
      data.delivary_address
    ) {

      recipienInfoPropsData.setRecipientName(data.recipient_name)
      recipienInfoPropsData.setPhoneNumber(data.phone_number)
      recipienInfoPropsData.setDelivaryAddress(data.delivary_address)
      recipienInfoPropsData.next()

    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Recipient Info</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="recipient_name">
                  Recipient Name*
                </Label>
                <Controller
                  defaultValue={recipienInfoPropsData?.recipientName}
                  control={control}
                  id="recipient_name"
                  name="recipient_name"
                  render={({ field }) => (
                    <Input
                      placeholder=""
                      invalid={errors.recipient_name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.recipient_name && (
                  <span>{errors.recipient_name.message}</span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="phone_number">
                  Phone Number*
                </Label>
                <Controller
                  defaultValue={recipienInfoPropsData?.phoneNumber}
                  control={control}
                  id="phone_number"
                  name="phone_number"
                  render={({ field }) => (
                    <Input
                      type="number"
                      min={0}
                      placeholder=""
                      invalid={errors.phone_number && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone_number && (
                  <span>{errors.phone_number.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="delivary_address">
              Delivary Address*
            </Label>
            <Controller
              defaultValue={recipienInfoPropsData?.delivaryAddress}
              control={control}
              id="delivary_address"
              name="delivary_address"
              render={({ field }) => (
                <Input
                  placeholder=""
                  invalid={errors.delivary_address && true}
                  {...field}
                />
              )}
            />
            {errors && errors.delivary_address && (
              <span>{errors.delivary_address.message}</span>
            )}
          </div>
          <div className="d-flex">
            {recipienInfoPropsData.currentStep < recipienInfoPropsData?.stepsData?.length - 1 && (
              <Button className="me-1" color="primary" type="submit">
                Next
              </Button>
            )}
          </div>

        </Form>
      </CardBody>
    </Card>
  )
}
export default RecipientInfo
