import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Card, CardHeader, CardTitle, CardBody, Button, Form } from "reactstrap"
import { Space, TimePicker } from 'antd'


export default function Form1({ setStarTime, setTitle, setStartLocation, next }) {
  const { handleSubmit, control, formState: { errors } } = useForm()
  
  const onChange = (time, timeString) => {
    // console.log('time',time, 'time string',timeString)
    setStarTime(timeString)
  }

  const onSubmit = data => {

    let isFormValid = true

    if (!data.start_time) {
      setError('start_time', { type: 'required', message: 'start_time is required' })
      isFormValid = false
    }
    if (!data.route_title) {
      setError('route_title', { type: 'required', message: ' route_title is required' })
      isFormValid = false
    }

    if (!data.start_location) {
      setError('start_location', { type: 'required', message: ' start_location is required' })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.start_time !== null && data.route_title !== null && data.start_location !== null) {
      setTitle(data.route_title)
      console.log('data.start_time', data.start_time)
      setStartLocation(data.start_location)
      next()
    }

  }

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div className='col-md-12'>
              <div className='mb-1'>
                <Label className='form-label' for='start_time'>
                  Start Time
                </Label>
                <br />
                <TimePicker name='start_time' required={true} use12Hours format="h:mm A" onChange={onChange} />
                {errors && errors.start_time && <span className="invalid-feedback">{errors.start_time.message}</span>}
              </div>
              <div class="col-md-12">
                <div className='mb-1'>
                  <Label className='form-label' for='route_title'>
                    Route Title
                  </Label>
                  <Controller
                    control={control}
                    id='route_title'
                    name='route_title'
                    render={({ field }) => (
                      <Input
                        required={true}
                        type='text'
                        placeholder='Route No..1'
                        invalid={errors.route_title && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.route_title && <span className="invalid-feedback">{errors.route_title.message}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='start_location'>
              Start Location
            </Label>
            <Controller
              
              control={control}
              id='start_location'
              name='start_location'
              render={({ field }) => <Input required={true} placeholder='Mirpur DOSH, Mirpur, Dhaka, Bangladesh' invalid={errors.start_location && true} {...field} />}
            />
            {errors && errors.start_location && <span className="invalid-feedback">{errors.start_location.message}</span>}
          </div>
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Next
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>

  )
}