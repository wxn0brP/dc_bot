const {upr} = require("../config/config");

module.exports = {
	name: "clear",
	description: "usuń wiadomości",
	usage: "<ilość>",
	aliases: ["cls"],
	args: true,
	rodzaj: 1,
	
	run(msg, args){
		let r = (parseInt(args[0]));
		if(r > 100 || r < 0)return;
		if(upr(msg)){
			try{
				msg.channel.bulkDelete(parseInt(args[0]));
			}catch(er){}
		}
	}
}