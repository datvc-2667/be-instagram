import * as cheerio from "cheerio";
import dayjs from "dayjs";

export default function getDataFromEle(html) {
  const $ = cheerio.load(html);
  let dataPriceCafe = [];
  const priceCafeElement = $("#gia-noi-dia > table.price-table > tbody >  tr");

  priceCafeElement.each(function () {
    const infoPrice = $(this).find("td");
    dataPriceCafe.push({
      date: $(infoPrice?.[0]).text(),
      price: parseFloat($(infoPrice?.[1]).text().replace(",", "")),
      price_change: parseFloat($(infoPrice?.[2]).text().replace(",", "")),
    });
  });

  const formatPriceChange = [
    {
      market: "dak_lak",
      value: dataPriceCafe[0].price_change,
    },
    {
      market: "lam_dong",
      value: dataPriceCafe[1].price_change,
    },
    {
      market: "gia_lai",
      value: dataPriceCafe[2].price_change,
    },
    {
      market: "dak_nong",
      value: dataPriceCafe[3].price_change,
    },
    {
      market: "ho_tieu",
      value: dataPriceCafe[4].price_change,
    },
  ];

  const dateTitle = $(".content-area.page-quotes > .page-title").text();

  const regex = /\d{1,2}\/\d{1,2}\/\d{4}/;

  const match = regex.exec(dateTitle);

  if (match) {
    const dateCurrent = match[0];
    const [day, month, year] = dateCurrent.split("/");
    const dateString = [year, month, day].join("-");
    const date = dayjs(dateString, "YYYY-MM-DD").toDate();

    return {
      dateString,
      date,
      priceChange: formatPriceChange,
    };
  } else {
    return "get day error";
  }
}
