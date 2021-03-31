import { browser, By, Key } from 'protractor';

describe("simple protractor test", () => {

    it("should navigate to google and find a title", async () => {
        browser.driver.get('https://www.google.com');
        expect(browser.driver.getTitle()).toContain("Google");
        let title = await browser.driver.getTitle();
        console.log(`await getTitle() returned : ${title}`);
    });

    it("should search for the term TypeScript", async () => {
        browser.driver.get('https://www.google.com');

        await browser.driver.findElement(
            By.css(`input[type=text]`))
            .sendKeys("TypeScript");

        await browser.driver.findElement(
            By.xpath(
                `//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input`
            )).sendKeys(Key.ENTER);

        let title = await browser.driver.getTitle();

        expect(title).toContain(`TypeScript`);
        console.log(`await getTitle() returned : ${title}`);
    });

});

