import {connect, connection} from "mongoose";

const conn = {
    isConnected: false
}

export async function connectDB(){
    if(connect.isConnected) return

    const db = await connect('mongodb://localhost/ProComeDB')

    console.log(db.connection.db.databaseName)
    conn.isConnected = db.connections[0].readyState;

}

connection.on('connected', ()=>{
    console.log('mongodb connection')
})

connection.off('disconnected', ()=>{
    console.log('mongodb connection failed')
});