
const schedule = require('node-schedule');
const {exec} = require("child_process");
const whatsProcess = 'WhatsAppWeb.exe';
const whatsExe = ".\\WhatsAppWeb - Atalho.lnk";


const isRunning = (process) => {
    return new Promise((resolve, reject) => {
        let cmd = 'tasklist';
        exec(cmd, (err, stdout, stderr) => {
            if (err){
                let errors = [err, stderr];
                reject(errors);
            }
            else if (stdout){
                const res = stdout.toLowerCase().indexOf(process.toLowerCase()) > -1
                resolve(res);
            }
        });
    });
    
}


const Execute = async () => {
    const response = await isRunning(whatsProcess);
    if (response) {
        exec(`taskkill /im ${whatsProcess} /t /f`);
        exec(`"${whatsExe}" start`);
    }
    else {
        exec(`"${whatsExe}" start`);
    }
}


// Execução do JOB
schedule.scheduleJob('*/59 * * * *', () => {
    console.log(`WhatsApp Server reiniciado às ${new Date().toLocaleString()}`);
    Execute();
});
