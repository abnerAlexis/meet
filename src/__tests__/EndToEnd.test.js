import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    // Give time to any async operation to complete after each test
  afterEach(async () => {
    jest.setTimeout(20000);
  });

    afterAll(async () => {
        await browser.close();
    });

    test('Event element is collapsed by default', async () => {
        const eventDetails = await page.$('eventdetails');
        expect(eventDetails).toBeNull();
    })
});

// describe('show/hide an event details', async () => {
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();
//     await page.goto('http://localhost:3000/');

//     await page.waitForSelector('.event');

//     const eventDetails = await page.$('eventdetails');

//     expect(eventDetails).toBeNull();
//     browser.close();
// });