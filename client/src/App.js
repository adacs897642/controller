import React, {useEffect, useState} from 'react';
import Config from "./pages/config";

import NavBar from "./components/NavBar";
import Title from "./components/Title";

import "./styles/app.scss"

import {observer} from "mobx-react-lite";
import appState from "./store/appState";
import Info from "./components/modals/Info";

const App = observer(() => {

        const [infoVisible, setInfoVisible] = useState(false)


        useEffect(() => {

            const connectionHandler = (msg) => {
                appState.setObjName(msg.obj_name)
                appState.setObjPhone(msg.phone)
                console.log(appState.obj_name)
            }

            const handleOnMessage = (msg) => {

                console.log(msg)
                msg = JSON.parse(msg)
                console.log(msg)
                switch (msg.method) {
                    case 'connection':
                        connectionHandler(msg)
                        break
                    case 'command':
                    case 'reset_controller':
                    case 'power_off_controller':
                    case 'change_period':
                        appState.setMsg(msg.message)
                        setInfoVisible(true)
                        break
                    case 'update_obj_name':
                        appState.setMsg(msg.message)
                        appState.setObjName(msg.obj_name)
                        setInfoVisible(true)
                        break
                    case 'update_obj_phone':
                        appState.setMsg(msg.message)
                        appState.setObjPhone(msg.phone)
                        setInfoVisible(true)
                        break

                }
            }
            const socket = new WebSocket('ws://localhost:5000')
            appState.setSocket(socket)
            appState.setObjId(1)
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    method: 'connection',
                    id: 15,
                    userName: 'Piter'
                }))
            }

            socket.onerror = (e) => {
                appState.setFlagMsg(true)
                appState.setMsg('Ошибка соединения с сервером. Проверьте соединение и обновите страницу.')
            }

            socket.onmessage = (ev) => {
                handleOnMessage(ev.data)
            }

        }, [])

        if(appState.flag_msg === true)
        {
            setInfoVisible(true)
            appState.setFlagMsg(false)
        }

        return (
            <div className={"app"}>
                <NavBar/>
                <Title name={appState.obj_name}/>
                <Config/>

                <Info show={infoVisible} onHide={() => {
                    setInfoVisible(false)
                }} msg={appState.msg}/>
            </div>
        );
    }
);


export default App;