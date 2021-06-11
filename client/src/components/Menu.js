import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
import ResetController from "./modals/ResetController";
import PowerOffController from "./modals/PowerOffController";

const Menu = () => {
    const [powerOffVisible, setPowerOffVisible] = useState(false)
    const [restartVisible, setRestartVisible] = useState(false)
    return (

        <ListGroup style={{display:'absolute'}}>
            <ListGroup.Item action onClick={()=>setPowerOffVisible(true)}>Выключить контроллер</ListGroup.Item>
            <ListGroup.Item action onClick={()=>setRestartVisible(true)}>Перезагрузить контроллер</ListGroup.Item>

            <ResetController show={powerOffVisible} onHide={()=>setPowerOffVisible(false)}/>
            <PowerOffController show={restartVisible} onHide={()=>setRestartVisible(false)}/>
        </ListGroup>

    );
};

export default Menu;