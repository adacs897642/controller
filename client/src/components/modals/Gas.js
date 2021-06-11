import React from 'react';
import {Form, Modal} from "react-bootstrap";
import {Formik} from 'formik'
import * as yup from 'yup'
import './index.css'
import appState from "../../store/appState";


const Gas = ({show, onHide, store}) => {
    const phoneRegExp = /^((\+79|79|89)+([0-9]){9})$/

    const validationSchema = yup.object().shape({
        phoneNumber: yup.string().typeError('Должно быть строкой').matches(phoneRegExp, 'Неправильный номер телефона').required('Обязательно')
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
                    Номер получателя рассылки по загазованности
                </Modal.Title>
            </Modal.Header>
            <Formik initialValues={{
                phoneNumber: ''
            }}
                    validateOnBlur
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                    <div>
                        <Modal.Body>
                            <Form>
                                <Form.Control className={"input"} type="text" name={`phoneNumber`} onChange={handleChange}
                                              onBlur={handleBlur} value={values.phoneNumber} placeholder={"Введите новый номер телефона"}/>
                                {touched.phoneNumber && errors.phoneNumber && <p className={`error`}>{errors.phoneNumber}</p>}
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

export default Gas;