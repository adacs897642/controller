import React from 'react'
import {Modal} from 'react-bootstrap'
import './index.css'

const Info = ({show, onHide, msg}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Информация
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{msg}</p>
            </Modal.Body>
            <Modal.Footer  className={"footer"}>
                <button className={"btn btn-outline-danger"} onClick={onHide}>Закрыть</button>
            </Modal.Footer>


        </Modal>
    )
}

export default Info;