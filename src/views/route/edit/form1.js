import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Label, Card, CardHeader, CardTitle, CardBody, Button, Form } from "reactstrap"
import { Space, TimePicker } from 'antd'
import { GoogleMap, Marker } from '@react-google-maps/api'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import googleKey from "@src/configs/google_key"

export default function Form1({ setCoordinate, routeData, setStarTime, setTitle, setStartLocation, next }) {
  const [map, setMap] = useState(null)
  // const { setError, handleSubmit, control, formState: { errors } } = useForm()
  const [value, setValueMap] = useState(null)
  const { setError, setValue, handleSubmit, control, formState: { errors } } = useForm()

  const onChange = (time, timeString) => {
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

    if (data.start_time !== null && data.route_title !== null && data.start_location !== null) {
      setTitle(data.route_title)
      setStartLocation(value.label)
      console.log('map value', map)
      setCoordinate(JSON.stringify(map))
      next()
    }

  }


  useEffect(() => {
    if (routeData) {
      setValue('start_time', routeData?.start_time)
      setValue('route_title', routeData?.title)
      setValue('start_location', routeData?.start_location)
    }
  }, [routeData])

  useEffect(() => {
    if (value) {
      geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('Successfully got latitude and longitude', { lat, lng })
          setMap({ lat, lng })
        })
    }
  }, [value])

  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div className='col-md-6'>
              <div className='mb-1'>
                <Label className='form-label' for='start_time'>
                  Start Time
                </Label>
                <br />
                <TimePicker className='col-lg-12 col-md-12 col-sm-12 col-' name='start_time' required={true} use12Hours format="h:mm A" onChange={onChange} />
                {errors && errors.start_time && <span className="invalid-feedback">{errors.start_time.message}</span>}
              </div>
            </div>
            <div class="col-md-6">
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
              {/* </div> */}
            </div>
          </div>
          <div class="row">
            <div className='col-md-6'>
              <Label className='form-label' for='route_title'>
                Start Location
              </Label>
              <GooglePlacesAutocomplete
                apiKey={googleKey}
                selectProps={{
                  value,
                  onChange: setValueMap,
                  isClearable: true,
                  // placeholder: "Mirpur DOHS, Dhaka, Bangladesh",
                  // defaultInputValue: 'Bangladesh'
                }}
              />
              <div className='d-flex mt-2'>
                <Button className='me-1' color='primary' type='submit'>
                  Next
                </Button>
              </div>
            </div>
            <div className='col-md-6'>
              {map && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={map}
                  zoom={15}
                >
                  { /* Child components, such as markers, info windows, etc. */}
                  <Marker
                    position={map}
                    // label={value.value.structured_formatting.main_text}
                    animation="bounce"
                  />
                </GoogleMap>
              )}
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>

  )
}