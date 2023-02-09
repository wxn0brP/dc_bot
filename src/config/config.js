if(!process.env.token){
	const dotenv = require("dotenv").config({path: __dirname + "/../../.env"});
}
const mojeId = 676546154518806554;

function uprJa(msg){
	if(msg.author.id == mojeId){
		return true;
	}
    if(msg.author.id == 417765936234233866){
		return true;
	}
	return false;
}
function upr(msg){
	if(uprJa(msg)){
		return true;
	}
	try{
		if(msg.member.roles.cache.find(role => role.name === "Towarzysz_")){
			return true;
		}
	}catch{}
	return false;
}

function uprModeracja(msg){
	try{
		if(msg.member.roles.cache.find(role => role.name === "Towarzysz Administracji")){
			return true;
		}
		if(msg.member.roles.cache.find(role => role.name === "Towarzysz Moderacji")){
			return true;
		}
	}catch{}
	return false;
}

module.exports = {
	token: process.env.token,
	prefix: ",",
	upr,
	uprJa,
	uprModeracja,
	mojeId
}