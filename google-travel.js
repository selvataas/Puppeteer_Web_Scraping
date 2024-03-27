/*
                                                         DOĞRU SELECTOR NASIL BULUNUR?
Aşağıdaki elementlerin içinden, class ismi "information" olan div elementinin altındaki "h1" etiketinin içeriğini almak istiyorum, peki bunu nasıl yaparım?
En üstten başlayarak elementleri sırayla yazarız, aynı elementten birden fazla varsa o elementi class ismiyle birlikte yazmamız gerekmektedir.
Örneğin "li" etiketi altında 2 adet div olsaydı, istediğimiz div elementini seçmek için bunu class ismiyle yazmamız gerekecekti. (div yerine div.classAdi şeklinde)
                             
div.op-hd-header > div.op-container > div.op-hd-header-wrapper > ul > li > div > h1

üstteki selector bize, istediğimiz h1 etiketinin içeriğini verir.

<div class="op-hd-header">
<div class="op-container">
<div class="op-hd-header-wrapper">
<ul>
<li>
<div class="information">
<h1>Mark Warner Phokaia Beach Resort</h1>
</div>
<div class="actions">
</div>
</li>
<li class="mobile-location">
<div class="information">
<ul>
<li>
<div class="menu-item">
<i class="op-icon-location"></i>
<span>
Foça, İzmir
</span>
</div>
<div class="menu-item map-link" onclick="getPoiDetailMapModal()">Haritada Göster</div>
</li>
</ul>
</div>
</li>
<li>
<div class="information">
<ul>
<li>
<div class="menu-item">
<i class="op-icon-messages dark"></i>
<b> 9.3
</b>
<small>Mükemmel</small>
</div>
<div class="menu-item review-link" onclick="changeSectionFocus('review')">
1.683 yorum
</div>
</li>
<li>
<div class="menu-item">
<i class="op-icon-location"></i>
<span>
Foça, İzmir
</span>
</div>
</li>
</ul>
</div>
<div class="actions">
<div class="buttons">
<div class="op-button-circle-icon s border " onclick="toggleHotelLike('Mark-Warner-Phokaia-Beach-Resort')" data-hoteldetail-like-button="">
<i class="op-icon-heart"></i>
</div>
<div class="op-button-circle-icon s border" onclick="toggleShareNavigation()" data-share-navigation="">
<i class="op-icon-export"></i>
</div>
<ul class="share-navigation" data-share-navigation="">
<li>
<aside onclick="handleShare('facebook')">
<i class="op-icon-facebook-circled"></i>
<span>Facebook</span>
</aside>
</li>
<li>
<aside onclick="handleShare('twitter')">
<i class="op-icon-twitter-circled"></i>
<span>Twitter</span>
</aside>
</li>
<li>
<aside onclick="handleShare('pinterest')">
<i class="op-icon-pinterest-circled"></i>
<span>Pinterest</span>
</aside>
</li>
<li>
<aside onclick="handleShare('whatsapp')">
<i class="op-icon-whatsapp-circled"></i>
<span>Whatsapp</span>
</aside>
</li>
<li>
<aside onclick="handleShare('email')">
<i class="op-icon-email-circled"></i>
<span>Email</span>
</aside>
</li>
</ul>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>

*/



const puppeteer = require ("puppeteer");
const fs = require("fs");


let urls = [
    'https://www.google.com/travel/search?q=cappadocia%20hotels&hl=en&sa=X&utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESCgoCCAMKAggDEAAaUwo1EjMyJTB4MTRkNjAyNWM2NzllMTY3OToweGY5MTc4YjczNDFkYzVlNDk6CkNhcHBhZG9jaWESGhIUCgcI5w8QCBgBEgcI5w8QCBgfGB4yAggCKgkKBToDVFJZGgA&qs=EgRDQkk9MihDaG9JdHNmRWxQX19fYm5hQVJvTkwyY3ZNVEZpTm1vd2FEUjZaQkFCOA0&ap=KigKEgmab7sHIEVDQBHrpL7MsmlBQBISCRuZOPO2W0NAEeukvowngEFAMAC6AQdyZXZpZXdz',
    //'https://www.google.com/travel/search?q=cappadocia%20hotels&hl=en&sa=X&utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESCgoCCAMKAggDEAAaVQo1EjMyJTB4MTRkNjAyNWM2NzllMTY3OToweGY5MTc4YjczNDFkYzVlNDk6CkNhcHBhZG9jaWESHBIUCgcI5w8QBxgXEgcI5w8QBxgYGAEyBAgAEAAqCQoFOgNUUlkaAA&qs=EgRDQkk9MtcBQ2hvSV90enkzdHZvbUtyZUFSb05MMmN2TVRGbU5UUXpOVFE0ZHhBQkdvQUJRVkI2U2w5d04xQktYMVpaTkVsRFVrNXZNMDFWUnpaZlNtVk9hMWt3YkZsdmFXbzBRM2hqZDBWbFFsRjRUVUYwZGtoUllVWnFOVjh5TVY5S1Z6RlFkMEpVUlVKeU5EUk5RbTFTTjJwc1NWRlNVbEYxWlRGQ1FtSnlPVFJ2WDB3dGQxbzNkUzFoVVZkbFpXWTJRbEkwVEVwMlRHZG9lbm8yZUdRM1RIaHdhRFk4DQ&ap=KigKEgmab7sHIEVDQBHrpL7MsmlBQBISCRuZOPO2W0NAEeukvowngEFAMAC6AQdyZXZpZXdz',
    //'https://www.google.com/travel/search?qs=MidDaGtJcF95NDBjeTJyY1ZzR2cwdlp5OHhNV05zZDIxb1kzUm1FQUVIAA&ap=KigKEgkDlEuA3VJDQBF3EdygUWpBQBISCeP-2b1ZU0NAEXcR3JWnakFAMAC6AQdyZXZpZXdz&ts=CAESCAoCCAMKAggDGioKDBIKCggvbS8wa3BnbhIaEhQKBwjnDxAIGAESBwjnDxAIGB8YHjICCAAqBwoFOgNUUlk&sa=X&hl=en',
    //'https://www.google.com/travel/search?q=cappadocia%20hotels&hl=en&sa=X&utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESCgoCCAMKAggDEAAaUwo1EjMyJTB4MTRkNjAyNWM2NzllMTY3OToweGY5MTc4YjczNDFkYzVlNDk6CkNhcHBhZG9jaWESGhIUCgcI5w8QCBgBEgcI5w8QCBgfGB4yAggCKgkKBToDVFJZGgA&qs=CAESBENDUT0yJ0Noa0l2dHlJNHV5ZzM4RmVHZzB2Wnk4eE1XMDNZbTFvYlhsbUVBRTgNSAA&ap=KigKEgm5x3aA585CQBEPAFXcC8FAQBISCTTMtjuSx0NAEQ8AVdxl_EFAMAG6AQdyZXZpZXdz',
]


// SELECTOR TANIMLAMALARI. Verileri çekerken bulunan selectorun benzersiz olması gerekir. Aksi halde istenmeyen veriler de çekilmiş olabilir.

var isimSel = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div > span > a'
var yorumTarihSel = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div > span > span'
const anaDiv = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div'
var readMoreComments = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div.STQFb.eoY5cb > div.K7oBsc > div > span'
var comments = '.Svr5cf.bKhjM > div > div.kVathc > div.STQFb.eoY5cb > div.K7oBsc'
var oylama = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div > div.dA5Vzb'
var roomsText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(3)'
var readMoreRoomsText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(3)'
var nearbyActivities = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(4)'
var readMoreNearbyActivities = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(4)'
var safetyText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(5)'
var readMoreSafetyText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(5)'
var walkabilityText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(6)'
var readMoreWalkabilityText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(6)'
var foodText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(7)'
var readMoreFoodText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(7)'
var noteworthyDetails = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(8)'
var readMoreWorthyDetails = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(8)'
// var oylama = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(2)'
var highlights = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(2)'
var readMoreOylama = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div > div.X4nL7d > div > div.dA5Vzb'
var readMoreHightlights = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div > div.X4nL7d > div:nth-child(2)'
var reviewCount = '#reviews > c-wiz > c-wiz > div > div > div > div > div.ChBWlb.TjtFVc > div > div > div.zhMoVd.nNUNpc > div.UkIqCb > div > span'
var divCount = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div'
var moreTikla = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div > div > div > span > span'
var footer = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div.XgdUTc'
const cevapSel = 'div > div.lU7Ape > div.n7uVJf'
const oyOrani = 'div > div.GDWaad'
const tripSel = 'div > div.ThUm5b'
var yeniSelector = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div.NkS78'

var readMoreRoomsTextYeni = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div:nth-child(1) > div > div > div.kVathc > div.STQFb.eoY5cb > div.X4nL7d > div.NkS78 > div:nth-child(1)'
var readMoreNearbyActivitiesYeni = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div.NkS78 > div:nth-child(2)'
var readMoreFoodTextYeni = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div.NkS78 > div:nth-child(3)'
var readMoreSafetyTextYeni = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div.NkS78 > div:nth-child(4)'
var readMoreWalkabilityTextYeni = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div.NkS78 > div:nth-child(5)'
var readMoreWorthyDetailsYeni = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div.NkS78 > div:nth-child(6)'
// end of SELECTOR TANIMLAMALARI

const kaydirmaSuresi = 2500;
var divSayisi = 1
var yorumSayisi = 10

const zfc = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        // headless: false,
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        defaultViewport: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();


    for (var i = 0; i < urls.length; i++) {
        await page.goto(urls[i], {
            waitUntil: 'networkidle2'   // sayfa tamamen yüklenene kadar bekleyecek
        });

        divSayisi = 1

        while (divSayisi * 10 <= 100) {
            if (await page.$(divCount)) { //divCount selectorü, sayfada mevcut mu? page.$() = page.querySelector()
                yorumSayisi = await page.$$eval(reviewCount, (rev) => { // reviewCount selectorünün özelliklerini al ve bir dizi olarak döndür
                    return rev.map((x) => x.textContent);
                });
                yorumSayisi = yorumSayisi[0].split(' reviews')[0].replace(',', ''); // text-sayi dönüşümünü yapar. örn: "140 reviews" metnindeki 140 sayısını alır
                page.keyboard.press('End') // sayfa içinde klavye tıklaması
            }
            await new Promise(r => setTimeout(r, kaydirmaSuresi)); // bekleme süresi
            var lastVal = divSayisi
            divSayisi = await page.$$eval(divCount, divs => divs.length) //divCount selectorünün özelliklerini al ve içindeki child sayısını döndür
            if (divSayisi == lastVal) { // sayfanın sonuna geldiğinde div sayısı yenilenmediyse sayfayı tekrar yukarı çıkar
                page.keyboard.press('PageUp')
            }
        }

        const coo = await page.evaluate((isimSel, anaDiv, comments, readMoreComments, oylama, readMoreOylama, cevapSel, oyOrani, yorumTarihSel, highlights, readMoreHightlights, roomsText, nearbyActivities, safetyText,
            walkabilityText, foodText, noteworthyDetails, readMoreRoomsText, readMoreNearbyActivities, readMoreSafetyText, readMoreWalkabilityText, readMoreFoodText, readMoreWorthyDetails,
            readMoreRoomsTextYeni, readMoreNearbyActivitiesYeni, readMoreFoodTextYeni, readMoreSafetyTextYeni, readMoreWalkabilityTextYeni, readMoreWorthyDetailsYeni, tripSel) => {
            return {
                isim: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(isimSel)).map(aa => aa.textContent)),

                yorum: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(comments)).map(aa => aa.textContent)),

                cevap: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(cevapSel)).map(y => y.textContent)),                                /* 
                                                                                                                                aynı selectorden birden fazla veri geldiği için verileri dizi olarak tutuyoruz.
                                                                                                                        
                                                                                                                                */

                fazlaYorum: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreComments)).map(aa => aa.textContent)),

                oy: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(oylama)).map(aa => aa.textContent)),

                highlights: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(highlights)).map(aa => aa.textContent)),

                readMoreHighlightss: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreHightlights)).map(aa => aa.textContent)),

                roomsTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(roomsText)).map(aa => aa.textContent)),

                readMoreroomsTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreRoomsText)).map(aa => aa.textContent)),

                readMoreRoomsTexttYeni: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreRoomsTextYeni)).map(aa => aa.textContent)),

                nearbyActivitiess: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(nearbyActivities)).map(aa => aa.textContent)),

                readMoreNearbyActivitiess: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreNearbyActivities)).map(aa => aa.textContent)),

                nearbyActivitiessYeni: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreNearbyActivitiesYeni)).map(aa => aa.textContent)),

                safetyTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(safetyText)).map(aa => aa.textContent)),

                readMoreSafetyTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreSafetyText)).map(aa => aa.textContent)),

                safetyTexttYeni: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreSafetyTextYeni)).map(aa => aa.textContent)),

                walkabilityTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(walkabilityText)).map(aa => aa.textContent)),

                readMoreWalkabilityTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreWalkabilityText)).map(aa => aa.textContent)),

                walkabilityTexttYeni: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreWalkabilityTextYeni)).map(aa => aa.textContent)),

                foodTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(foodText)).map(aa => aa.textContent)),

                foodTexttYeni: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreFoodTextYeni)).map(aa => aa.textContent)),

                readMoreFoodTextt: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreFoodText)).map(aa => aa.textContent)),

                noteworthyDetailss: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(noteworthyDetails)).map(aa => aa.textContent)),

                readMoreNoteworthyDetailss: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreWorthyDetails)).map(aa => aa.textContent)),

                noteworthyDetailssYeni: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreWorthyDetailsYeni)).map(aa => aa.textContent)),

                fazlaOy: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(readMoreOylama)).map(aa => aa.textContent)),

                oyOran: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(oyOrani)).map(aa => aa.textContent)),

                yorumTarih: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(yorumTarihSel)).map(aa => aa.textContent)),
                tripType: Array.from(document.querySelectorAll(anaDiv))
                    .map(x => Array.from(x.querySelectorAll(tripSel)).map(aa => aa.textContent)),
            }
        }, isimSel, anaDiv, comments, readMoreComments, oylama, readMoreOylama, cevapSel, oyOrani, yorumTarihSel, highlights, readMoreHightlights, roomsText, nearbyActivities, safetyText, walkabilityText, foodText,
            noteworthyDetails, readMoreRoomsText, readMoreNearbyActivities, readMoreSafetyText, readMoreWalkabilityText, readMoreFoodText, readMoreWorthyDetails, readMoreRoomsTextYeni, readMoreNearbyActivitiesYeni,
            readMoreFoodTextYeni, readMoreSafetyTextYeni, readMoreWalkabilityTextYeni, readMoreWorthyDetailsYeni, tripSel)


        for (let co = 0; co < coo.isim.length; co++) {
            var roomYorumu = ''
            var highlightsYorumu = ''
            var nearbyActivitiesYorumu = ''
            var safetyYorumu = ''
            var foodYorumu = ''
            var walkabilityYorumu = ''
            var noteWorthyDetailsYorumu = ''
            var oyRate = ''

            roomYorumu = (String(coo.readMoreRoomsTexttYeni[co]).includes('Rooms') ? coo.readMoreRoomsTexttYeni[co] : String(coo.safetyTexttYeni[co]).includes('Rooms') ? coo.safetyTexttYeni[co] :                     // Bu verilerin sırası sabit olmadığı için tüm ihtimallerin kontrolünü yapıp, değişkene doğru veriyi atıyoruz.
                String(coo.nearbyActivitiessYeni[co]).includes('Rooms') ? coo.nearbyActivitiessYeni[co] : String(coo.foodTexttYeni[co]).includes('Rooms') ? coo.foodTexttYeni[co] :
                    String(coo.noteworthyDetailssYeni[co]).includes('Rooms') ? coo.noteworthyDetailssYeni[co] : String(coo.walkabilityTexttYeni[co]).includes('Rooms') ? coo.walkabilityTexttYeni[co] :
                        String(coo.highlights[co]).includes('Rooms') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes(('Rooms')) ? coo.readMoreHighlightss[co] :
                            String(coo.roomsTextt[co]).includes('Rooms') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Rooms') ? coo.readMoreroomsTextt[co] :
                                String(coo.nearbyActivitiess[co]).includes('Rooms') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Rooms') ? coo.readMoreNearbyActivitiess[co] :
                                    String(coo.safetyTextt[co]).includes('Rooms') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Rooms') ? coo.readMoreSafetyTextt[co] :
                                        String(coo.walkabilityTextt[co]).includes('Rooms') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Rooms') ? coo.readMoreWalkabilityTextt[co] :
                                            String(coo.foodTextt[co]).includes('Rooms') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Rooms') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Rooms') ? coo.noteworthyDetailss[co]
                                                : String(coo.readMoreNoteworthyDetailss[co]).includes('Rooms') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            roomYorumu = String(roomYorumu).split('Rooms')[1] !== undefined ? String(roomYorumu).split(/Rooms(.*)/s)[1] : 'Yorum yok'

            highlightsYorumu = (String(coo.highlights[co]).includes('Hotel highlights') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes(('Hotel highlights')) ? coo.readMoreHighlightss[co] :
                String(coo.roomsTextt[co]).includes('Hotel highlights') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Hotel highlights') ? coo.readMoreroomsTextt[co] :
                    String(coo.nearbyActivitiess[co]).includes('Hotel highlights') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Hotel highlights') ? coo.readMoreNearbyActivitiess[co] :
                        String(coo.safetyTextt[co]).includes('Hotel highlights') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Hotel highlights') ? coo.readMoreSafetyTextt[co] :
                            String(coo.walkabilityTextt[co]).includes('Hotel highlights') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Hotel highlights') ? coo.readMoreWalkabilityTextt[co] :
                                String(coo.foodTextt[co]).includes('Hotel highlights') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Hotel highlights') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Hotel highlights') ? coo.noteworthyDetailss[co]
                                    : String(coo.readMoreNoteworthyDetailss[co]).includes('Hotel highlights') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            highlightsYorumu = String(highlightsYorumu).split('Hotel highlights')[1] !== undefined ? String(highlightsYorumu).split(/Hotel highlights(.*)/s)[1] : 'Yorum yok'

            nearbyActivitiesYorumu = (String(coo.readMoreRoomsTexttYeni[co]).includes('Nearby activities') ? coo.readMoreRoomsTexttYeni[co] : String(coo.safetyTexttYeni[co]).includes('Nearby activities') ? coo.safetyTexttYeni[co] :
                String(coo.nearbyActivitiessYeni[co]).includes('Nearby activities') ? coo.nearbyActivitiessYeni[co] : String(coo.foodTexttYeni[co]).includes('Nearby activities') ? coo.foodTexttYeni[co] :
                    String(coo.noteworthyDetailssYeni[co]).includes('Nearby activities') ? coo.noteworthyDetailssYeni[co] : String(coo.walkabilityTexttYeni[co]).includes('Nearby activities') ? coo.walkabilityTexttYeni[co] :
                        String(coo.highlights[co]).includes('Nearby activities') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes(('Nearby activities')) ? coo.readMoreHighlightss[co] :
                            String(coo.roomsTextt[co]).includes('Nearby activities') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Nearby activities') ? coo.readMoreroomsTextt[co] :
                                String(coo.nearbyActivitiess[co]).includes('Nearby activities') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Nearby activities') ? coo.readMoreNearbyActivitiess[co] :
                                    String(coo.safetyTextt[co]).includes('Nearby activities') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Nearby activities') ? coo.readMoreSafetyTextt[co] :
                                        String(coo.walkabilityTextt[co]).includes('Nearby activities') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Nearby activities') ? coo.readMoreWalkabilityTextt[co] :
                                            String(coo.foodTextt[co]).includes('Nearby activities') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Nearby activities') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Nearby activities') ? coo.noteworthyDetailss[co]
                                                : String(coo.readMoreNoteworthyDetailss[co]).includes('Nearby activities') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            nearbyActivitiesYorumu = String(nearbyActivitiesYorumu).split('Nearby activities')[1] !== undefined ? String(nearbyActivitiesYorumu).split(/Nearby activities(.*)/s)[1] : 'Yorum yok'

            safetyYorumu = (String(coo.readMoreRoomsTexttYeni[co]).includes('Safety') ? coo.readMoreRoomsTexttYeni[co] : String(coo.safetyTexttYeni[co]).includes('Safety') ? coo.safetyTexttYeni[co] :
                String(coo.nearbyActivitiessYeni[co]).includes('Safety') ? coo.nearbyActivitiessYeni[co] : String(coo.foodTexttYeni[co]).includes('Safety') ? coo.foodTexttYeni[co] :
                    String(coo.noteworthyDetailssYeni[co]).includes('Safety') ? coo.noteworthyDetailssYeni[co] : String(coo.walkabilityTexttYeni[co]).includes('Safety') ? coo.walkabilityTexttYeni[co] :
                        String(coo.highlights[co]).includes('Safety') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes(('Safety')) ? coo.readMoreHighlightss[co] :
                            String(coo.roomsTextt[co]).includes('Safety') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Safety') ? coo.readMoreroomsTextt[co] :
                                String(coo.nearbyActivitiess[co]).includes('Safety') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Safety') ? coo.readMoreNearbyActivitiess[co] :
                                    String(coo.safetyTextt[co]).includes('Safety') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Safety') ? coo.readMoreSafetyTextt[co] :
                                        String(coo.walkabilityTextt[co]).includes('Safety') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Safety') ? coo.readMoreWalkabilityTextt[co] :
                                            String(coo.foodTextt[co]).includes('Safety') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Safety') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Safety') ? coo.noteworthyDetailss[co]
                                                : String(coo.readMoreNoteworthyDetailss[co]).includes('Safety') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            safetyYorumu = String(safetyYorumu).split('Safety')[1] !== undefined ? String(safetyYorumu).split(/Safety(.*)/s)[1] : 'Yorum yok'

            foodYorumu = (String(coo.readMoreRoomsTexttYeni[co]).includes('Food & drinks') ? coo.readMoreRoomsTexttYeni[co] : String(coo.safetyTexttYeni[co]).includes('Food & drinks') ? coo.safetyTexttYeni[co] :
                String(coo.nearbyActivitiessYeni[co]).includes('Food & drinks') ? coo.nearbyActivitiessYeni[co] : String(coo.foodTexttYeni[co]).includes('Food & drinks') ? coo.foodTexttYeni[co] :
                    String(coo.noteworthyDetailssYeni[co]).includes('Food & drinks') ? coo.noteworthyDetailssYeni[co] : String(coo.walkabilityTexttYeni[co]).includes('Food & drinks') ? coo.walkabilityTexttYeni[co] :
                        String(coo.highlights[co]).includes('Food & drinks') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes(('Food & drinks')) ? coo.readMoreHighlightss[co] :
                            String(coo.roomsTextt[co]).includes('Food & drinks') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Food & drinks') ? coo.readMoreroomsTextt[co] :
                                String(coo.nearbyActivitiess[co]).includes('Food & drinks') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Food & drinks') ? coo.readMoreNearbyActivitiess[co] :
                                    String(coo.safetyTextt[co]).includes('Food & drinks') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Food & drinks') ? coo.readMoreSafetyTextt[co] :
                                        String(coo.walkabilityTextt[co]).includes('Food & drinks') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Food & drinks') ? coo.readMoreWalkabilityTextt[co] :
                                            String(coo.foodTextt[co]).includes('Food & drinks') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Food & drinks') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Food & drinks') ? coo.noteworthyDetailss[co]
                                                : String(coo.readMoreNoteworthyDetailss[co]).includes('Food & drinks') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            foodYorumu = String(foodYorumu).split('Food & drinks')[1] !== undefined ? String(foodYorumu).split(/Food & drinks(.*)/s)[1] : 'Yorum yok'

            walkabilityYorumu = (String(coo.readMoreRoomsTexttYeni[co]).includes('Walkability') ? coo.readMoreRoomsTexttYeni[co] : String(coo.safetyTexttYeni[co]).includes('Walkability') ? coo.safetyTexttYeni[co] :
                String(coo.nearbyActivitiessYeni[co]).includes('Walkability') ? coo.nearbyActivitiessYeni[co] : String(coo.foodTexttYeni[co]).includes('Walkability') ? coo.foodTexttYeni[co] :
                    String(coo.noteworthyDetailssYeni[co]).includes('Walkability') ? coo.noteworthyDetailssYeni[co] : String(coo.walkabilityTexttYeni[co]).includes('Walkability') ? coo.walkabilityTexttYeni[co] :
                        String(coo.highlights[co]).includes('Walkability') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes('Walkability') ? coo.readMoreHighlightss[co] :
                            String(coo.roomsTextt[co]).includes('Walkability') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Walkability') ? coo.readMoreroomsTextt[co] :
                                String(coo.nearbyActivitiess[co]).includes('Walkability') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Walkability') ? coo.readMoreNearbyActivitiess[co] :
                                    String(coo.safetyTextt[co]).includes('Walkability') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Walkability') ? coo.readMoreSafetyTextt[co] :
                                        String(coo.walkabilityTextt[co]).includes('Walkability') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Walkability') ? coo.readMoreWalkabilityTextt[co] :
                                            String(coo.foodTextt[co]).includes('Walkability') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Walkability') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Walkability') ? coo.noteworthyDetailss[co]
                                                : String(coo.readMoreNoteworthyDetailss[co]).includes('Food & drinks') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            walkabilityYorumu = String(walkabilityYorumu).split('Walkability')[1] !== undefined ? String(walkabilityYorumu).split(/Walkability(.*)/s)[1] : 'Yorum yok'

            noteWorthyDetailsYorumu = (String(coo.readMoreRoomsTexttYeni[co]).includes('Noteworthy details') ? coo.readMoreRoomsTexttYeni[co] : String(coo.safetyTexttYeni[co]).includes('Noteworthy details') ? coo.safetyTexttYeni[co] :
                String(coo.nearbyActivitiessYeni[co]).includes('Noteworthy details') ? coo.nearbyActivitiessYeni[co] : String(coo.foodTexttYeni[co]).includes('Noteworthy details') ? coo.foodTexttYeni[co] :
                    String(coo.noteworthyDetailssYeni[co]).includes('Noteworthy details') ? coo.noteworthyDetailssYeni[co] : String(coo.walkabilityTexttYeni[co]).includes('Noteworthy details') ? coo.walkabilityTexttYeni[co] :
                        String(coo.highlights[co]).includes('Noteworthy details') ? coo.highlights[co] : String(coo.readMoreHighlightss[co]).includes('Noteworthy details') ? coo.readMoreHighlightss[co] :
                            String(coo.roomsTextt[co]).includes('Noteworthy details') ? coo.roomsTextt[co] : String(coo.readMoreroomsTextt[co]).includes('Noteworthy details') ? coo.readMoreroomsTextt[co] :
                                String(coo.nearbyActivitiess[co]).includes('Noteworthy details') ? coo.nearbyActivitiess[co] : String(coo.readMoreNearbyActivitiess[co]).includes('Noteworthy details') ? coo.readMoreNearbyActivitiess[co] :
                                    String(coo.safetyTextt[co]).includes('Noteworthy details') ? coo.safetyTextt[co] : String(coo.readMoreSafetyTextt[co]).includes('Noteworthy details') ? coo.readMoreSafetyTextt[co] :
                                        String(coo.walkabilityTextt[co]).includes('Noteworthy details') ? coo.walkabilityTextt[co] : String(coo.readMoreWalkabilityTextt[co]).includes('Noteworthy details') ? coo.readMoreWalkabilityTextt[co] :
                                            String(coo.foodTextt[co]).includes('Noteworthy details') ? coo.foodTextt[co] : String(coo.readMoreFoodTextt[co]).includes('Noteworthy details') ? coo.readMoreFoodTextt[co] : String(coo.noteworthyDetailss[co]).includes('Noteworthy details') ? coo.noteworthyDetailss[co]
                                                : String(coo.readMoreNoteworthyDetailss[co]).includes('Food & drinks') ? coo.readMoreNoteworthyDetailss[co] : 'Yorum yok')
            noteWorthyDetailsYorumu = String(noteWorthyDetailsYorumu).split('Noteworthy details')[1] !== undefined ? String(noteWorthyDetailsYorumu).split(/Noteworthy details(.*)/s)[1] : 'Yorum yok'

            oyRate = coo.oy[co] != "" ? coo.oy[co] : coo.fazlaOy[co] != "" ? coo.fazlaOy[co] : 'Oy vermemiş'
            oyRate = String(oyRate).split(',')
            var roomsRate = String(oyRate[0]).split('Rooms')[1] !== undefined ? String(oyRate[0]).split('Rooms')[1] : 'Oy vermemiş'
            var serviceRate = String(oyRate[1]).split('Service')[1] !== undefined ? String(oyRate[1]).split('Service')[1] : 'Oy vermemiş'
            var locRate = String(oyRate[2]).split('Location')[1] !== undefined ? String(oyRate[2]).split('Location')[1] : 'Oy vermemiş'
            var trippType = coo.tripType[co] != "" ? coo.tripType[co][0] : "Yok"
            console.log("isim: " + coo.isim[co] + "\nyorum: " + (coo.yorum[co] == "" ? coo.fazlaYorum[co] != "" ? coo.fazlaYorum[co] : "Yorum yapmamış" : coo.yorum[co])
                + "\nyanit: " + (coo.cevap[co] != "" ? coo.cevap[co] : "Yanıt yok") + "\nRoom Rate: " + roomsRate + "\nService Rate: " + serviceRate + "\nLocation Rate: " + locRate
                + "\noyOrani: " + coo.oyOran[co] + "\nyorum tarihi:" + coo.yorumTarih[co] +  "\nHighlights: " + highlightsYorumu
                + "\nRooms Text: " + roomYorumu + "\nnearbyActivities: " + nearbyActivitiesYorumu + "\nSafety Text: " + safetyYorumu + "\nwalkability: " + walkabilityYorumu + "\nfood Text: " + foodYorumu
                + "\nnoteworthyDetails: " + noteWorthyDetailsYorumu + "\n\n");
        }
    }

    const data = coo;
    const jsonData = JSON.stringify(data, null, 2); 
fs.writeFileSync('veri.json', jsonData, 'utf-8'); 

console.log('Veriler JSON olarak kaydedildi.');
    await browser.close();
}

zfc();
