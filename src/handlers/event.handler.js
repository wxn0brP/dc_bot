const { readdirSync} = require("fs");
const { Constants: { Events }, } = require("discord.js");
const serverEvents = Object.values(Events);

const serverEventsPath = __dirname + `/../events`;

module.exports = (client) => {
	const events = readdirSync(serverEventsPath).filter((file) =>
		file.endsWith(".js"),
	)
	console.log("--event--");

	for(const file of events){
		const event = require(__dirname + `/../events/${file}`);

		if(serverEvents.includes(event.name)){
			client.on(event.name, event.run);
			console.log(file, "v");
		}else{
			console.log(file, "x");
		}
	}

	// console.log(events)
}
