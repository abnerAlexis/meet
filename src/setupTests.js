import '@testing-library/jest-dom';

const MESSAGES_TO_IGNORE = [
    "An update to",
    "inside a test was not wrapped in act"
];

function suppressConsoleMessages(method) {
    const originalMethod = console[method].bind(console);
    console[method] = (...args) => {
        for (const arg of args) {
            if (typeof arg === 'string' && MESSAGES_TO_IGNORE.some(message => arg.includes(message))) {
                return;
            }
        }
        originalMethod(...args);
    };
}
jest.setTimeout(30000);
suppressConsoleMessages('error');
suppressConsoleMessages('warn');
//Clear and simplified version of below code.

// import '@testing-library/jest-dom';

// const MESSAGES_TO_IGNORE = [
//     "An update to",
//     "inside a test was not wrapped in act"
// ];

// const originalError = console.error.bind(console);
// const originalWarn = console.warn.bind(console);

// console.error = (...args) => {
//     for (const arg of args) {
//         if (typeof arg === 'string' && MESSAGES_TO_IGNORE.some(message => arg.includes(message))) {
//             return; // Do nothing if the message should be ignored
//         }
//     }
//     originalError(...args);
// };

// console.warn = (...args) => {
//     for (const arg of args) {
//         if (typeof arg === 'string' && MESSAGES_TO_IGNORE.some(message => arg.includes(message))) {
//             return; // Do nothing if the message should be ignored
//         }
//     }
//     originalWarn(...args);
// };

// both error messages and warning messages are being ignored 
//if they contain specific phrases identified. 
//This ensures that when tests are run, certain warnings, 
//like the one about wrapping state updates in act(), 
//don't clutter up the console output.


// import '@testing-library/jest-dom';
// //Here, add portions of the warning messages you want to intentionally prevent from appearing

// const MESSAGE_TO_IGNORE = [
//     "When testing, code that causes React state updates should be wrapped in to act(...):",
//     "Error:",
//     "The above error Ocurred"
// ];

// const originalError = console.error.bind(console.error);

// console.error = (...args) => {
//     const ignoreMessage = MESSAGE_TO_IGNORE.find(message => args.toString().includes(message));
//     if(!ignoreMessage) originalError(...args);
// }