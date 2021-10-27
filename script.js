
const { exec } = require("child_process");
const whatsProcess = 'WhatsAppWeb.exe';
const whatsExe = ".\\WhatsAppWeb - Atalho.lnk";
const seconds = 3600;
// const seconds = 10;


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


setInterval(() => {
    console.log(`\nWhatsApp Server reiniciado às ${new Date().toLocaleString()}`);
    Execute();
}, seconds * 1000);

console.log(`Serviço de reinicialização do WhatsApp executado às ${new Date().toLocaleString()}...\nAguarde a próxima reinicialização.`);
Execute();
