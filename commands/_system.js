const { formatp, runtime } = require("../mangoes/myFunc.js");
const { tiny } = require("@viper-x/fancytext");

module.exports = {
  name: "system",
  description: "To Check the system status",
  category: "user",
  async xstart(vorterx,m,{xReact}) {

  img = `https://i.ibb.co/GnZ0J9K/IMG-20230723-WA0085.jpg`;
  const os = require('os');
  const speed = require('performance-now');
  const latensi = speed() - speed();
    await xReact("📟");
  let aztec =  `*乂 SYSTEM - STATUS*\n\n`;
  aztec += `❲❒❳ *BotName :* ${process.env.BOTNAME}\n`;
  aztec += `❲❒❳ *Version :* 3.0.0*\n`;
  aztec += `❲❒❳ *RAM :* _${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}_\n`;
  aztec += `❲❒❳ *Speed : _${latensi.toFixed(4)}sec_*\n`;
  aztec += `❲❒❳ *Runtime :* _${runtime(process.uptime())}_\n`;
  aztec += `❲❒❳ *Platform :* ${os.platform()}.com\n`;
  aztec += `❲❒❳ *Platform ID :* ${os.hostname()}\n\n\n*©vorterx-team*`;
vorterx.sendMessage(m.from, {image: {url: img}, caption: tiny(aztec)})
      }
};
  
