const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.lambdatest.com/selenium-playground');

    // Click "Simple Form Demo" under Input Forms
    const simpleFormLink = await driver.findElement(By.linkText('Simple Form Demo'));
    
   // await simpleFormLink.click();

    // Validate that the URL contains "simple-form-demo"
    const currentURL = await driver.getCurrentUrl();
    if (currentURL.includes('simple-form-demo')) {
      console.log('URL validation passed.');
    } else {
      console.log('URL validation failed.');
    }

    // Create a variable for a string value
    const message = 'Welcome to Lambda Test';

    // Use the variable to enter values in the "Enter Message" text box
    const messageTextBox = await driver.findElement(By.xpath('//input[@id="user-message"]'));
  
    await messageTextBox.sendKeys(message, Key.RETURN);

    // Click "Get Checked Value"
    const getCheckedValueButton = await driver.findElement(By.xpath('//button[text()="Get Checked Value"]'));

    await getCheckedValueButton.click();

    // Validate whether the same text message is displayed in the right-hand panel
    const displayedMessage = await driver.findElement(By.id('display')).getText();
    if (displayedMessage === message) {
      console.log('Message validation passed.');
    } else {
      console.log('Message validation failed.');
    }
  } finally {
    // Quit the driver after the test is complete
    await driver.quit();
  }
}

runTest();