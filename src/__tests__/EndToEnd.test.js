import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/meet');
        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Event element is collapsed by default', async () => {
        const eventDetails = await page.$('eventdetails');
        expect(eventDetails).toBeNull();
    })
});