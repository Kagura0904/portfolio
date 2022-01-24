
const SerialPort = require('serialport');
const rpio = require('rpio');
// const parser = port.pipe(new Readline())
rpio.init({ gpiomem: false });
rpio.init({ mapping: 'gpio' });
// =================================
// GPIO 23をLOW(RS485有効)
// =================================
const serial_enable = 23;
rpio.write(serial_enable, rpio.LOW);
const uart_enb = 24;
rpio.write(uart_enb, rpio.HIGH);
const rs485 = 5;
rpio.write(rs485, rpio.HIGH);

// ==================================
// シリアル設定
// ==================================
const path = '/dev/ttyAMA0';
const serialOpt = {
    baudRate: 31250,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
};
const port = new SerialPort(path, serialOpt);
const parser = port.pipe(new Readline())

// port.on('open', function(){
//     console.log('Port /dev/ttyAMA0 @31250 bgs');
//     const end = "\00\00\0D\0A";
//     port.write("motor move" +end)
// })
// port.on('data',function(byte){
//     console.log("Data :", byte.toString('hex'))
// })
// function hex(str) {
//     const arr = [];
//     for (let i = 0, l= str.length; i< l; i++) {
//         let ascii = str.charCodeAt(i);
//         arr.push(ascii);
//     }
//     arr.push(255);
//     arr.push(255);
//     arr.push(255);
//     return new Buffer(arr);
// }
// const buffer = new Buffer(16);


// =======================================
// 仮書き
// =======================================
// rpio.write(rs485, rpio.LOW)
// const sendtext = ["F0", "02", "0D", "0A"];
// const buff = Buffer.from(sendtext);
// const readbuf = '';
// parser.on('data', readSerialData, console.log);
// port.write(buff, function (err) {
//     if (err) {
//         return console.log("Error on write: ", err.message);
//     }
//     console.log("message written");
// })
// rpio.write(rs485, rpio.HIGH)
// let response = "";
// port.on("data", (line) => {
//     response = response.concat(line.toString());
//     console.log(response)
// });
// ==========================================


// async function sendSignal(sendtext) {
//     // GPIO 5はHIで送信　LOWで受信
//     if (sendtext) {
//         rpio.write(rs485, rpio.HIGH);
//         // const senddata = sendtext + String.fromCharCode(c);
//         port.write(buff, async(err))
//         if (err) {
//             return console.log("Error on write: ", err.message);
//             console.log("message written");
//             msleep(5)
//             await new Promise(r => setTimeout(r, 3));
//             // rpio.mode(rs485, rpio.INPUT)
//             rpio.write(rs485, rpio.LOW)
//             console.log('success!!!!')
//             port.on("data", (line) => {
//                 response = response.concat(line.toString());
//             });
//         }
//     }
// };
// sendSignal()
