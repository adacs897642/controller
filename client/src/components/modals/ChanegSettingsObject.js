import React from 'react';
import {Col, Form, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {Formik} from 'formik'
import * as yup from 'yup'
import './index.css'
import appState from "../../store/appState";

const ChanegSettingsObject = ({show, onHide, store}) => {
    const phoneRegExp = /^((\+79|79|89)+([0-9]){9})$/

    const validationSchema = yup.object().shape({
        phoneNumberP1: yup.string().typeError('Должно быть строкой').matches(phoneRegExp, 'Неправильный номер телефона').required('Обязательно'),
        phoneNumberP2: yup.string().typeError('Должно быть строкой').matches(phoneRegExp, 'Неправильный номер телефона').required('Обязательно'),
        timeT1: yup.number().min(60, 'Минимальное значение 60 минут').max(1440, 'Максимальное значение 1440 минут').typeError('Должно быть числом').integer('Должно быть целым числом').required('Обязательно'),
        timeT2: yup.number().min(10, 'Минимальное значение 10 минут').max(1440, 'Максимальное значение 1440 минут').typeError('Должно быть числом').integer('Должно быть целым числом').required('Обязательно'),
        setC1: yup.number().min(0, 'Минимальное значение 0').max(1000, 'Максимальное значение 1000').typeError('Должно быть числом').integer('Должно быть целым числом').required('Обязательно'),
        setC2: yup.number().min(0, 'Минимальное значение 0').max(1000, 'Максимальное значение 1000').typeError('Должно быть числом').integer('Должно быть целым числом').required('Обязательно'),
    })
    const handleOnSubmit = (values) => {
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'gas',
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
                    Параметры АПК П
                </Modal.Title>
            </Modal.Header>
            <Formik initialValues={{
                phoneNumberP1: '',
                phoneNumberP2: '',
                timeT1: '',
                timeT2: '',
                setC1:'',
                setC2:'',
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
                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Номер телефона в основном режиме (Р1)</Form.Label>
                                        <Form.Control className={"input"} type="text" name={`phoneNumberP1`}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} value={values.phoneNumberP1}
                                                      placeholder={"Введите номер телефона"}/>
                                        {touched.phoneNumberP1 && errors.phoneNumberP1 &&
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-disabled">Формат телефона должен
                                                            быть
                                                            89101234567 либо +79101234567</Tooltip>}>
                                            <div className={`error`}>{errors.phoneNumberP1}<span
                                                className="material-icons error__ico">help_outline</span></div>
                                        </OverlayTrigger>
                                        }
                                        <Form.Label className={"mt-4"}>Номер телефона в тестовом режиме
                                            (Р2)</Form.Label>
                                        <Form.Control className={"input"} type="text" name={`phoneNumberP2`}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} value={values.phoneNumberP2}
                                                      placeholder={"Введите номер телефона"}/>
                                        {touched.phoneNumberP2 && errors.phoneNumberP2 &&
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-disabled">Формат телефона должен
                                                            быть
                                                            89101234567 либо +79101234567</Tooltip>}>
                                            <div className={`error`}>{errors.phoneNumberP2}<span
                                                className="material-icons error__ico">help_outline</span></div>
                                        </OverlayTrigger>
                                        }
                                        <Form.Label className={"mt-4"}>Период отчетов в основном режиме
                                            (Т1)</Form.Label>
                                        <Form.Control className={"input"} type="text" name={`timeT1`}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} value={values.timeT1}
                                                      placeholder={"Введите период в минутах"}/>
                                        {touched.timeT1 && errors.timeT1 &&
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-disabled">Диапазон значений должен
                                                            быть от 60 до 1440</Tooltip>}>
                                            <div className={`error`}>{errors.timeT1}<span
                                                className="material-icons error__ico">help_outline</span></div>
                                        </OverlayTrigger>
                                        }
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Период проверки входящих сообщений (Т2)</Form.Label>
                                        <Form.Control className={"input"} type="text" name={`timeT2`}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} value={values.timeT2}
                                                      placeholder={"Введите период в минутах"}/>
                                        {touched.timeT2 && errors.timeT2 &&
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-disabled">Диапазон значений должен
                                                            быть от 10 до 1440</Tooltip>}>
                                            <div className={`error`}>{errors.timeT2}<span
                                                className="material-icons error__ico">help_outline</span></div>
                                        </OverlayTrigger>

                                        }
                                        <Form.Label className={"mt-4"}>Уставка предупредительного режима
                                            (С1)</Form.Label>
                                        <Form.Control className={"input"} type="text" name={`setC1`}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} value={values.setC1}
                                                      placeholder={"Введите значение в %CH4 * 0.1"}/>
                                        {touched.setC1 && errors.setC1 &&
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-disabled">Диапазон значений должен
                                                            быть от 0 до 1000</Tooltip>}>
                                            <div className={`error`}>{errors.setC1}<span
                                                className="material-icons error__ico">help_outline</span></div>
                                        </OverlayTrigger>
                                        }
                                        <Form.Label className={"mt-4"}>Уставка аварийного режима (С2)</Form.Label>
                                        <Form.Control className={"input"} type="text" name={`setC2`}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} value={values.setC2}
                                                      placeholder={"Введите значение в %CH4 * 0.1"}/>
                                        {touched.setC2 && errors.setC2 &&
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-disabled">Диапазон значений должен
                                                            быть от 0 до 1000</Tooltip>}>
                                            <div className={`error`}>{errors.setC2}<span
                                                className="material-icons error__ico">help_outline</span></div>
                                        </OverlayTrigger>

                                        }
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className={"footer"}>
                            <button className={"ml-2 btn btn-outline-success"}
                                    disabled={!isValid || !dirty} onClick={handleSubmit}
                                    type={`submit`}>Отправить
                            </button>
                            <button className={"btn btn-outline-danger"} onClick={onHide}>Закрыть</button>
                        </Modal.Footer>
                    </div>
                }
            </Formik>
        </Modal>
    );
};

export default ChanegSettingsObject;