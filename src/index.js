const Discord = require('discord.js');
const client = new Discord.Client();
const config = require(__dirname+"/config/config");
client.login(config.token);

const commandHandler = require(__dirname+"/handlers/command.handler");
const eventdHandler = require(__dirname+"/handlers/event.handler");
commandHandler(client);
eventdHandler(client);

const fs = require('fs');
const lo = console.log;
const plik = require(__dirname+"/config/plik");
lo("\n ____________"+(new Date()+"").split(" ").slice(4,5));

client.on("ready", () => {
	console.log(" Zalogowano jako "+client.user.tag);
	/*try{
		plik.loadconfig(__dirname+"/config/servers").ser.forEach(function(s){
			client.channels.cache.get(s.ch).messages.fetch();//wczytaj event dla wiad
		});
	}catch(e){
		lo(e)
	}*/


	//test event
	//==========================
	//client.emit("guildMemberAdd",
	// client.guilds.cache.get("987240162331357224").members.cache.get("676546154518806554"));
	//client.emit("guildMemberRemove",
	// client.guilds.cache.get("987240162331357224").members.cache.get("676546154518806554"));
	//==========================

});

client.on("message", msg => {
	if(msg.author.bot) return;
	if(!msg.guild){
		lo(msg.content);
		return;
	}
    if(!config.upr(msg)) return;

	/*msg.react("✅").then(() => msg.react("❌"))*/

	//prefix
	if(msg.content.startsWith(config.prefix) == 0){
		return;
	}
	const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
	const cmdName = args.shift().toLowerCase();

	//jaka to komenda?
    const cmd =
	 client.commands.get(cmdName) ||
	 client.commands.find(
	  (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
	 )

	if(!cmd) return;

	if(cmd.args && !args.length){
		let reply = `Nie podałeś żadnych argumentów!`;
		if(cmd.usage){
			reply += `\nWłaściwe użycie: \`${config.prefix}${cmdName} ${cmd.usage}\``;
		}
		return msg.channel.send(reply);
    }
    try{
		cmd.run(msg, args);//wykonaj
	}catch(error){
		console.log(error)
	}
});

client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})