module.exports = {
	name : "pm", 
	descriptiom : "private message",
	execute(message, args, bot) {
		message.author.send(
			'yoooo u found a hidden command. You get 500 points!!!! Keep looking for more to get more points.'
		);
		message.delete({ timeout: 5 }).catch(console.error);
	}
};
