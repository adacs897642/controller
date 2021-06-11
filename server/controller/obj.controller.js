const db = require('../db')

class ObjController{

    async getObj(){
        const obj = await db.query('SELECT distinct obj, sim from objects')
        // console.log(obj.rows)
        return (obj.rows)
    }

    async updateObjName(name, phone){
        const obj = await db.query(`update objects set obj=$1 where sim = $2 RETURNING *`, [name, phone])
        return (obj.rows[0])
    }

    async updateObjPhone(phone_new, phone_old){
        const b1 = await db.query(`update objects set alias=$1 where alias ~ $2 and sim = $3 RETURNING *`, [phone_new + '-LV1'  , '-LV1', phone_old])
        const b2 = await db.query(`update objects set alias=$1 where alias ~ $2 and sim = $3 RETURNING *`, [phone_new + '-DISC1', '-DISC1', phone_old])
        const b3 = await db.query(`update objects set alias=$1 where alias ~ $2 and sim = $3 RETURNING *`, [phone_new + '-DISC2', '-DISC2', phone_old])
        const b4 = await db.query(`update objects set alias=$1 where alias ~ $2 and sim = $3 RETURNING *`, [phone_new + '-USL1' , '-USL1', phone_old])
        const b5 = await db.query(`update objects set alias=$1 where alias ~ $2 and sim = $3 RETURNING *`, [phone_new + '-USL2' , '-USL2', phone_old])
        const obj = await db.query(`update objects set sim=$1 where sim = $2 RETURNING *`, [phone_new, phone_old])
        return (obj.rows[0])
    }
}
module.exports = new ObjController()