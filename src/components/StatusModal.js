// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const StatusModal = ({ statusModalState, setStatusModalState, updateStatusAction, title, children }) => {
  
  return (
    <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
      <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={updateStatusAction}>Update</Button>
      </ModalFooter>
    </Modal>
  )
}
export default StatusModal
