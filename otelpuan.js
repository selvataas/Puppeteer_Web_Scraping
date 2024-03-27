const puppeteer = require("puppeteer");


const userText = ' body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.information>div.field>div.accommany-type>ul>li>span '
const nameSelector = ' body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.information>div.field>div.user>article>span'
const puantext = ' body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.messages > div.point-actions > div.point > span'
const yorumText = ' body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.messages > div.chat > div.review  '
const detailText = ' body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.messages > div.chat >div.review-reply > div.detail-point > ul > li > article> span '
const detailpuan = 'body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.messages > div.chat >div.review-reply > div.detail-point > ul > li > article> b'
const degerlendirmeText = 'body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.messages > div.chat > div.review>ul'
const degerlendirmeText2 = 'body > div.op-hd > div.op-hd-review > div.op-container > div.op-hd-review-wrapper > div.op-review-item-wrapper > div.list > div.op-review-item >div.messages > div.chat > div.review>ul>li'


async function start() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",

    });
    console.log("dsadsa");
    const page = await browser.newPage();
    await page.goto("https://otelpuan.com/Kemerbag-29-+12-Yas-", {
        waitUntil: "networkidle2",
        
    });


    const detayText = await page.evaluate((detailText, detailpuan, degerlendirmeText, yorumText, degerlendirmeText2) => {
        return {

            yorum: Array.from(document.querySelectorAll(yorumText))
                .map(x => x.textContent),
            metin: Array.from(document.querySelectorAll(detailText))
                .map(x => x.textContent),
            puan: Array.from(document.querySelectorAll(detailpuan))
                .map(x => x.textContent),
            degerlendirme: Array.from(document.querySelectorAll(degerlendirmeText2))
                .map(x => x.textContent),
            degerlendirmeLi: Array.from(document.querySelectorAll(degerlendirmeText))
                .map(x => x.querySelectorAll('li').length)

        }

    }, detailText, detailpuan, degerlendirmeText, yorumText, degerlendirmeText2)


    let count = 0
    for (let i = 0; i < detayText.yorum.length; i++) {

        if(i<=1)
            continue

        let yorumTextt = detayText.yorum[i] 
        let yemek = ''
        let oda = ''
        let hizmet = ''
        let yuzme = ''
        
        
        if(detayText.degerlendirmeLi[i] ==0){
            yemek = oda = hizmet = yuzme = 'degerlendirilmemis'
        }

        // console.log( detayText.degerlendirmeLi[i]);
        for(let j=0;  j < detayText.degerlendirmeLi[i]; j++){
            // console.log(detayText.degerlendirme[count] + " adsdsdsdsd");
            if(String(detayText.degerlendirme[count]).includes('Yemek')){
                yemek = detayText.degerlendirme[count]
            } 
            if(String(detayText.degerlendirme[count]).includes('Oda')){
                oda = detayText.degerlendirme[count]
            }
            if(String(detayText.degerlendirme[count]).includes('Hizmet')){
                hizmet = detayText.degerlendirme[count]

            }
            if(String(detayText.degerlendirme[count]).includes('yüzme')){
                yuzme = detayText.degerlendirme[count]
            }
                       
            count++
        } 
        console.log(yemek);
        console.log(oda);
        console.log(hizmet)
        console.log(yuzme)

        // console.log(yorumTextt + " " + String(yemek).trim() + " ddasdasdasdas")
    }
     await browser.close();

}
start();
