const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU4rc2NpalQ1SjBnWXhSSnh0eW81bWFOc2JTTVRPd2hWWTZWM09wMzIxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWlRaGJXV0ZteForMVdGZUZacWxtMEdLaVhPU2poaUNXeDVKY3puaWpTOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RzdyWUdrdlZNT0ovbk5YVGt5d0NIcnV6U0Nqamlld1lCK0ZhdFBjM2xBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaQmw1TFpzTVlhWWV0NWlXUVEyZGZHZGxhTTlleHhIZkl3TWZUeTI2eVFjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlMeGlyU0FpMmdvc3lrRnBwL0xuNitPZk80Uk1ENHBRamNiT0h1T2hyVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdJRENDQnB6bHJSMllvS3NDUXY0U0JPalZGMWZZaGxYSkZ6TkFZdm1pZ0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic09Vdm16OUtGcWZLVkdyS21LL0JtRlljYmdoQWhxVC9tU2hqcHpLZEpHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXB3OFdqaWUzSTVnczVEV1I3OHU0S1VPQ0ZqQVZuQStUdkM0N3dNN3dsND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJRajludTIzbjB4bFdSQkd5MU0vTDRxWEYveXltQzBDeDU1M0JQUlhZQkVNVWFLWW16dDU4cE9jdnB5VXpLTms2U2xrQjREVEJod3lGbnZXUlhaZEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJVbkJScHlKUG1lTC9pRExXNVZuaU5rYnlaWmducFg2aEEwZklYRDBWZFI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMDA5MEY4NjcxQTcwODYwMDY1RDM5QkZFODc3RTk5RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1NTk4NDM0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNUU3OUYyOTdFQUZEQzcxREMwRjBCNUI2MEE0MzU1MDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTU5ODQzOH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUDhldDQxMUJSanU2azJfSTZpdG1kZyIsInBob25lSWQiOiI3MjM5YmRhMi1kYzIyLTRkNWUtOTAzOC00OWQ1OGU0ZTRhYjciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFNHb3hDNkc4c2FXbGFiTE4yemhwemtFZ2ZrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdER21zeXRTUG1Jam56VU90eWF0VGN4dTFCUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJaMUUxUTk0VCIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjg0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKYheGOr+KYvO+4juKEkuKYvO+4juKEkuKcqeKEsOKcq+KEleKZqyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGlsb004Q0VOSHZyc0FHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR3lFWWh1Wk1hSG1uck9RUkQvU0g4TDBZUWYzZGhXNEk0U3JrcDJOVFBrTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiT3psNHduWllKckpOdi9acUQ1dWdOYzIzQ2Z0WkFBd3k0SHZaSTF4UHhmVi9DeTBaWGxuQlh4RS9hYitlcSt3OGpRY0ViVVpoNlBOYWNjUW5TdjdnRGc9PSIsImRldmljZVNpZ25hdHVyZSI6Ink1YWRQTHBXYTRYT1JYb3ptZmI1ZWQrZ2xINEhHdFY1a3BCcGl6WkkwQmZQZmZMaXVmeEVVRy91Q3BkWW9pdFdsWElKdzdiNU9TMks3b09GOW9xM0JRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjg0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJzaEdJYm1UR2g1cDZ6a0VRLzBoL0M5R0VIOTNZVnVDT0VxNUtkalV6NUQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU1OTg0MzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFZkIn0=',
    PREFIXE: process.env.PREFIX || [],
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
    CHATBOT : process.env.CHATBOT || "no" , 
    VOICE_CHATBOT_INBOX : process.env.TALKING_BOT || "no", 
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,🦚",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Beltah md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'no',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "BELTAH-MD",
    BOT : process.env.BOT_NAME || '𝗕𝗘𝗟𝗧𝗔𝗛-𝗠𝗗',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
