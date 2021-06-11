import {makeAutoObservable} from "mobx"

class AppState{
    socket = null
    obj_id = null
    obj_name = ''
    obj_phone = ''
    msg = ''
    flag_msg = false

    constructor() {
        makeAutoObservable(this)
    }

    setSocket(socket){
        this.socket = socket
    }

    setObjId(id){
        this.obj_id = id
    }

    setFlagMsg(flag){
        this.flag_msg = flag
    }

    setMsg(msg){
        this.msg = msg
     }
    setObjName(name){
        this.obj_name = name
    }
    setObjPhone(phone){
        this.obj_phone = phone
    }
}

export default new AppState()