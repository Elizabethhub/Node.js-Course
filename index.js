const contactActions = require('./contacts');
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactActions.listContacts().then(data => console.table(data));
      break;

    case 'get':
      contactActions.getContactById(id).then(data => console.table(data));
      break;

    case 'add':
      contactActions.addContact(name, email, phone).then(data => console.table(data));
      break;

    case 'remove':
      const removeContact = await contactActions.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// const date = new Date();

// console.log(date.getFullYear());

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// // rl.on('line', cmd => {
// //   console.log(`You just typed: ${cmd}`);
// // });
// rl.question('what is your name?', answer => {
//   console.log(`Nice to meet You ${answer}`);
// });
