const {prefix} = require("../config/config");

module.exports = {
	name: "help",
	description: "wyświetla pomoc",
	usage: "?<komenda>",
	args: false,
	rodzaj: 1,

	run(msg, args) {
		const { client: { commands }, } = msg;
		var wiad = "";

		if(args.length == 0){
			var Ctxt = "- ";
			var Cvoi = "- ";
			var Ccon = "- ";
			commands.map((command) => command).forEach(function(ob){
				switch(ob.rodzaj){
					case 1:
						Ctxt += ob.name + ", ";
					break;
					case 2:
						Cvoi += ob.name + ", ";
					break;
					case 3:
						Ccon += ob.name + ", ";
					break;
				}
			});

			wiad += "**TEKSTOWE:**"+"\n "+
			 Ctxt+"\n"+
			 "**GŁOSOWE:**"+"\n "+
			 Cvoi+"\n"+
			 "**CONFIG:**"+"\n "+
			 Ccon+"\n"+
			 "\n np:"+ prefix+"help ?<kamenda> \n(? oznacza argumet opcjonalny)"
			;
		}else{
			const name = args[0].toLowerCase();
			const command = commands.get(name) ||
			  commands.find((c) => c.aliases && c.aliases.includes(name));

			if(!command){
				return msg.reply("komenda nie istnieje");
			}

			wiad += "**Nazwa:**"+"\n "+command.name
			if(command.description)
				wiad += "\n "+ "**opis:**" +"\n"+ command.description;
			if(command.usage)
				wiad += "\n "+ "**Jak użyć:**" +"\n"+ prefix+command.name+" "+command.usage;
			if(command.aliases)
				wiad += "\n "+ "**aliasy:**" +"\n"+command.aliases;
		}
		msg.channel.send(wiad);
	}
}