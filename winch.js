
const rpio = require("rpio");

rpio.init({ gpiomem: false });
rpio.init({ mapping: 'gpio' });
// const interval = 5;
// const times = 5;
// ===========ショートブレーキ============= 
// rpio.open(13, rpio.OUTPUT);
// rpio.write(13, rpio.HIGH);
// rpio.open(19, rpio.OUTPUT);
// rpio.write(19, rpio.HIGH); // STBYをHIGH 
// rpio.open(26, rpio.OUTPUT);
// rpio.write(26, rpio.HIGH); // IN1をHIGH
// rpio.open(16, rpio.OUTPUT);
// rpio.write(16, rpio.HIGH); // IN2をHIGH
// rpio.open(12, rpio.PWM);
// rpio.write(12, rpio.HIGH); // PWMをHIGH
// ==========ショートブレーキ===============
// ==============正転/逆転=============
// rpio.write(19, rpio.HIGH); // STBYをHIGH
// rpio.write(16, rpio.LOW); // IN1をLOW
// rpio.write(26, rpio.HIGH); // IN2をHIGH
// rpio.write(12, rpio.HIGH); // PWMをHIGH
// ==============正転/逆転==============
// ==============モーター25%で動かす============
// rpio.pwmSetClockDivider(2)
// rpio.pwmSetRange(12, 1024)
// rpio.pwmSetData(12, 1024)
// ==============モーター25%で動かす============
// =============ショートブレーキ============
// rpio.write(16, rpio.LOW); // IN2をLOW
// rpio.write(12, rpio.LOW); // PWMをHIGH
// =============ショートブレーキ============
// ===============逆転/正転===============
// rpio.write(26, rpio.HIGH); // IN1をHIGH
// rpio.write(16, rpio.LOW); // IN2をLOW
// rpio.write(12, rpio.HIGH); // PWMをHIGH
// ================逆転/正転==============
// ==============モーター25%で動かす============
// rpio.pwmSetClockDivider(2)
// rpio.pwmSetRange(12, 1024)
// rpio.pwmSetData(12, 128)
// ==============モーター25%で動かす============
// ===============ショートブレーキ==============
// rpio.write(12, rpio.LOW); // PWMをLOW
// ===============ショートブレーキ==============
// ===============ストップ==============
// rpio.write(12, rpio.LOW); // PWMをLOW
// rpio.write(26, rpio.LOW); // IN1をLOW
// rpio.write(16, rpio.LOW); // IN2をLOW
// ===============ストップ==============
// ============スタンバイ===============
// rpio.write(19, rpio.LOW); // STBYをLOW
// ============スタンバイ===============
async function fwGpio() {
    // モーター関連のGPIOを全てOUTとHIにする
    // console.log("fowardgpio")
    rpio.open(13, rpio.OUTPUT);
    rpio.write(13, rpio.HIGH);
    rpio.open(19, rpio.OUTPUT);
    rpio.write(19, rpio.HIGH); // STBYをHIGH 
    rpio.open(26, rpio.OUTPUT);
    rpio.write(26, rpio.HIGH); // IN1をHIGH
    rpio.open(16, rpio.OUTPUT);
    rpio.write(16, rpio.HIGH); // IN2をHIGH
    rpio.open(12, rpio.PWM);
    rpio.write(12, rpio.HIGH); // PWMをHIGH
    // rpio.open(1, rpio.INPUT); // ホール素子
}

async function pwmFw() {
    // console.log("forwardgpio")
    rpio.write(19, rpio.HIGH); // STBYをHIGH
    rpio.write(16, rpio.LOW); // IN1をLOW
    rpio.write(26, rpio.HIGH); // IN2をHIGH
    rpio.write(12, rpio.HIGH); // PWMをHIGH
    rpio.pwmSetClockDivider(2);
    rpio.pwmSetRange(12, 1024);
    rpio.pwmSetData(12, 32);
    rpio.sleep(1);
    rpio.pwmSetData(12, 64);
    rpio.sleep(1);
    rpio.pwmSetData(12, 128);
    rpio.sleep(1);
    rpio.pwmSetData(12, 256);
    rpio.sleep(1);
    rpio.pwmSetData(12, 512);
    rpio.sleep(1);
    rpio.pwmSetData(12, 1024);
}
async function chkHole() {
    // 立ち下がり検出
    // console.log("checkhole")
    setInterval(() => {
        if (rpio.read(1) === 0) {
            console.log(rpio.read(1))
            rpio.sleep(1)
            rpio.pwmSetData(12, 512)
            rpio.sleep(1)
            rpio.pwmSetData(12, 256)
            rpio.sleep(1)
            rpio.pwmSetData(12, 128)
            rpio.sleep(1)
            rpio.pwmSetData(12, 64)
            rpio.sleep(1)
            rpio.write(12, rpio.LOW)
        }
    }, 200)
}

async function rvGpio() {
    // console.log("reversegpio")
    rpio.write(12, rpio.HIGH);
    rpio.write(16, rpio.HIGH); // IN1をHIGH
    rpio.write(26, rpio.LOW); // IN2をLOW
    // rpio.write(12, rpio.HIGH); // PWMをHIGH
    rpio.pwmSetClockDivider(2);
    rpio.pwmSetRange(12, 1024);
    rpio.pwmSetData(12, 32);
    // rpio.sleep(2)
}
async function chkHoleRv() {
    // 立ち上がり検出
    // console.log("reverse")
    setInterval(() => {
        if (rpio.read(1) === 1) {
            console.log(rpio.read(1))
            // console.log(rpio.read(1))
            // rpio.pwmSetClockDivider(2)
            // rpio.pwmSetRange(12, 1024)
            // rpio.pwmSetData(12, 32)
            // rpio.sleep(2)
            rpio.pwmSetData(12, 64);
            rpio.sleep(5);
            rpio.pwmSetData(12, 128);
            rpio.sleep(5);
            rpio.pwmSetData(12, 256);
            rpio.sleep(5);
            rpio.pwmSetData(12, 512);
            rpio.sleep(5);
            rpio.pwmSetData(12, 1024);
        }
    }, 200)
}
// async function loop() {
//     for (let i = 1; i < 6; i++) {
//         console.log(i + "回目")
//         await fwGpio();
//         await new Promise(r => setTimeout(r, 1000));
//         await pwmFw();
//         await new Promise(r => setTimeout(r, 1000));
//         await chkHole();
//         await new Promise(r => setTimeout(r, 3000));
//         await rvGpio();
//         await new Promise(r => setTimeout(r, 1000));
//         await chkHoleRv();
//         await new Promise(r => setTimeout(r, 3000));
//         await chkHole();
//         await new Promise(r => setTimeout(r, 500));
//     }
// }
async function stop() {
    rpio.write(12, rpio.LOW);
    rpio.write(16, rpio.LOW);
    rpio.write(26, rpio.LOW);
    rpio.write(19, rpio.LOW);
    rpio.write(13, rpio.LOW);
}

async function main() {
    // let i = 0;
    // do {
    // i++
    // console.log(i + "回目")
    await fwGpio();
    await new Promise(r => setTimeout(r, 1000));
    await pwmFw();
    await new Promise(r => setTimeout(r, 1000));
    await chkHole();
    await new Promise(r => setTimeout(r, 3000));
    await rvGpio();
    await new Promise(r => setTimeout(r, 1000));
    await chkHoleRv();
    await new Promise(r => setTimeout(r, 3000));
    await chkHole();
    await new Promise(r => setTimeout(r, 500));
    await stop();
    await new Promise(r => setTimeout(r, 500));
    // await loop();
    // await new Promise(r => setTimeout(r, 500));
    // }
    // while (i == 5)
    // await stop();
    process.exit(1)
}
for (let i = 1; i < 3; i++) {
    console.log(i + ('回目'))
    main()
}
// if( i > 3 ){
// break;
// }
