import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import './index.css'

const ChangeNameObject = ({show, onHide, store}) => {
    const validationSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    })
    const handleOnSubmit = (values) => {
        onHide()
        if(store.socket.readyState===1) {
            store.socket.send(JSON.stringify({
                    method: 'change_name',
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
                    Название перехода
                </Modal.Title>
            </Modal.Header>
            <Formik initialValues={{
                name: store.obj_name,
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
                                <Form.Control className={"input"} type="text" name={`name`} onChange={handleChange}
                                              onBlur={handleBlur} value={values.name} placeholder={"Введите новое название перехода"}/>
                                {touched.name && errors.name && <p className={`error`}>{errors.name}</p>}
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

export default ChangeNameObject;