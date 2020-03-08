const Discord = require("discord.js");
const _client = new Discord.Client({disableEveryone: true});
const prefix = (";");


_client.login(TOKEN);

_client.on("ready", ()=>{
    console.log(`${_client.user.tag} is opgestart!`);
    _client.user.setActivity("In de rewrite! Geen commando's gebruiken aub!");
})

_client.on("message", async (message) =>{
    if(message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();


    if (cmd == "ping"){
        message.channel.send("Aan het pingen...").then(sentMessage =>{
        sentMessage.edit(`Pong! De API latency is ${Math.round(_client.ping)}ms!`);
        })
    }

    if (cmd == "copy"){
        var msg = `${args.join(" ")}`;
        if(msg.includes("{delete}")) {msg = msg.replace("{delete}", ''); message.delete().catch(()=>{})};
        message.channel.send(msg)
    }

    if (cmd == "praat"){
        var msg = `${args.join(" ")}`;
        if(msg.includes("{delete}")) {msg = msg.replace("{delete}", ''); message.delete().catch(()=>{})};
        await message.guild.channels.get(kanaal).send(msg)
    }

    if (cmd == "voeruit"){
        if (message.author.id != 159717599993790464) return;
        if (!args[0]) return message.channel.send("Put your Code to Eval.");
        try {
            if (args.join(" ").toLowerCase().includes("token")) return;
            eval(args.join(" "));
        } catch (e) {
            return message.channel.send(e);
        }
    }

    if (cmd == "ban"){
        let memberToBan = message.mentions.members.first();
        let banReason = message.content.split(" ").splice(1);

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hey, dat mag jij helemaal niet doen!")

        if(!banReason){
            message.reply("Je hebt geen reden aan de ban gegeven!");
        }
        if(!memberToBan){
            message.reply("Je hebt niemand gepingt! Ping de persoon die je wil bannen!")
            return;
        }
        if(message.guild.members.find('id', memberToBan.id)){
            memberToBan.ban(banReason);
            message.reply("De persoon is verbannen! :ok_hand:");
            return;
        }else{
            message.reply("Error! Is de persoon nog in de server?");
            return;
        }
    }

    if (cmd == "kick"){
        let memberToKick = message.mentions.members.first();
        let kickReason = message.content.split(" ").splice(1);

        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hey, dat mag jij helemaal niet doen!")

        if(!kickReason){
            message.reply("Je hebt geen reden aan de ban gegeven!");
        }
        if(!memberToKick){
            message.reply("Je hebt niemand gepingt! Ping de persoon die je wil kicken!")
            return;
        }
        if(message.guild.members.find('id', memberToKick.id)){
            memberToKick.kick(kickReason);
            message.reply("De persoon is weg! :ok_hand:");
            return;
        }else{
            message.reply("Error! Is de persoon nog in de server?");
            return;
        }
    }

    if (cmd == "training"){
        if(!message.member.hasPermission(["MUTE_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hey, dat mag jij helemaal niet doen!")
        await message.guild.channels.get(testkanaal).send("Training aan het verzenden...")
        await sentMessage.edit("<@543071011487219723> Er is een nieuwe training!\nDatum: ${[0]} en de tijd: ${[1]}\nHost: ${[2]}\nCo-host: ${[3]}\nBijzonderheden: ${[4+]}")
    }

    if (cmd == "kill"){
        await message.channel.send("<@159717599993790464>");
    }

    if (cmd == "help"){
        const helpembed = new Discord.RichEmbed()
        .setColor('#3d3da8')
        .setTitle('Alle commandos heb je hier!', 'het plaatje heb ik niet zelf gtemaakt, wel toegevoegd. heb je een idee daarvoor? DM Tytgamer')
        .setAuthor('Den Boom Bot', 'https://i.imgur.com/nyljaMX.png', 'https://i.imgur.com/t6aj08o.png')
        .setDescription('Hoi! Ik ben Den Boom Bot! Gemaakt door HC Tytgamer. Als je een fout hebt gevonden met de bot, DM mij dan!')
        .setThumbnail('https://i.imgur.com/nyljaMX.png')
        .addField('Commandos', 'hoi')
        .addBlankField()
        .addField('help', 'Laat alle commandos zien!', true)
        .addField('kick/ban', 'Kan iemand uit de server sturen! **(ALLEEN VOOR MODS)**', true)
        .addField('ping', 'Laat je zien hoe snel ik reageer!', true)
        .setTimestamp()
        .setFooter('hallo', 'https://i.imgur.com/nyljaMX.png');
        
    message.channel.send(helpembed);
    }
    

});

//Variabelen
var general = "441664086560997381";
var trainingkanaal = "437660620087754781";
var testkanaal = "667740655052914688";
var trainingping = "543071011487219723"
