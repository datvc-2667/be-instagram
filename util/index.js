import * as puppeteer from "puppeteer";
import { PriceCafeModel } from '../models/PriceCafeModel.js';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  console.log("Browser openned");
  const page = await browser.newPage();
  const url = "https://giacaphe.com/gia-ca-phe-lam-dong/";
  await page.goto(url);
  console.log("Page loaded");


  await page.evaluate(async () => {
    try {
      const dataPriceCafe = [];
      let priceCafeElement = document.querySelector(
        ".gia--trung-binh > ._trung-binh-group > ._trung-binh-gia"
      );

      [
        ...document.querySelectorAll(
          ".gia--trung-binh + .table-content > table.price-table > tbody >  tr"
        ),
      ].map((elementDataPrice) => {
        const dataPriceArrayEle = [...elementDataPrice.querySelectorAll("td")];
        const dataPrice= dataPriceArrayEle.map((x) => x.innerHTML);
        dataPriceCafe.push({
          date: dataPrice[0],
          price: parseFloat(dataPrice[1].replace(",", "")),
          price_change: dataPrice[2],
        });
      });

      console.log(dataPriceCafe, 'dataPriceCafe');

      try {
        const post = new PriceCafeModel();
        await post.save();
    
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json({ error: err });
      }

      const pattern = /(\d+(,\d+)*)/;

      const match = pattern.exec(priceCafeElement.innerHTML);

      if (match) {
        // Remove commas and convert to number
        const price = parseFloat(match[1].replace(",", ""));
        console.log("priceCafeElements", price);
      } else {
        console.log("No price found");
      }
      return priceCafeElements;
    } catch (error) {
      console.log(error, "error");
    }
  });

  // await browser.close();
})();
