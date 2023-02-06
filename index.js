const TelegramBot = require("node-telegram-bot-api");

const token = `5822446202:AAEOFqPu1TjbTPKR1JhQhYOzpBcr2OZZe_U`;
const webAppUrl = "https://strong-starburst-f8427e.netlify.app/";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    const message =
      "Привет, Любимка❣️! Предлагаю не терять ни секунды и перейти к покупочкам!";
    await bot.sendMessage(chatId, message, {
      reply_markup: {
        keyboard: [
          [{ text: "Перейти к покупочкам🧶", web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    const data = JSON.parse(msg?.web_app_data?.data);
    console.log(data);
    await bot.sendMessage(
      chatId,
      `
Спасибо за обратную связь!\n
Ваша страна: ${data?.country || "вы забыли указать :("}\n
Ваша улица: ${data?.street || "вы забыли указать :("}\n
Ваш почтовый индекс:: ${data?.postindex || "вы забыли указать :("}\n
Ваша номер телефон: ${data?.phone || "вы забыли указать :("}\n
    `
    );

    await bot.sendMessage(chatId, "Все верно?", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Да", callback_data: "yes" }, { text: "Нет", callback_data: "no" }],
        ],
      },
    });
  }
  
});


bot.on('callback_query', (query) => {
  const chatId = msg.chat.id;
  switch (query.data) {
    case 'yes':
      bot.sendMessage(chatId, 'Супер! Для оплаты мы с вами 🧶свяжимся🧶');
      break;
    case 'no':
      bot.sendMessage(chatId, 'Очень грустно, но у вас все еще есть возможность все исправить!');
      break;
  }
})