import React from 'react';
import {Button, Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import './index.css'

const ChangePeriodSendObject = ({show, onHide, store}) => {
    const validationSchema = yup.object().shape({
        time: yup.number().min(60,'Минимальное значение 60').max(1440, 'Максимальное значение 1440').typeError('Должно быть числом').integer().required('Обязательно'),
    })
    const handleOnSubmit = (values) => {
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'change_period',
                    idObj: store.id_obj,
                    values:values
                }
            ))
        }
        else{
            store.setFlagMsg(true)
            console.log('Ошибка передачи данных на сервер. Проверьте соединение и обновите страницу')
            store.setMsg('Ошибка передачи данных на сервер. Проверьте соединение и обновите страницу')
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Период опроса
                </Modal.Title>
            </Modal.Header>
            <Formik initialValues={{
                time: '',
                phone: store.obj_phone
            }}
                    validateOnBlur
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={validationSchema}

            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                    <div>
                        <Modal.Body>
                            <Form>
                                <Form.Control className={"input"} type="text" name={`time`} onChange={handleChange}
                                              onBlur={handleBlur} value={values.time} placeholder={"Введите новый период опроса перехода в минутах"}/>
                                {touched.time && errors.time &&
                                <OverlayTrigger placement="bottom"
                                                overlay={<Tooltip id="tooltip-disabled">Диапазон значений должен быть от 60 до 1440</Tooltip>}>
                                    <div className={`error`}>{errors.time}<span
                                        className="material-icons error__ico">help_outline</span></div>
                                </OverlayTrigger>
                                }
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className={"footer"}>
                            <Button className={"ml-2"} variant={"outline-success"}
                                    disabled={!isValid || !dirty} onClick={handleSubmit}
                                    type={`submit`}>Отправить</Button>
                            <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                        </Modal.Footer>
                    </div>
                }
            </Formik>
        </Modal>
    );
};

export default ChangePeriodSendObject;