const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTestScenario() {
  // Set up the Selenium WebDriver
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Open the Selenium Playground page
    await driver.get('https://www.lambdatest.com/selenium-playground');

    // Wait for the page to load
    await driver.wait(until.elementLocated(By.linkText('Input Form Submit')), 5000);

    // 2. Click "Input Form Submit"
    await driver.findElement(By.linkText('Input Form Submit')).click();

    // 3. Assert "Please fill in the fields" error message
    await driver.wait(until.elementLocated(By.id('errormsg')), 5000);
    const errorMessage = await driver.findElement(By.id('errormsg')).getText();
    console.log('Error message:', errorMessage);
    // //You can use an assertion library like Chai or assert to validate the error message

    // 4. Fill in Name, Email, and other fields
    await driver.findElement(By.name('name')).sendKeys('John Doe');
    //await driver.findElement(By.name('email')).sendKeys('john.doe@example.com');
    // Fill in other fields similarly

    // 5. From the Country drop-down, select "United States" using the text property
    const countryDropdown = await driver.findElement(By.name('country'));
    await countryDropdown.click();
    const unitedStatesOption = await countryDropdown.findElement(By.xpath("//option[text()='United States']"));
    await unitedStatesOption.click();

    // 6. Fill all fields and click "Submit"
    await driver.findElement(By.linkText('Submit'));

    // 7. Once submitted, validate the success message
    await driver.wait(until.elementLocated(By.id('thanks')), 5000);
    const successMessage = await driver.findElement(By.id('thanks')).getText();
    console.log('Success message:', successMessage);
    // You can use an assertion library to validate the success message

  } finally {
    // Quit the WebDriver
    await driver.quit();
  }
}

// Run the test scenario
runTestScenario();