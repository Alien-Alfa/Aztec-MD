const fs = require("fs")
const os = require('os');
const {runtime} = require("../mangoes/myFunc.js");
const moment = require("moment-timezone");
const { tiny } = require("@viper-x/fancytext");

module.exports = {
  name: "menu",
  description: "The list of all command",
  category: "General",
 async xstart(vorterx, m, { commands, args, xReact })  {
    await xReact("📔");
 // let aztec = fs.readFileSync("./lib/connect/vorterx.png");
    //let anexa = fs.readFileSync("./lib/connect/anexa.png");
     let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Johannesburg" })
        .split(",");
      const { pushName, sender } = m;
    if (args[0]) {
      let data = [];
      let name = args[0].toLowerCase();
      let cmd =
        commands.get(name) ||
        Array.from(commands.values()).find((v) => v.alias.includes(name));
} else {
      const { pushName, sender } = m;
      let cm = commands.keys();
      let category = [];

      for (let cmd of cm) {
        let info = commands.get(cmd);
        if (!cmd) continue;
        if (!info.category || info.category === "private")
           continue;
        if (Object.keys(category).includes(info.category))
          category[info.category].push(info);
        else {
          category[info.category] = [];
          category[info.category].push(info);
        }
      }
//-----------------------------------------------------------------------
       var up_up, up_mid, up_btm, ctgry_L, ctgry_R, cmd_L, ctgry_end
            var random_menu = 0 ;
            if (!process.env.MENU) { random_menu = Math.floor(Math.random() * 0) + 1; } //make Sure to replace '2' with Exact number of how many styles you have added---- Then it takes randome_STYLE,When user did't Put any Value in 'process.env.MENU'
            
            if (random_menu == 1 || process.env.MENU.trim().startsWith("1") || process.env.MENU.toLowerCase().includes("suhail-md")) {            
              up_up =  `╭────《  *${tiny(process.env.BOTNAME)}*  》────⊷\n│ ╭──────✧❁✧──────◆`
              up_mid = `│`
              up_btm = `│ ╰──────✧❁✧──────◆\n╰══════════════════⊷`
              ctgry_L =  `╭────❏`
              ctgry_R =  `❏ \n`
           cmd_L =     `│`
              ctgry_end =`\n╰━━━━━━━━━━━━━━──⊷`
            }else{
              up_up =  `┏━━⟪ *${tiny(process.env.BOTNAME)}* ⟫━━⦿`
              up_mid = `┃ ✗`
              up_btm = `┗━━━━━━━━━━━━━━⦿`
              ctgry_L  = `\n┌──『`
              ctgry_R  = `』──❖\n\n`
            cmd_L = ` | `
              ctgry_end =`\n\n└─────────◉\n`
            
      }
                
    
    //  ADD MORE STYLES HERE ACCORDING TO YOU AND ADD ELSE IF STATEMENT THROUGH BELLOW SYNTEX
    // if (random_menu == 2(For_Menu_Style_no_2) || process.env.MENU.trim().startsWith("MENU_STYLE_NO") || process.env.MENU.toLowerCase().includes("Bot_NAME"))
    // if user put NUMBER or GIVEN NAME_ Then check statement here and , select the STYLE_MENU Through that NUMBER or GIVEN NAME 
//------------------------------------------------------------------------------
      
let amarok = `${up_up}
${up_mid} User: ${tiny(m.pushName)}
${up_mid} Botname: ${tiny(process.env.BOTNAME)}
${up_mid} Prefix: ${tiny(process.env.Prefix)}
${up_mid} Runtime: ${tiny(runtime(process.uptime()))}
${up_mid} Time: ${tiny(time)}
${up_mid} Date: ${tiny(date)}
${up_btm}\n
`;

const keys = Object.keys(category);
      for (const key of keys) {
        amarok += `${ctgry_L}  *${tiny(key.toLowerCase())}*  ${ctgry_R}${category[key]
.map((cmd) => `${cmd_L}${prefix + cmd.name}`)
.join("\n")} ${ctgry_end}\n`;
      }
      amarok += `_📔Send ${prefix}menu <command name> to get detailed information of specific command_`;

      let DieGosOn = {
        image: aztec,
        caption: tiny(amarok),
        footer: '©aztec md',
        headerType: 2,
        contextInfo: {
            externalAdReply: {
            title: '𝑉𝑂𝑅𝑇𝐸𝑅𝑋 𝐵𝑂𝑇',
            body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
            mediaType: 2,
            thumbnail: anexa,
            sourceUrl: 'wa.me/27686881509',
            mediaUrl: 'https://github.com',
            },
        },
    };

await vorterx.sendMessage(m.from, DieGosOn,  { quoted: m})
      }
  }
};
          
