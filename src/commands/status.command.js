const config = require("../config/config");

module.exports = {
	name: "status",
	description: "zmienia status bota",
	usage: "<typ aktywności> <nazwa> \n\t PLAYING  STREAMING  LISTENING  WATCHING  CUSTOM_STATUS  CLEAR",
	args: true,
	rodzaj: 3,
	
	run(msg, args){
		if(config.mojeId != msg.author.id)return;
		if(args[0] == "help"){
			msg.channel.send("PLAYING  STREAMING  LISTENING  WATCHING  CUSTOM_STATUS  CLEAR");
			return;
		}
		const { client } = msg;

		const activityType = args[0].toUpperCase();
		let activityName = [...args].slice(1).join(" ");
		const presenceOptions = {
			activity: {
				type: activityType,
				name: activityName,
			}
		}
		client.user.setPresence(presenceOptions).then((presence) => {
			msg.channel.send("✅ Presence successfully changed.");
		})
	}
}