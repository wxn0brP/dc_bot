module.exports = {
	name: "voiceStateUpdate",

	async run(oldVoiceState, newVoiceState){
		if(newVoiceState.channel){ // connected
			if(
				newVoiceState.channel.name.toLowerCase().indexOf("utwórz")
				> -1
			){
				var name = newVoiceState.member.user.username+"#$";
				var channelId =
				 await newVoiceState.guild.channels.create(name, {type:'voice'}).catch(console.error);
				channelId.setParent(newVoiceState.channel.parentID);
				newVoiceState.guild.member(newVoiceState.member.user.id).voice.setChannel(channelId);
			}
		}else if(oldVoiceState.channel){ //disconnected
			var n = oldVoiceState.channel.name.toLowerCase();
			if(n.indexOf("#$") > -1){
				if(oldVoiceState.channel.members.size == 0){
					oldVoiceState.channel.delete();
				}
			}
		}
	}//run
}