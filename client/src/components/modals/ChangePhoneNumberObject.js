import React from 'react';
import {Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Formik} from 'formik'
import * as yup from 'yup'
import './index.css'

const ChangePhoneNumberObject = ({show, onHide, store}) => {
        const phoneRegExp = /^((\+7|7|8)[9]([0-9]){9})$/

        const validationSchema = yup.object().shape({
            phoneNumber: yup.string().typeError('Должно быть строкой').matches(phoneRegExp, 'Неправильный номер телефона').required('Обязательно')
        })
        const checkPhone = (values)=>{
            if(values.phoneNumber[0] ==='+'){
                values.phoneNumber=values.phoneNumber.slice(1,)
            }
            if(values.phoneNumber[0] ==='8'){
                values.phoneNumber='7' + values.phoneNumber.slice(1,)
            }
            return values
        }
        const handleOnSubmit = (values) => {
            values = checkPhone(values)
            onHide()
            if (store.socket.readyState === 1) {
                store.socket.send(JSON.stringify({
                        method: 'change_phone_number',
                        idObj: store.id_obj,
                        values: values
                    }
                ))
            } else {
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
                        Номер перехода
                    </Modal.Title>
                </Modal.Header>
                <Formik initialValues={{
                    phoneNumber: store.obj_phone,
                    phone_old: store.obj_phone
                }}
                        validateOnBlur
                        onSubmit={(values) => handleOnSubmit(values)}
                        validationSchema={validationSchema}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                        <div>
                            <Modal.Body>
                                <Form>
                                    <Form.Control className={"input"} type="text" name={`phoneNumber`}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur} value={values.phoneNumber}
                                                  placeholder={"Введите новый номер телефона"}/>


                                    {touched.phoneNumber && errors.phoneNumber &&
                                    <OverlayTrigger placement="bottom"
                                                    overlay={<Tooltip id="tooltip-disabled">Формат телефона должен быть
                                                        89101234567 либо +79101234567</Tooltip>}>
                                        <div className={`error`}>{errors.phoneNumber}<span
                                            className="material-icons error__ico">help_outline</span></div>
                                    </OverlayTrigger>
                                    }
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
    }
;

export default ChangePhoneNumberObject;