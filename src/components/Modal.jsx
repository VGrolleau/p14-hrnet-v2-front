import '../utils/style/Modal.css';

function Modal(props) {
    const toggleModal = props.toggleModal;
    const textModal = props.textModal;

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <p>
                        {textModal}
                    </p>
                    <button onClick={toggleModal} className="close-modal">
                        X
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;