import React, {useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import ChangeNameObject from "../components/modals/ChangeNameObject";
import ChangePhoneNumberObject from "../components/modals/ChangePhoneNumberObject";
import ChangePeriodSendObject from "../components/modals/ChangePeriodSendObject";
import FirstPowerOn from "../components/modals/FirstPowerOn";
import TimeSending from "../components/modals/TimeSending";
import ChanegSettingsObject from "../components/modals/ChanegSettingsObject";
import Gas from "../components/modals/Gas";
import ResetController from "../components/modals/ResetController";
import PowerOffController from "../components/modals/PowerOffController";
import ResetSettings from "../components/modals/ResetSettings";
import appState from "../store/appState";


const Config = () => {
    const [nameVisible, setNameVisible] = useState(false)
    const [phoneVisible, setPhoneVisible] = useState(false)
    const [periodVisible, setPeriodVisible] = useState(false)
    const [timeSendingVisible, setTimeSendingVisible] = useState(false)
    const [firstPowerOnVisible, setFirstPowerOnVisible] = useState(false)
    const [settingsVisible, setSettingsVisible] = useState(false)
    const [gasVisible, setGasVisible] = useState(false)
    const [powerOffVisible, setPowerOffVisible] = useState(false)
    const [restartVisible, setRestartVisible] = useState(false)
    const [resetSettingsView, setResetSettingsView] = useState(false)
    return (
        <Row>

            <Col md={12}>
                <Container style={{display: 'flex'}}>
                    <Col>
                        <div className={"block_cards"}>
                            <Row style={{justifyContent: "center"}}>
                                <h2>Настройки АПК П СКП21</h2>
                            </Row>
                            <Row className={"mt-4"}>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setNameVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span className="material-icons">article</span></Col>
                                                    <Col md={10}>Название перехода</Col>
                                                </Row>

                                            </Card.Title>

                                            Изменение названия отображаемого перехода
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setPhoneVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span
                                                        className="material-icons">settings_phone</span></Col>
                                                    <Col md={10}>Номер перехода</Col>
                                                </Row>

                                            </Card.Title>
                                            Изменение телефонного номера перехода
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setPeriodVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span className="material-icons">schedule</span></Col>
                                                    <Col md={10}>Период опроса</Col>
                                                </Row>
                                            </Card.Title>
                                            Настройка периода опроса перехода
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className={"mt-4"}>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setSettingsVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span className="material-icons">settings</span></Col>
                                                    <Col md={10}>Параметры</Col>
                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                Настройка основных параметров перехода
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setResetSettingsView(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span className="material-icons">settings_backup_restore</span></Col>
                                                    <Col md={10}>Заводские настройки</Col>
                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                Установка заводских параметров перехода
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                        </div>
                        <div className={"block_cards"}>
                            <Row style={{justifyContent: "center"}}>
                                <h2>Настройки контроллера СКП21</h2>
                            </Row>
                            <Row className={"mt-4"}>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setGasVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span
                                                        className="material-icons">access_alarm</span></Col>
                                                    <Col md={10}>Загазованность</Col>
                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                Добавление/ удаление телефона из списка рассылки по загазованности
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setTimeSendingVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span
                                                        className="material-icons">schedule_send</span></Col>
                                                    <Col md={10}>Рассылка</Col>
                                                </Row>
                                            </Card.Title>
                                            Настройка рассылки данных перехода по расписанию
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setFirstPowerOnVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span className="material-icons">power</span></Col>
                                                    <Col md={10}>Первое включение</Col>
                                                </Row>
                                            </Card.Title>
                                            Настройка номера телефона с информацией о первом включении
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                            <Row className={"mt-4"}>

                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setPowerOffVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span
                                                        className="material-icons">power_settings_new</span></Col>
                                                    <Col md={10}>Выключить контроллер</Col>
                                                </Row>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className={"card-conf card__animate"}>
                                        <Card.Body onClick={() => setRestartVisible(true)}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={2}><span className="material-icons">autorenew</span></Col>
                                                    <Col md={10}>Перезагрузить контроллер</Col>
                                                </Row>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                    </Col>

                </Container>

                <ChangeNameObject show={nameVisible} onHide={() => setNameVisible(false)} store={appState}/>
                <ChangePhoneNumberObject show={phoneVisible} onHide={() => setPhoneVisible(false)} store={appState}/>
                <ChangePeriodSendObject show={periodVisible} onHide={() => setPeriodVisible(false)} store={appState}/>
                <FirstPowerOn show={firstPowerOnVisible} onHide={() => setFirstPowerOnVisible(false)} store={appState}/>
                <TimeSending show={timeSendingVisible} onHide={() => setTimeSendingVisible(false)}store={appState}/>
                <ChanegSettingsObject show={settingsVisible} onHide={() => setSettingsVisible(false)} store={appState}/>
                <Gas show={gasVisible} onHide={() => setGasVisible(false)} store={appState}/>
                <PowerOffController show={powerOffVisible} onHide={() => setPowerOffVisible(false)} store={appState}/>
                <ResetController show={restartVisible} onHide={() => setRestartVisible(false)} store={appState}/>
                <ResetSettings show={resetSettingsView} onHide={()=>setResetSettingsView(false)} store={appState}/>
            </Col>
            {/*<Col md={2}>*/}
            {/*    <Menu/>*/}
            {/*</Col>*/}
        </Row>
    )
        ;
};

export default Config;