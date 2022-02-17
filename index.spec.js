const puppeteer = require('puppeteer');
jest.setTimeout(160000)

describe('cardValid', () => {
  let browser = null;
  let page = null;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // show gui
      slowMo: 50,
      devtools: false, // show devTools
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
    const searchString = await page.$("#algoritm_validation")
    const value = await page.evaluate(el => el.textContent, searchString)
    await expect(value).toMatch('false')
  })
  it('should be valid card', async () => {
    await page.goto('file:///C:/Users/Tanya/OneDrive/Desktop/ahj%20%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D1%8F%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/ahjtest/index.html')
    await page.type('input', '371449635398431')
    await page.click('button')
    const searchString = await page.$("#algoritm_validation")
    const value = await page.evaluate(el => el.textContent, searchString)
    await expect(value).toMatch('true')
  })
  it('should be unvalid payment system', async () => {
    await page.goto('file:///C:/Users/Tanya/OneDrive/Desktop/ahj%20%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D1%8F%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/ahjtest/index.html')
    await page.type('input', '123456')
    await page.click('button')
    const searchString = await page.$("#paymentsystem_validation")
    const value = await page.evaluate(el => el.textContent, searchString)
    await expect(value).toMatch('Card isn`t valid')
  })
  it('should be valid payment system', async () => {
    await page.goto('file:///C:/Users/Tanya/OneDrive/Desktop/ahj%20%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D1%8F%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/ahjtest/index.html')
    const cardArray = [{number:'371449635398431',name: 'American Express'},{number:'5555555555554444',name:'Mastercard'},
    {number:'4111111111111111',name: 'Visa'},{number:'2200123456789010',name:'МИР'}]
    cardArray.map(card => {
      await page.type('input', card.number)
      await page.click('button')
      const searchString = await page.$("#paymentsystem_validation")
      const value = await page.evaluate(el => el.textContent, searchString)
      await expect(value).toMatch(card.name)
    })
  })
})
 