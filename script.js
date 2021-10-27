
const { exec } = require("child_process");
const whatsProcess = 'WhatsAppWeb.exe';
const whatsExe = ".\\WhatsAppWeb - Atalho.lnk";
const seconds = 3600;
// const seconds = 10;


const isRunning = (proc) => {
    return new Promise((resolve, reject) => {
        let cmd = 'tasklist';
        exec(cmd, (err, stdout, stderr) => {
            if (err){
                reject([err, stderr]);
            }
            else if (stdout){
                const res = stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1
                resolve([res]);
            }
        });
    });
}


const Execute = async () => {
    const running = await isRunning(whatsProcess);
    if (running[0] === true) {
        exec(`taskkill /im ${whatsProcess} /t /f`);
        exec(`"${whatsExe}" start`);
    }
    else if (running[0] === false) {
        exec(`"${whatsExe}" start`);
    }
    else {
        console.log(`Houve um erro ao tentar iniciar/reiniciar o serviço do WhatsApp server. Mais detalhes do mesmo:\n${running[0]}\n${running[1]}`);
    }
}


setInterval(() => {
    console.log(`\nWhatsApp Server reiniciado às ${new Date().toLocaleString()}`);
    Execute();
}, seconds * 1000);

console.log(`Serviço de reinicialização do WhatsApp executado às ${new Date().toLocaleString()}...\nAguarde a próxima reinicialização.`);
Execute();
