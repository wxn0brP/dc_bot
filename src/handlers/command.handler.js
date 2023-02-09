const { readdirSync } = require("fs");
const { Collection } = require("discord.js");

module.exports = (client) => {
	client.commands = new Collection();

	const commandFiles =
	 readdirSync(__dirname + "/../commands").filter((file) => file.endsWith(".command.js"));

	console.log("--command--");
	for(const file of commandFiles){
		const command = require(__dirname + `/../commands/${file}`);
		if(command.name){
			client.commands.set(command.name, command);
			console.log(file, "v");
		}else{
			console.log(file, "x");
			continue;
		}
	}
}
