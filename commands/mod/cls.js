const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Clear/Purge",
	description : "deletes a certain amount of messages (does not delete pinned messages)",
	aliases: ["cls", "clear", "purge"],
	active: true,
	perms: ["ADMINISTRATOR", "BAN_MEMBERS"],
	usage: "`$ban <@user>`",
	cooldownTime: 20000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		if(cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in remaining`)
		} else {

			cls(message, args);
			
			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const cls = () => {
	if (message.member.hasPermission('MANAGE_MESSAGES')) {
		console.log(args[1]);
		if (!args[0]) {
			message.channel.send('Idiot, u have to say that amt of msgs (2 - 100). SMH');
			message.delete({ timeout: 100 }).catch(console.error);
		} else if (args[0] == 1) {
			message.channel.send('You lazy idiot, delete the msg ureself.');
			message.delete({ timeout: 100 }).catch(console.error);
		} else if (args[0] == 0) {
			message.channel.send(
				"Idiot, you can't clear 0 messages. Are you stupid, or are you stupid??"
			);
			message.delete({ timeout: 100 }).catch(console.error);
		} else if (args[1]) {
			async function clsBotMsgs() {
				message.delete({ timeout: 100 }).catch(console.error);
				try {
					const fetchedBM = await message.channel.messages.fetch({ limit: args[0] });
					const notPinned = fetchedBM.filter((fetchedMsg) => !fetchedMsg.pinned);
					const botMessages = fetchedBM.filter((msg) => {
						return msg.author.bot;
					});

					await message.channel.bulkDelete(botMessages, !notPinned, true);
				} catch (err) {
					console.error(err);
				}
			}
			clsBotMsgs();
		} else if (args[0] <= 100) {
			async function cls() {
				message.delete({ timeout: 100 }).catch(console.error);
				try {
					const fetched = await message.channel.messages.fetch({ limit: args[0] });
					const notPinned = fetched.filter((fetchedMsg) => !fetchedMsg.pinned);

					await message.channel.bulkDelete(notPinned, true);
				} catch (err) {
					console.error(err);
				}
			}
			cls();
		} else {
			message.channel.send("You're gonna crash my computer. Only 1- 100 msgs.");
			message.delete({ timeout: 100 }).catch(console.error);
		}
	} else {
		message.channel.send("lmao you don't have the perms. HAHAHAHAHA.");
		message.delete({ timeout: 100 }).catch(console.error);
	}
}
