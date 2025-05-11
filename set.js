const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieURFd29qbjdvS3JWRFM5b0phZldYaldEbTZKYkRqalk3Z2FmM3ZWZnpGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWg3M2RNeWNpbXVSZE9OejdpdkRSZHppOHdSbkhJZGFCTTlGRlZIMVB5OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSm5raWZzd0FwRUxVaHRZTnJjemVFekk1U09HQWp4VjVjc0lTQ1kwSkdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzYTFsckw2ZlJ6L3J4N1piUjdGUkNyR2k2ZEV3YVhyRERndDJDVGw4TG1rPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNQcmloVGxrS0J4MmxUd21ZcWw1THkxa1RRR0w3YksxWmUySnFzQ1lua3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJCL1NoUU1LcitpRkxpWnRZcExvcTZNYStWbTVZclIwdWRIVEtIdDd4aVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BiZHo5QlFTUGNVN2gvcElZeEpTZHNQelNGNk1xc1o4blZpZUx0RS9tOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUs3SDdId3V4ckpTa2ZxVVhrMWYrR3lWdTBJV0pBL0JnVUdlK3VCNmVsQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNZSFlKMFRwTGhDWjZTYWxYNzR4Q3cvK1NNU0dETmNnOWdSYkp3bmNJa2pqY2g2NWJNeXQwdVlBYlZhcGlVY2NkTzczRUYwaUx5ZGkrcVB3Z3paSmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJDVTF4UFFxZ3BwbUwxenNmOWJKY09wZzRMTjZQdGRXL21wa2pCRy9IWnlrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1MjQzRjI2REM3QjAyMjk5OURCQTg0QjFCMDQ1MDRDNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2OTk1Mjk4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTgxMkJFQ0MyMjAyODRCQUY3MUJBRDIyMkI2ODRBQzgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Njk5NTMwMn1dLCJuZXh0UHJlS2V5SWQiOjM1LCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzUsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiemZZR0pwN2NUV3lPQ1V2VHlBY2h3ZyIsInBob25lSWQiOiIwMTMzZGE1Ny0wNGU1LTRlOGQtYmNjYi02MTYwZDk3NmMzY2QiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEZIWU5jYUkvRFZ2dE44aWh1cjR0SCtZWFk4PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitZNEdpYjB5Zm81NjA5dzB2MzJMdUR1ZXVGRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJUMUtLRTFZQSIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjYwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKYheGOr+KYvO+4juKEkuKYvO+4juKEkuKcqeKEsOKcq+KEleKZqyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1BZenNnRUVNMlFoTUVHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV0dBOVhQQnFIZXNjaXc0M0dOcTI5dThTZVgzWENRN2phaXBWSTZOb0dYcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVWE5S3F1Vjh0eXdydFhKbitGRlBmSW5iVkdmZzF1eU0rNnBGOFhOem55bnFmZWFQNDNxYzAyaURsemNUbmdhVWYzWUMrbHVIWHA2UnNlcEEvSks4QVE9PSIsImRldmljZVNpZ25hdHVyZSI6IitGYmN5MWxWT0ZpdVdKOE9mRWxySkNyR3dvOVV4QXJnZ0VmVXM3UEJjYVRMOWhQVGZ4VWVIb29XNWN5RWJqelBOL0Rsak1jbGhiOXMzZER6TVg1empBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjYwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZoZ1BWendhaDNySElzT054amF0dmJ2RW5sOTF3a080Mm9xVlNPamFCbDcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY5OTUyOTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRGhRIn0=',
    PREFIXE: process.env.PREFIX || [*],
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || " ×͜×★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫🦂 ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
    CHATBOT : process.env.CHATBOT || "no" , 
    VOICE_CHATBOT_INBOX : process.env.TALKING_BOT || "no", 
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://i.ibb.co/h0Sw13b/file-1285.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,💚,💛,🧡,👣",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || ' Ꭿℒℒℰℕ ℐЅ ᏇᎯTℂℋℐℕᎶ👀ℐℕ ᎶℋᎾЅT ℳᎾⅅℰ👻 ',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'no',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || ' ★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫ ĪS ΛŦ ßƐΛSŦ MᎾDƐ ŔĪƓĤŦ ИᎾᏯ ƇΛИŦ ŔƐƇĪƐ√Ɛ YᎾƱŔ ƇΛĿĿ 📞📵 ',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "ᴘσωєʀє∂ ву ★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
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
