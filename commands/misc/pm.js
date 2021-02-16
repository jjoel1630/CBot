module.exports = {
	name : "pm", 
	description : "private message",
	aliases: ["pm"],
	execute(message=message, args=args, bot=bot) {
		message.author.send(
			'yoooo u found a hidden command. You get 500 points!!!! Keep looking for more to get more points.'
		);
		message.delete({ timeout: 5 }).catch(console.error);
	}
};
