/*
Author: Drew Theis
Version: 1.0.0
Date: 6/2/2022
Discription: I did it for the lolz 
*/
const puppeteer = require('puppeteer');
const startSite = "https://www.todayindestiny.com/activity/vow_of_the_disciple/flashcards"

async function startGame() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized'],
        defaultViewport: {
          width:1920,
          height:1080
        }});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080})
    await page.goto(startSite)
    await page.click("#flashcardIntro > div:nth-child(8) > table > tbody > tr:nth-child(6) > td:nth-child(1) > button")
    await page.waitForTimeout(1000)
    for (let i=1; i<137; i++) {
        let symbol = await page.$eval(`#myCarousel_grandmaster > div > div:nth-child(${i}) > div.votdSymbolFlashCardSymbolContainer > div`, el => el.textContent) 
        console.log(symbol)
        let answer = await page.$eval(`#myCarousel_grandmaster > div > div:nth-child(${i}) > div.votdSymbolFlashCardButtonContainer > table > tbody > tr:nth-child(2) > td:nth-child(1) > button`, element=> element.getAttribute("data-correct"))
        console.log(answer)
        for (let j=2; j<9; j++) {
            for (let k=1; k<3; k++) {
                let option = await page.$eval(`#myCarousel_grandmaster > div > div:nth-child(${i}) > div.votdSymbolFlashCardButtonContainer > table > tbody > tr:nth-child(${j}) > td:nth-child(${k}) > button`, element=> element.getAttribute("data-index"))
                console.log(option)
                if (option == answer) {
                    await page.click(`#myCarousel_grandmaster > div > div:nth-child(${i}) > div.votdSymbolFlashCardButtonContainer > table > tbody > tr:nth-child(${j}) > td:nth-child(${k}) > button`)
                    await page.waitForTimeout(1000)
                }}
            j++
}}}
startGame()