const { loadconfig } = require("../config/plik");
const config = require("../config/config");

module.exports = {
	name: "ward",
	description: "wyświetla ilość upomnień towarzysza",
	usage: "<user>",
	args: true,
	rodzaj: 1,

	run(msg, args){
		const { mentions, author } = msg;
		const userToWarn = mentions.users.first();
		if(!config.upr(msg) && userToWarn.id != author.id) return;

		const reasonArg = [...args].slice(1).join(" ");

		var safe = loadconfig(__dirname+"/../config/warn");
		for(var i=0; i<safe.users.length; i++){
			if(userToWarn.id == safe.users[i][0]){
				var temp = "ilość: "+safe.users[i][1].length;
				if(safe.users[i][1].length != 0){
					temp += "\n**powody:**";
					safe.users[i][1].forEach(el => {
						temp += "\n - "+el;
					});
				}
				return msg.channel.send(temp);
			}
		}
		msg.channel.send("ilość: 0");
	},

}