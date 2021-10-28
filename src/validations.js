
// Importing the modules needed
const { exists } = require('fs');
const { exec } = require("child_process");
const whatsExe = ".\\WhatsAppWeb - Atalho.lnk";


// Defining a function to check if the shortcut exists
const checkFile = () => {
    return new Promise((resolve, _reject) => {
        exists(whatsExe, ex => resolve(ex));
    });
}


// Defining a function to check if the process of WhatsAppWeb is running
const isRunning = (proc) => {
    return new Promise((resolve, reject) => {
        exec('tasklist', (err, stdout, stderr) => {
            if (err) {
                reject([err, stderr]);
            }
            else if (stdout) {
                const res = stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1
                resolve(res);
            }
        });
    });
}


// Exporting the functions and the constants
module.exports = {
    checkFile,
    isRunning,
    exec,
    whatsExe
}
