const { loadconfig, saveconfig } = require("../config/plik");
const config = require("../config/config");

module.exports = {
	name: "warn",
	description: "upomina towarzysza",
	usage: "<user> <powód>",
	args: true,
	rodzaj: 1,

	run(msg, args){
		if(!config.upr(msg) && !config.uprModeracja(msg)) return;
		if(args.length < 2)return;

		const { client, mentions, author } = msg;
		const powod = [...args].slice(1).join(" ");
		const userToWarn = mentions.users.first();

		if(userToWarn.id === author.id){
			return msg.reply("jak to siebie?");
		}
		if(userToWarn.id == config.mojeId){
            sendWarn(author.id, "Próba zwarnowania Towarzysza", msg);
			return msg.reply("Mnie nie można");
		}
        
        sendWarn(userToWarn.id, powod, msg);
	},
}

function sendWarn(id, powod, msg){
    const { client } = msg;
    var safe = loadconfig(__dirname+"/../config/warn");
    var ok = false;
    for(var i=0; i<safe.users.length; i++){
        if(id == safe.users[i][0]){
            safe.users[i][1].push(powod);
            ok = true;
        }
    }
    if(!ok){
        safe.users.push([id, [powod]]);
    }

    client.users.fetch(id, false).then((user) => {
        user.send("Postąpiłeś żle Towarzyszu! Warn\nPowód: "+powod);
    });
    msg.channel.send("Zły towarzysz został ostrzeżony!");
    saveconfig(__dirname+"/../config/warn", safe);//json
}