const axios = require("axios")
const cheerio = require("cheerio")
const TelegramBot = require('node-telegram-bot-api');

const token = "5185322730:AAGgOzg0LNwL2wH0fo2BG36a9wF6v0Me6NM"
const bot = new TelegramBot(token, {polling: true});


const sendMessage = (title) => {
    bot.sendMessage(-4143039296 , `${title} published`)
}


const fetchProduct = (productUrl) => {

    axios.get(productUrl).then(data => {
        const $ = cheerio.load(data.data);
        let productTitle = $(".pr-name")
        productTitle.each((index , element) => {
            let title = $(element).find('a').text();

            psnTags.map((tag) => {
                const checkExist = title.includes(tag)

                if(checkExist){
                    sendMessage(title)
                }
            })
            
        })
        
    });

} 

const sellers = [
    "https://www.buysellvouchers.com/en/seller/info/Hamede1812/",
    "https://www.buysellvouchers.com/en/seller/info/kabos/",
    "https://www.buysellvouchers.com/en/seller/info/hira095690/"
  ];

  const psnTags = ["PSN" , "psn" , "Playstation" , "PlayStation" , "network" , "usa" , "USA" ]


  const Track = () => {
    sellers.map((prod) => {
        fetchProduct(prod);
    });
    setTimeout(Track, 300000);
  };
  
  Track();