const express = require('express')

const app = express()

const WSserver = require('express-ws')(app)

const aWss = WSserver.getWss()

require('dotenv').config()

const PORT = process.env.PORT || 3050


const objController = require('./controller/obj.controller')
const fsController = require('./controller/fs.controller')


app.ws('/', (ws, req) => {
    console.log('Подключение установлено')
    ws.send(JSON.stringify({method:'connection',
        message:'Ты успешно подключился'}))
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        console.log(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'reset_controller':
                broadcastResetController(ws, msg)
                break
            case 'power_off_controller':
                broadcastPowerOffController(ws, msg)
                break
            case 'change_period':
                changePeriodHandler(ws, msg)
                break
            case 'change_name':
                changeNameHandler(ws, msg)
                break
            case 'change_phone_number':
                changePhoneNumberHandler(ws,msg)
                break
        }
    })
})

app.listen(PORT, () => console.log(`run server on PORT ${PORT}`))

const connectionHandler = async (ws, msg) => {

    const t = await objController.getObj()

    // console.log(t)

    await ws.send(JSON.stringify({
        method: 'connection',
        obj_name: t[0].obj,
        phone: t[0].sim
    }))
}

const changePeriodHandler = (ws, msg) => {
    fsController.updatePeriod(msg.values.phone, msg.values.time)
    ws.send(JSON.stringify({
        method:'change_period',
        message:'Запрос на изменение периода опроса перехода передан',
        }))
}

const changePhoneNumberHandler  = async (ws, msg) => {

    const t = await objController.updateObjPhone(msg.values.phoneNumber,msg.values.phone_old)

    // console.log(t)
    ws.send(JSON.stringify({
        method:'update_obj_phone',
        message:'Изменение номера перехода завершено успешно',
        obj_name: t.obj,
        phone: t.sim
    }))
}

const changeNameHandler = async (ws, msg) => {
    console.log(msg.values)
    const t = await objController.updateObjName(msg.values.name,msg.values.phone)

    // console.log(t)
    ws.send(JSON.stringify({
        method:'update_obj_name',
        message:'Изменение названия перехода завершено успешно',
        obj_name: t.obj,
        phone: t.sim
    }))
}


const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(`Пользователь ${msg.userName} подключился`)
        }
    })
}
const broadcastPowerOffController = (ws, msg) => {
    aWss.clients.forEach(client => {
        client.send(JSON.stringify({
            method:'power_off_controller',
            message:`Производится выключение контроллера`}))

    })
    fsController.powerOffController()
}
const broadcastResetController = (ws, msg) => {
    aWss.clients.forEach(client => {
        client.send(JSON.stringify({
            method:'reset_controller',
            message:`Производится перезагрузка контроллера`}))
    })
    fsController.resetController()
}