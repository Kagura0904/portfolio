
const SerialPort = require('serialport');
const rpio = require('rpio');
// const iconv = require('iconv-lite')
const Readline = require('@serialport/parser-readline')
// const parser = port.pipe(new Readline ({ delimiter: '\r\n' }));
// import { Buffer } from 'buffer'
rpio.init({ gpiomem: false });
rpio.init({ mapping: 'gpio' });


// ===========================================
// GPIO 23 をLOW
// ===========================================
rpio.write(23, rpio.LOW);
// ============================================
// シリアルポート設定
// ============================================
const PATH = '/dev/serial0';
const OP = {
    baudRate: 31250,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    flowControl: false,
    // parser: SerialPort.parsers.readline("\r\n")
};
const port = new SerialPort(PATH, OP)
// =================================
// =================================
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
// const lineStream = port.pipe(new Readline());
port.on('error', (err) => {
    console.log('RS485 ERR ', err)
});
// ==============================================
// シリアル読み込み
// ==============================================
let readbuf = '';
port.on('data', (data) => {
    let endflg = false;
    for (let c of data) {
        if (c == 0x0D) endflg = true;
        else readbuf += String.fromCharCode(c);
        if (endflg) {
            console.log('res_data' + readbuf)
            readbuf = '';
            parser.on('res_data', readbuf)
        }
    }
})
port.on('open', function () {
    port.pipe(parser);
    parser.on('data', (data) => {
        console.log(data)
    })
    port.on('data', function (data) {
        console.log('data: ' + data);
    })
})

// ===============================================
// ===============================================
// const testmsg = ["00", "00", "0D", "0A" ]
const sendfake = async (sendtext) => {
    if (sendtext) {
        rpio.write(5, rpio.LOW) // GPIO5をLOWにして読み取り
        const senddata = sendtext + String.fromCharCode(0x0D)
        port.write(senddata, async (err) => {
            // console.log('send data', senddata)
            await new Promise(r => setTimeout(r, 3))
            rpio.write(5, rpio.LOW) //受信用
            console.log('send data: ', senddata)
        });
    }
}
// const sendtext = ["F0,01,0D,0A" ]
const send = async (sendtext) => {
    // const buf = Buffer.from(sendtext)
    // sendtext = Buffer.from(sendtext, "hex")
    if (sendtext) {
        rpio.write(5, rpio.HIGH);
        const senddata = sendtext + String.fromCharCode(0x0D);
        port.write(senddata, async (err) => {
            await new Promise(r => setTimeout(r, 5000));
            rpio.write(5, rpio.LOW);
            console.log('send data: ', senddata)
        })
        
        

        console.log('Data:', port.read())
        await new Promise(r => setTimeout(r, 5))
        // rpio.write(5, rpio.HIGH) //GPIO5
    }}
//=================================================================
    async function main() {
        await sendfake(Buffer.from('FF,FF,FF,FF'));
        await new Promise(r => setTimeout(r, 1000));
        console.log('sendfake done');
        // ==============================================
        await send(Buffer.from('F0,01,0D,0A'));
        await new Promise(r => setTimeout(r, 5000));
        await send(Buffer.from('F0,02,0D,0A'));
        await new Promise(r => setTimeout(r, 5000));
        // console.log('sendcmd is done');
        await send(Buffer.from('F0,03,0D,0A'));
        await new Promise(r => setTimeout(r, 5000));
        await send(Buffer.from('F0,04,0D,0A'));
        await new Promise(r => setTimeout(r, 5000));
        port.on('readable', async function () {
            parser.on('data', (data) => {
                console.log(data)
            })
            console.log('Data:', port.read())
            await new Promise(r => setTimeout(r, 5))
        //     rpio.write(5, rpio.HIGH) //GPIO5
        // })
        port.on('open', function () {
            port.pipe(parser);
            parser.on('data', (data) => {
                console.log('data: ' + data)
            })
        })
        // for (let i = 0; i < Number; i++){
        //     await send ('F0 01 0D 0A');
        //     await new Promise(r => setTimeout(r, 1000));
        // //     // console.log('sendcmd is done')
        // }
        port.close(null, null)
    })}
    main();
