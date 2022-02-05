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



client.on('ready',() => {
    let date = new Date();
    console.log("client is ready");
    var sendChannel = client.channels.cache.find(channel => channel.id === '935200576273264650')
    var hour = date.getMinutes();
    // sendChannel.send("<@330683045684445190> Login Hoyolab ya");

    
    
});

client.on('messageCreate',(message) => {
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if(command === "addtask"){
            fs.readFile('./tugas.json','utf-8',(err,jsonString) =>{
                if(err){
                    console.log(err)
                }
                else{
                    const parseData = JSON.parse(jsonString);
                    parseData.listTugas.push({
                        matkul:args[0],
                        judul: args[1],
                        deadline: args[2]
                    });
                    json = JSON.stringify(parseData);
                    fs.writeFile('./tugas.json',json,'utf-8',error =>{
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log("Add success");
                        }
                    });
                }
            });

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



