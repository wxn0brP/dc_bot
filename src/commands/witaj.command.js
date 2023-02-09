module.exports = {
	name: "witaj",
	description: "bot sie wita",
	aliases: ["hej", "cześć", "czesc", "witaj", "witaj towarzyszu", "czesc towarzyszu", "cześć towarzyszu"],
	args: false,
	rodzaj: 1,
	
	run(msg){
		msg.channel.send("Witaj, Towarzyszu");
	}
}