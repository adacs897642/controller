import React from 'react';
import {Button} from "react-bootstrap";

const WSconnect = () => {
    const socket = new WebSocket('ws://localhost:5000')

    socket.onopen = () => {
        socket.send(JSON.stringify({
            method: 'connection',
            id: 15,
            userName: 'Piter'
        }))
    }

    socket.onmessage = (e) => {
        console.log('С сервера пришло сообщение', e.data)
    }
    return (
        <div>
            <Button onClick={() => {
                socket.send(JSON.stringify({
                    message: 'Hello',
                    method: 'message',
                    id: 15,
                    userName: 'Piter'
                }))
            }}>Connect</Button>
        </div>
    );
};

export default WSconnect;