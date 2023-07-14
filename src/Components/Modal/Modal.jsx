import { Modal as RBSModal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap"
import PropTypes from 'prop-types'

export const CustomModal = ({ header, body, footer, headerClassName, bodyClassName, footerClassName, modalClassName }) =>
    <div className={modalClassName}>
        {header &&
            <div className={headerClassName}>
                {header}
            </div>
        }
        {body &&
            <div className={bodyClassName}>
                {body}
            </div>
        }
        {footer &&
            <div className={footerClassName}>
                {footer}
            </div>
        }
    </div>

CustomModal.propTypes = {
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    modalClassName: PropTypes.string,
}

const Modal = ({ header, body, footer, headerClassName, bodyClassName, footerClassName, modalClassName, onClose }) =>
    <RBSModal
        onHide={onClose}
        centered
        show
        style={{ display: 'block' }}
        className={modalClassName}
    >
        {header &&
            <ModalHeader className={headerClassName}>
                {header}
            </ModalHeader>
        }
        {body &&
            <ModalBody className={bodyClassName}>
                {body}
            </ModalBody>
        }
        {footer &&
            <ModalFooter className={footerClassName}>
                {footer}
            </ModalFooter>
        }
    </RBSModal>

Modal.propTypes = {
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    onClose: PropTypes.func,
}

export default Modal
