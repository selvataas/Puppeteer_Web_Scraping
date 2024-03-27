const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const { request } = require('http');
const { get } = require('https');



async function getNewsDataandSendToBackend(urls) {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    });
    
    const allNewsData = [];

    try {

      const page = await browser.newPage();
      await page.setRequestInterception(true);

      page.on('request', async(request) => {
        if (request.url().includes('ajax-call-url')) {

          request.respond({body: 'Güncellenmiş veri'});

        } else {

          request.continue();
        }

      });


        for (const url of urls) {
            const page = await browser.newPage();
            await page.goto(url, {
                waitUntil : 'domcontentloaded'
            });
        
      const paragraphs = await page.$$eval('.news__desc--txt > p ', paragraphs => paragraphs.map(p =>p.textContent.trim()));
      const allNewsDetail = paragraphs.join(' ');
      const cleanallNewsDetail = allNewsDetail.replace(/\s+/g, ' ');


      //const detailSelector = 'body > div.wrapper > div.subpage-wrapper > div > div.section--one > div > div > div.news__desc--block.col-xl-9.col-lg-9.pad0 > div.news__desc--txt > p';
      const dateSelector = 'body > div.wrapper > div.subpage-wrapper > div > div.section--one > div > div > div.news__desc--block.col-xl-9.col-lg-9.pad0 > div.news__desc--social > div.sub-news__date > div > p';
      const headerSelector = 'body > div.wrapper > div.subpage-wrapper > div > div.section--one > div > div > div.news__desc--block.col-xl-9.col-lg-9.pad0 > h2';
      const imageUrlSelector = 'body > div.wrapper > div.subpage-wrapper > div > div.head > div.custom-container > div > div.head__news.col-xl-9.col-lg-9.pad0 > div > img';
  
      //const detail = await page.$eval(detailSelector, detailElement => detailElement.textContent.trim());
      const date = await page.$eval(dateSelector, dateElement => dateElement.textContent.trim());
      const header = await page.$eval(headerSelector, headerElement => headerElement.textContent.trim());
      const imageUrl = await page.$eval(imageUrlSelector, imgElement => imgElement.src);
  
      const newsData = {
        //detail,
        header,
        date,
        imageUrl,
        allNewsDetail: cleanallNewsDetail,
        
      };
  
      console.log(newsData);
      allNewsData.push(newsData);
      await page.close();
    }

    const apiUrl = ''
    const response = await axios.post(apiUrl, allNewsData);

    
      console.error('API Response:', response.data);
    } catch (error) {
      console.error('Hata', error);
    } finally {
      await browser.close();
    }

  }
  
  const urls = [
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1705',
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1701',
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1694',
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1688',
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1540',
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1526',
    'https://www.musiad.org.tr/icerik/haber-detay-39/p-1524',
    //'https://www.musiad.org.tr/icerik/haber-detay-39/p-1522',

];

  //getNewsData(urls);
getNewsDataandSendToBackend(urls);
