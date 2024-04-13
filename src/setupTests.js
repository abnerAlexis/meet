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

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});