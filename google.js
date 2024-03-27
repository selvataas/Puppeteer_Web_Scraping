const puppeteer = require("puppeteer");

// const zfc = async ()=>
async function zfc() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: false,
        userDataDir: "./tmp"

    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/travel/search?ts=CAESCgoCCAMKAggDEAAaIAoAEhwSFAoHCOcPEAgYHRIHCOcPEAgYHhgBMgQIABAAKgcKBToDVFJZ&ictx=3&hl=en&ap=KigKEgnMs4v2bN9DQBHCptCdaoJCQBISCZDYBfUZ4ENAEcKm0KvygkJAMAC6AQdyZXZpZXdz&qs=MiZDaGdJN0xUMmhzS1lsdTVIR2d3dlp5OHhNbWhzTUc0d09XY1FBUTgNSAA&ved=0CAAQ5JsGahcKEwjYidCTu4aBAxUAAAAAHQAAAAAQDA', {
        waitUntil: 'networkidle0'
    });

    var isimSel = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div > span > a'
    var yorumTarihSel = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div > span > span'
    const anaDiv = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div'
    var readMoreComments = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div.STQFb.eoY5cb > div.K7oBsc > div > span'
    var comments = '.Svr5cf.bKhjM > div > div.kVathc > div.STQFb.eoY5cb > div.K7oBsc'
    var oylama = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div > div.dA5Vzb'
    var roomsText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(3)'
    var readMoreRoomsText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div > div > div.kVathc.eoY5cb > div > div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(3)'
    var nearbyActivities = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(4)'
    var safetyText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(5)'
    var walkabilityText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(6)'
    var foodText = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(7)'
    var noteworthyDetails = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(8)'
    // var oylama = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(2)'
    var highlights = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc >div.STQFb.eoY5cb > div.X4nL7d > div:nth-child(2)'
    var readMoreOylama = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div > div.X4nL7d > div > div.dA5Vzb'
    var readMoreHightlights = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div > div.X4nL7d > div:nth-child(2)'
    var reviewCount = '#reviews > c-wiz > c-wiz > div > div > div > div > div.ChBWlb.TjtFVc > div > div > div.zhMoVd.nNUNpc > div.UkIqCb > div > span'
    var divCount = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div'
    
    var yorumSayisi = 10
    var moreTikla = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div:nth-child(1) > div > div > div.Svr5cf.bKhjM > div > div.kVathc.eoY5cb > div.OlkcBc > div > div > div > span > span'
    var footer = '#reviews > c-wiz > c-wiz > div > div > div > div > div.v85cbc > c-wiz > div.XgdUTc'
    const cevapSel = 'div > div.lU7Ape > div.n7uVJf'
    const oyOrani = 'div > div.GDWaad'
    var toplamYorum = []



    const kaydirmaSuresi = 1500;
    var divSayisi = 1
    while (divSayisi * 10 <= 50) {
        if (await page.$(divCount)) { //divCount selectorü, sayfada mevcut mu? page.$() = page.querySelector()
            var yorumSayisi = await page.$$eval(reviewCount, (rev) => { // reviewCount selectorünün özelliklerini al ve bir dizi olarak döndür
                return rev.map((x) => x.textContent);
            });
            yorumSayisi = yorumSayisi[0].split(' reviews')[0];  // text-sayi dönüşümünü yapar. örn: "140 reviews" metnindeki 140 sayısını alır
            page.keyboard.press('End') // sayfa içinde klavye tıklaması
        }
        await new Promise(r => setTimeout(r, kaydirmaSuresi));  // bekleme süresi
        var lastVal = divSayisi
        divSayisi = await page.$$eval(divCount, divs => divs.length) //divCount selectorünün özelliklerini al ve içindeki child sayısını döndür
        if (divSayisi == lastVal) { // sayfanın sonuna geldiğinde div sayısı yenilenmediyse sayfayı tekrar yukarı çıkar
            page.keyboard.press('PageUp')
        }
        console.log(divSayisi + " sayısı");
    }



    const coo = await page.evaluate((isimSel, anaDiv, comments, readMoreComments, oylama, readMoreOylama, cevapSel, oyOrani, yorumTarihSel,
        highlights, readMoreHightlights, roomsText, nearbyActivities, safetyText, walkabilityText, foodText, noteworthyDetails, readMoreRoomsText) => {
        return {
            isim: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(isimSel)).map(aa => aa.textContent)),

            yorum: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(comments)).map(aa => aa.textContent)),

            cevap: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(cevapSel)).map(y => y.textContent)),

            fazlaYorum: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(readMoreComments)).map(aa => aa.textContent)),

            oy: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(oylama)).map(aa => aa.textContent)),

            highlights: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(highlights)).map(aa => aa.textContent)),

            roomsTextt: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(roomsText)).map(aa => aa.textContent)),

            readMoreroomsTextt: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(readMoreRoomsText)).map(aa => aa.textContent)),

            nearbyActivitiess: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(nearbyActivities)).map(aa => aa.textContent)),

            safetyTextt: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(safetyText)).map(aa => aa.textContent)),


            walkabilityTextt: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(walkabilityText)).map(aa => aa.textContent)),

            foodTextt: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(foodText)).map(aa => aa.textContent)),

            noteworthyDetailss: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(noteworthyDetails)).map(aa => aa.textContent)),


            fazlaOy: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(readMoreOylama)).map(aa => aa.textContent)),

            oyOran: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(oyOrani)).map(aa => aa.textContent)),

            yorumTarih: Array.from(document.querySelectorAll(anaDiv))
                .map(x => Array.from(x.querySelectorAll(yorumTarihSel)).map(aa => aa.textContent)),
        }
    }, isimSel, anaDiv, comments, readMoreComments, oylama, readMoreOylama, cevapSel, oyOrani, yorumTarihSel, highlights, readMoreHightlights,
        roomsText, nearbyActivities, safetyText, walkabilityText, foodText, noteworthyDetails, readMoreRoomsText)


    for (let co = 0; co < coo.isim.length; co++) {

        // if (coo.isim[co] == "Cüneyt ÖKMEN") {
        //     var deger = coo.roomsTextt[co]
        //     var roomTextDeneme = deger.includes("Rooms") ? deger.split("Rooms")[1] : deger.includes("Hotel highlights") ? deger.split("Hotel highlights")[1] :
        //         deger.includes("Nearby activities") ? deger.split("Rooms")[1] : deger.includes("Nearby activities") ? deger.split("Nearby activities")[1]
        //             : deger.includes("Safety") ? deger.split("Safety")[1] : deger.includes("Walkability") ? deger.split("Walkability")[1] :
        //                 deger.includes("Food & drinks") ? deger.split("Food & drinks")[1] : deger.includes("Noteworthy details") ? deger.split("Noteworthy details")[1] : "";

        //     console.log("isim: " + coo.isim[co] + "\nyorum: " + (coo.yorum[co] == "" ? coo.fazlaYorum[co] != "" ? coo.fazlaYorum[co] : "Yorum yapmamış" : coo.yorum[co])
        //         + "\nyanit: " + (coo.cevap[co] != "" ? coo.cevap[co] : "Yanıt yok") + "\noy: " + (coo.oy[co] != "" ? coo.oy[co] : coo.fazlaOy[co] != "" ? coo.fazlaOy[co] : "Oy vermemiş")
        //         + "\nHighlights: " + coo.highlights[co] + "\noyOrani: " + coo.oyOran[co] + "\nyorum tarihi:" + coo.yorumTarih[co] +
        //         "\nRooms Text: " + deger + "\nnearbyActivities: " + coo.nearbyActivitiess[co] + "\nSafety Text: " + coo.safetyTextt[co] + "\nwalkability: " + coo.walkabilityTextt[co] + "\nfood Text: " + coo.foodTextt[co]
        //         + "\nnoteworthyDetails: " + coo.noteworthyDetailss[co] + "\n\n");

        //     var de = String(deger)
        //     console.log("\n\nRoom Text Deneme: " + de.split('Rooms')[1]);
        // }
        var deger = coo.roomsTextt[co]
        // var roomTextDeneme = deger.includes("Rooms") ? deger.split("Rooms")[1] : deger.includes("Hotel highlights") ? deger.split("Hotel highlights")[1] :
        //     deger.includes("Nearby activities") ? deger.split("Rooms")[1] : deger.includes("Nearby activities") ? deger.split("Nearby activities")[1]
        //         : deger.includes("Safety") ? deger.split("Safety")[1] : deger.includes("Walkability") ? deger.split("Walkability")[1] :
        //             deger.includes("Food & drinks") ? deger.split("Food & drinks")[1] : deger.includes("Noteworthy details") ? deger.split("Noteworthy details")[1] : "";

        console.log("isim: " + coo.isim[co] + "\nyorum: " + (coo.yorum[co] == "" ? coo.fazlaYorum[co] != "" ? coo.fazlaYorum[co] : "Yorum yapmamış" : coo.yorum[co])
            + "\nyanit: " + (coo.cevap[co] != "" ? coo.cevap[co] : "Yanıt yok") + "\noy: " + (coo.oy[co] != "" ? coo.oy[co] : coo.fazlaOy[co] != "" ? coo.fazlaOy[co] : "Oy vermemiş")
            + "\nHighlights: " + coo.highlights[co] + "\noyOrani: " + coo.oyOran[co] + "\nyorum tarihi:" + coo.yorumTarih[co] +
            "\nRooms Text: " + ((deger.includes('Safety') || coo.readMoreroomsTextt[co].includes('Safety'))) + "\nnearbyActivities: " + coo.nearbyActivitiess[co] + "\nSafety Text: " + coo.safetyTextt[co] + "\nwalkability: " + coo.walkabilityTextt[co] + "\nfood Text: " + coo.foodTextt[co]
            + "\nnoteworthyDetails: " + coo.noteworthyDetailss[co] + "\n\n");

        var de = String(deger)
        console.log("\n\nRoom Text Deneme: " + de.split('Rooms')[1]);
    }

    
    //await browser.close();



}

zfc();