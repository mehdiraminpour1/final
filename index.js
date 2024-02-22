const axios = require("axios")
const cheerio = require("cheerio")
const TelegramBot = require('node-telegram-bot-api');

const token = "5185322730:AAGgOzg0LNwL2wH0fo2BG36a9wF6v0Me6NM"
const bot = new TelegramBot(token, {polling: true});


const sendMessage = (message) => {

    
    bot.sendMessage(-4189697153 , message)
        
}

const fetchProduct = (productUrl) => {


    axios.get(productUrl).then(data => {
        const $ = cheerio.load(data.data);
        let productTitle = $(".pr-name")


        productTitle.each((index , element) => {
            let productFinder = $(element).find('a')

            productFinder.each((index, value) => {
                const title = $(value).text()
                
           const result = $(value).attr("href")
           const fullLink  = "https://www.buysellvouchers.com" + result

           const finalResult = `Title: ${title} \n \n Link : ${fullLink}\n \n`
           sendMessage(finalResult)
            
           })
                
                    
           })
            
            })




} 

const sellers = [
    "https://www.buysellvouchers.com/en/seller/info/Hamede1812/",
    "https://www.buysellvouchers.com/en/seller/info/kabos/",
    "https://www.buysellvouchers.com/en/seller/info/hira095690/"

  ];




  const Track = () => {
    sellers.map((prod) => {
        fetchProduct(prod);
    });
    setTimeout(Track, 600000);
  };
  
  Track();