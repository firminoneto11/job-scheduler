
// Importing the modules needed
const { whatsExe, isRunning, checkFile, exec } = require('./validations');
const whatsProcess = "WhatsAppWeb.exe";


// This function will execute the whole logic of checking if the process is running and if the WhatsAppWeb icon exists
const execute = async () => {
    const running = await isRunning(whatsProcess);
    const exists = await checkFile();
    const doNotExistsMessage = "\nNão foi possível encontrar o arquivo 'WhatsAppWeb - Atalho.lnk' no diretório atual.";

    if (exists) {
        if (running === true) {
            exec(`taskkill /im ${whatsProcess} /t /f`);
            exec(`"${whatsExe}" start`);
        }
        else if (running === false) {
            exec(`"${whatsExe}" start`);
        }
        else {
            throw `\nHouve um erro ao tentar iniciar/reiniciar o serviço do WhatsApp server. Mais detalhes:\n\
                ${running[0]}\n${running[1]}`;
        }
    }
    else {
        throw doNotExistsMessage;
    }
}


// Exporting the execute() function
module.exports = {
    execute
}
