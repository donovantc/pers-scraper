const CREDS = require('./creds');
const puppeteer = require('puppeteer');

const LOGIN_PAGE = 'https://simplesurance.personio.de/';
const CALENDAR_PAGE = 'https://simplesurance.personio.de/calendar/team-view?eventTypes=absences%2Ctime_off%3D1224%2Ctime_off%3D1226%2Ctime_off%3D58697&holidayCalendars=4641&isMyDirectReports=1';

const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#password';
const LOGIN_BTN_SELECTOR = '#sessions-login-container > div > section > div > form > div > div._34kh4FVSNVIqRGeQJC_8PI > button';

const LIST_DROPDOWN = '.employee-list-dropdown-js';
const NAME_SELECTOR = '#js-team-view-root-div > div > div:nth-child(2) > div > div._3687oWXiFCWKsTRoo1cSbj > div:nth-child(2)';

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // Login
  await page.goto(LOGIN_PAGE);
  await page.waitForSelector(USERNAME_SELECTOR);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click(LOGIN_BTN_SELECTOR);

  // Go to calendar page
  await page.goto(CALENDAR_PAGE);
  await page.waitForSelector(LIST_DROPDOWN);

  // Get User
  let user = await page.evaluate((sel) => {
    return document.querySelector(sel);
  }, NAME_SELECTOR);

  console.log(user)

  // Take screenshot
  await page.screenshot({path: 'example.png'});

  // Exit
  await browser.close();
})();