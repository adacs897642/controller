import React from 'react';
import {Button, Modal} from "react-bootstrap";
import appState from "../../store/appState";

const PowerOffController = ({show, onHide, store}) => {
    const handleOnSubmit= ()=>{
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'power_off_controller',
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
            <Modal.Body>Выключить контроллер?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="outline-danger" onClick={handleOnSubmit} type={"submit"}>
                    Применить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PowerOffController;