// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const AddMerchants = () => {

    const countryOptions = [
        { value: 'bangladesh', label: 'Bangladesh' },
        { value: 'india', label: 'India' },
        { value: 'pakistan', label: 'Pakistan' }
      ]
      
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Merchant</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                First Name
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Last Name
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                City
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Country
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                defaultValue={countryOptions[0]}
                name='clear'
                options={countryOptions}
                isClearable
                />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Email
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='Email' />
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset'>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AddMerchants
