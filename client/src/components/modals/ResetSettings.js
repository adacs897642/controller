import React from 'react';
import {Button, Modal} from "react-bootstrap";
import appState from "../../store/appState";

const ResetSettings = ({show, onHide, store}) => {
    const handleOnSubmit= ()=>{
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'reset_settings',
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
            <Modal.Body>Установить заводские настройки?</Modal.Body>
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

export default ResetSettings;