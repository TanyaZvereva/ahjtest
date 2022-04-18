const puppeteer = require('puppeteer');
const path = require('path')
jest.setTimeout(160000)

describe('cardValid', () => {
  let browser = null;
  let page = null;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 50,
      devtools: false, // show devTools
    });
    page = await browser.newPage();
  })

  afterAll(async () => {
    await browser.close();
  });

  it('should be unvalid card', async () => {
    await page.goto(path.resolve(__dirname, "./index.html"))
    await page.type('input', '123456')
    await page.click('button')
    const searchString = await page.$("#algoritm_validation")
    const value = await page.evaluate(el => el.textContent, searchString)
    await expect(value).toMatch('false')
  })
  it('should be valid card', async () => {
    await page.goto(path.resolve(__dirname, "./index.html"))
    await page.type('input', '371449635398431')
    await page.click('button')
    const searchString = await page.$("#algoritm_validation")
    const value = await page.evaluate(el => el.textContent, searchString)
    await expect(value).toMatch('true')
  })
  it('should be unvalid payment system', async () => {
    await page.goto(path.resolve(__dirname, "./index.html"))
    await page.type('input', '123456')
    await page.click('button')
    const searchString = await page.$("#paymentsystem_validation")
    const value = await page.evaluate(el => el.textContent, searchString)
    await expect(value).toMatch('Card isn`t valid')
  })
  it('should be valid payment system', async () => {
    await page.goto(path.resolve(__dirname, "./index.html"))
    const cardArray = [{number:'371449635398431',name: 'American Express'},{number:'5555555555554444',name:'Mastercard'},
    {number:'4111111111111111',name: 'Visa'},{number:'2221000838255148',name:'МИР'}]
    for (const card of cardArray) {
      await page.evaluate(() => {
        const example = document.querySelector('input')
        example.value = '';
      });
      await page.type('input', card.number)
      await page.click('button')
      const searchString = await page.$("#paymentsystem_validation")
      const value = await page.evaluate(el => el.textContent, searchString)
      await expect(value).toMatch(card.name)
    }
  })
})
 