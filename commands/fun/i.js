const request = require('request');

module.exports = {
	name : "i", 
	description : "random image",
	aliases: ["i", "image"],
	execute(message=message, args=args, cheerio=cheerio) {
		message.channel.send("This command aint available rn. Thats tuff bruv");
		// if (message.member.hasPermission('MANAGE_CHANNEL')) {
		// 	image(message);
		// 	message.delete({ timeout: 1000 }).catch(console.error);
		// } else {
		// 	message.channel.send("lmao you don't have the perms. HAHAHAHAHA.");
		// 	message.delete({ timeout: 1000 }).catch(console.error);
		// }
	
		// function image(message) {
		// 	let msgArgs = args.slice(0).join('');
		// 	console.log(msgArgs);
	
		// 	var options = {
		// 		url: 'http://results.dogpile.com/serp?qc=images&q=' + msgArgs,
		// 		method: 'GET',
		// 		headers: {
		// 			Accept: 'text/html',
		// 			'User-Agent': 'Chrome'
		// 		}
		// 	};
	
		// 	request(options, function(error, response, responseBody) {
		// 		if (error) {
		// 			return;
		// 		}
	
		// 		$ = cheerio.load(responseBody);
	
		// 		var links = $('.image a.link');
	
		// 		var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'));
	
		// 		if (!urls.length) {
		// 			return;
		// 		}
	
		// 		// Send result
		// 		message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
		// 	});
		// }
	
	}
};
