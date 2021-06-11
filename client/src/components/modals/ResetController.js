import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Info from "./Info";
import appState from "../../store/appState";

const ResetController = ({show, onHide, store}) => {

    const handlerOnSubmit = () => {
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'reset_controller',
                }
            ))
        }
        else{
            appState.setFlagMsg(true)
            console.log('Ошибка передачи данных на сервер. Проверьте соединение и обновите страницу')
            store.setMsg('Ошибка передачи данных на сервер. Проверьте соединение и обновите страницу')
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Управление</Modal.Title>
            </Modal.Header>
            <Modal.Body>Перезагрузить контроллер?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="outline-danger" onClick={handlerOnSubmit} type={"submit"}>
                    Применить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResetController;