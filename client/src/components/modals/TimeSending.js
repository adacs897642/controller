import React from 'react';
import {Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Formik} from 'formik'
import * as yup from 'yup'
import './index.css'
import appState from "../../store/appState";

const TimeSending = ({show, onHide, store}) => {
    const phoneRegExp = /^((\+79|79|89)+([0-9]){9})$/

    const validationSchema = yup.object().shape({
        phoneNumber: yup.string().typeError('Должно быть строкой').matches(phoneRegExp, 'Неправильный номер телефона').required('Обязательно'),
        time: yup.number().min(6,'Минимальное значение 6 часов').max(168, 'Максимальное значение 168 часов').typeError('Должно быть числом').integer().required('Обязательно'),
    })
    const handleOnSubmit = (values) => {
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'time_send',
                    idObj: store.id_obj,
                    values:values
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
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Параметры рассылки
                </Modal.Title>
            </Modal.Header>
            <Formik initialValues={{
                phoneNumber: '',
                time: ''
            }}
                    validateOnBlur
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={validationSchema}
            >
                {({values, errors, touched,
                      handleChange, handleBlur,
                      isValid, handleSubmit, dirty}) =>
                    <div>
                        <Modal.Body>
                            <Form>
                                <Form.Label>Номер телефона получателя</Form.Label>
                                <Form.Control className={"input"} type="text" name={`phoneNumber`} onChange={handleChange}
                                              onBlur={handleBlur} value={values.phoneNumber} placeholder={"Введите номер телефона"}/>
                                {touched.phoneNumber && errors.phoneNumber &&
                                <OverlayTrigger placement="bottom"
                                                overlay={<Tooltip id="tooltip-disabled">Формат телефона должен
                                                    быть
                                                    89101234567 либо +79101234567</Tooltip>}>
                                    <div className={`error`}>{errors.phoneNumber}<span
                                        className="material-icons error__ico">help_outline</span></div>
                                </OverlayTrigger>
                                }
                                <Form.Label className={"mt-4"}>Период отправки данных</Form.Label>
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
                            <button className={"ml-2 btn btn-outline-success"}
                                    disabled={!isValid || !dirty} onClick={handleSubmit}
                                    type={`submit`}>Отправить</button>
                            <button className={"btn btn-outline-danger"}  onClick={onHide}>Закрыть</button>
                        </Modal.Footer>
                    </div>
                }
            </Formik>
        </Modal>
    );
};

export default TimeSending;