const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk1Ddkt4azB6Q2t1ejlBQjM2cFpEdXJ3RXVQdU1iMW9TVmlJeHE0bHQxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzVmOE9ydDBrN2NSNUkyY2VEdGV6RzFwTDFaUXM2WHY5Zkc3ME1CL3Jncz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSDZjV05RU2Zua1pNb2loeU1VeDQyQUJzYmRmZmhncnNoeGQ1K0YrWVhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQbEp5aG03QmVsdmRVdGY4OVRQOFFYUWZLUVBYbU5jdE9xM1p6eUFFaEhNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFGaHNkZ280NmJiNmZsTWJkK0JxTVNyU2lob0w2ZzAzL3pTNmErdU9Xa1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdKTm5BS1VVRU9iRytQeVRiTHp1SHpXSU83UlMycS9qSUxQYVF1bElkVVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRURGOEdoNHE2Y3VDenpyR1Q4TVdoM1pQK2NpQ0FtUnNNRGFuQVNRbnFWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDlTOEkxR0VIUkFaa0hrc0MxVVNqWmFFd3BWQmdTSFNZdlMzeDQySThWOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtheDJ0ZmFnd3Z0eFl6alRHZ1ZoejdINnpBcUdQV2U5S2FPaWdGWXZFaHloNXZHcFVNaytjNFc5MGxYMGpqL3VqNy9mblIzcUcvNkp0OXVjVmZlbkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI3LCJhZHZTZWNyZXRLZXkiOiJLRWVaUEh6Q1FRMEp4RG9aeGx6MmhEbTc0WnN4ZGdydDFGTjZjWkZmamNZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEOTYwQzdCMDYxN0M3QzMyMjBFM0UzNzFGMzMyRTE5NSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MjAxMzM5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzk2QUNFNkExODM5MEM2ODk5RDMyNTM4RjUwN0Q2OEUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzIwMTMzOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiTlNhaXJwMExSVHFhaU84MnV2TzM0ZyIsInBob25lSWQiOiJhZmVjYjhmZC01MWM0LTQxYzQtOTIzOS02NWRjYzUxMWZjMmYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVFI2YnpERzNueWE0T2FwSzBUUmxyRUdKYUM0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM5SjBEZjNOY0ZnWTVTZGk5UE5lbWIwMHNMND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJaRDREUVhRMyIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjg2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKYheGOr+KYvO+4juKEkuKYvO+4juKEkuKcqeKEsOKcq+KEleKZqyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTURSOG9rRUVLWGFrTUVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOFI3QmdLeGJ2T043R25qU1ZYUmNOc0UzQ3pDRmwxaGdtZDU4T0drelJsYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTlFtaHlwZS9DWGlFR0ZQR0hHNVpMOTlBNzZMWW9PNEgxR0Y5MkxpbUx4VU1WYmdmMm5OR1NBTjV4djh5a25POWlRZHRuVFRTV3p4Vzd1bGxrS3FDQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6InR3MlZrc1dNeGZ1UllCMENGSTNKZE55NWVoZlp5dTJ2R21uRlpLODVjVVFveDB1aUhuOXcwZ3JBRFNNOU94SmNQdGk4UU9scWtlWHMvTEFNRnpiaEN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjg2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZFZXdZQ3NXN3pqZXhwNDBsVjBYRGJCTndzd2haZFlZSm5lZkRocE0wWlgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDcyMDEzMzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDlEIn0=',
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
    GCF: process.env.GROUP_CONTROL || 'yes', 
    GREET : process.env.GREET || "yes",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || ' Ꭿℒℒℰℕ ℐЅ ᏇᎯTℂℋℐℕᎶ👀ℐℕ ᎶℋᎾЅT ℳᎾⅅℰ👻 ',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'no',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || ' ★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫ ĪS ΛŦ ßƐΛSŦ MᎾDƐ ŔĪƓĤŦ ИᎾᏯ ƇΛИŦ ŔƐƇĪƐ√Ɛ YᎾƱŔ ƇΛĿĿ 📞📵 ',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "ᴘσωєʀє∂ ву ★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    BOT : process.env.BOT_NAME || 'ßƐĿŦΛĤ-MD',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
