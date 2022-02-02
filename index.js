require('dotenv').config();
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { off } = require('process');
const prefix = "$";
// setting up discord bot
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

moment.tz.setDefault("Asia/Jakarta");


client.on('ready',() => {
    let date = new Date();
    console.log("client is ready");
    var sendChannel = client.channels.cache.find(channel => channel.id === '935200576273264650')
    var hour = date.getMinutes();
    if(hour === 4){
        sendChannel.send("<@330683045684445190> Login Hoyolab");
    }
    
    
});

client.on('messageCreate',(message) => {
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if(command === "addtask"){
            message.channel.send('Pongcrazy');
        }
        else if(command === "listtask"){
            fs.readFile('./tugas.json','utf-8',(err,jsonString) =>{
                if(err){
                    console.log(err)
                }
                else{
                    //catch error from parse if exist
                    try{
                        const parseData = JSON.parse(jsonString);
                        parseData.listTugas.forEach(tugas => {
                            const exampleEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(tugas.matkul)      
                            .setDescription(tugas.judul)
                            .addFields(
                                { name: "Deadline", value: tugas.deadline },
                            );
                            message.channel.send({ embeds: [exampleEmbed] });
                        });
                    }catch(err){
                        console.log("Error parsing JSON",err);
                    }
            
                }
            });

        }
        else{
            message.channel.send("That's not a right command");
        }
    }
});





client.login(process.env.DISCORD_TOKEN);



