const puppeteer = require('puppeteer');
jest.setTimeout(160000)

describe('cardValid', () => {
  let browser = null;
  let page = null;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  })

  afterAll(async () => {
    await browser.close();
  });

  it('should be unvalid card', async () => {
    await page.goto('file:///C:/Users/Tanya/OneDrive/Desktop/ahj%20%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D1%8F%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/ahjtest/index.html')
    await page.type('input', '123456')
    await page.click('button')
    const searchString = await page.$("div").toString()
    await expect(searchString).resolves.toMatch('false')
  })
})