require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready',() => {
    let date = new Date();
    console.log("client is ready");
    var sendChannel = client.channels.cache.find(channel => channel.id === '935200576273264650')
    var seconds = date.getSeconds();
    console.log(seconds);
    sendChannel.send("<@330683045684445190> Login Hoyolab sama event web");
    
});
client.login(process.env.DISCORD_TOKEN);

