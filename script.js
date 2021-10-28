
// Importing the main execute() function from the validations module
// const seconds = 5;
const { execute } = require('./src/engine');
const seconds = 3600;
let counter = 1;


// Setting up an interval of 1 hour to callback the execute() function
setInterval(() => {

    execute()
        .then(_ => {
            console.log(`\n${counter}) WhatsApp Server reiniciado às ${new Date().toLocaleString()}`)
            counter += 1;
        })
        .catch(error => console.log(error));

}, seconds * 1000);


// First execution of the execute()
execute()
    .then(() => {
        console.log(`\nServiço de reinicialização do WhatsApp executado às ${new Date().toLocaleString()}\nAguarde a próxima reinicialização...`);
    })
    .catch(error => console.log(error));
