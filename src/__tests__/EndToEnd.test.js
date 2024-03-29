import { default as puppeteer } from "puppeteer";

describe('show/hide an event details', async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event');

    const eventDetails = await page.$('eventdetails');

    expect(eventDetails).toBeNull();
    browser.close();
});