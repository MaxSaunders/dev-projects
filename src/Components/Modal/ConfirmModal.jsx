import { useEffect, useRef, useState } from "react"
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap"
import PropTypes from 'prop-types'

const ConfirmModal = ({ action, show, setShow, message }) => {
    if (!show) {
        return (
            <></>
        )
    }

    return (
        <Modal centered show style={{ display: 'block' }}>
            <ModalHeader className='justify-content-center'>
                <div className='text-dark my-4 fs-3'>{message || 'Confirm this action'}</div>
            </ModalHeader>
            <ModalBody>
                <div className='d-flex w-100' style={{ justifyContent: 'space-between' }}>
                    <Button className='w-25 btn-danger' onClick={() => setShow(false)}>Cancel</Button>
                    <Button className='w-25 btn-primary' onClick={action}>Confirm</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    action: PropTypes.func,
    setShow: PropTypes.func,
    show: PropTypes.bool,
    message: PropTypes.string
}

const UseConfirmModal = (action, message = '') => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current) {
                if (buttonRef.current.contains(event.target)) {
                    setShow(true)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [setShow, buttonRef]);

    const Modal = <ConfirmModal show={show} action={action} setShow={setShow} message={message} />

    return {
        buttonRef,
        Modal
    }
}

UseConfirmModal.propTypes = {
    action: PropTypes.func
}

export default UseConfirmModal
