const uuid = require('uuid')
const fs = require('fs')
const childProcess  = require('child_process')

class FsController {

    updatePeriod(phone, time) {
        let text = "To: " + phone + '\r\n' + '\r\n' + 'RQWQR:T1=' + time
        let fileName = phone + '-' + uuid.v4() + '.sms'

        console.log(text)

        fs.writeFile(fileName, text,
            (e) => {
                if (e) throw e
                console.log('write finish')
                let data = fs.readFileSync(fileName, 'utf8')
                console.log(data)
            })

    }

    resetController(){
        console.log('resetController')
        childProcess.exec('sudo reboot', (error, stdout, stderr)=>{
            if(error){
                console.log(`error ${error.message}`)
                return
            }
            if(stderr){
                console.log(`error ${stderr}`)
                return;
            }
            if(stdout){
                console.log(`stdout ${stdout}`)
            }
        })
    }
    powerOffController(){
        console.log('powerOffController')
        childProcess.exec('sudo shutdown', (error, stdout, stderr)=>{
            if(error){
                console.log(`error ${error.message}`)
                return
            }
            if(stderr){
                console.log(`error ${stderr}`)
                return;
            }
            if(stdout){
                console.log(`stdout ${stdout}`)
            }
        })
    }

}

module.exports = new FsController()