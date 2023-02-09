const fs = require('fs');

function loadconfig(src){
	try{
		return JSON.parse(fs.readFileSync(src+".json", 'utf8'));
	}catch(e){
		console.log(e+"");
		return 0;
	}
}
function saveconfig(src, obiekt){
	try{
		fs.writeFileSync(src+".json", JSON.stringify(obiekt, null, " "));
	}catch(e){
		connsole.log(e+"");
	}
}

module.exports = {
	loadconfig,
	saveconfig
}