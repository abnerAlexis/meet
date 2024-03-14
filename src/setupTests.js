import '@testing-library/jest-dom';
//Here, add portions of the warning messages you want to intentionally prevent from appearing

const MESSAGE_TO_IGNORE = [
    "When testing, code that causes React state updates should be wrapped in to act(...):",
    "Error:",
    "The above error Ocurred"
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
    const ignoreMessage = MESSAGE_TO_IGNORE.find(message => args.toString().includes(message));
    if(!ignoreMessage) originalError(...args);
}