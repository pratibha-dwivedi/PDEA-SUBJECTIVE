const { Builder, By, Key, until, Actions } = require('selenium-webdriver');

async function runTest() {
  // Initialize the Selenium driver
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the Selenium Playground
    await driver.get('https://www.lambdatest.com/selenium-playground');

    // Click "Drag & Drop Sliders" under "Progress Bars & Sliders"
    const dragDropSlidersLink = await driver.findElement(By.linkText('Drag & Drop Sliders'));
    await dragDropSlidersLink.click();

    // Select the slider "Default value 15"
    const slider = await driver.findElement(By.xpath('//input[@value="15"]'));

    // Drag the bar to make it 95
  //  const size = await driver.manage().window().getRect();
    const sliderWidth = await driver.manage().window().getRect();
    const targetValue = 95;
    const targetOffset = Math.round((targetValue / 100) * sliderWidth.width);

    const actions = new Actions(driver);
    await actions.dragAndDropBy(slider, targetOffset, 0).perform();

    // Validate whether the range value shows 95
    const rangeValue = await slider.getAttribute('value');
    if (rangeValue == targetValue) {
      console.log('Slider validation passed.');
    } else {
      console.log('Slider validation failed.');
    }
  } finally {
    // Quit the driver after the test is complete
    await driver.quit();
  }
}

runTest();