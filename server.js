const Discord = require('discord.js'); // get the discord library
var PastebinAPI = require('pastebin-js'); // pastebin library
var func = require('./functions'); // allows the function library i made in functions.js to be used
const glob = require('glob');

      pastebin = new PastebinAPI('c179a88f6ab91130e3bfb6e23287ba4e'); // my token for pastebin dev api
const client = new Discord.Client(); // allows us to target the same client instance every time

var pictures = new Array(); // create array
var numC = 0;
var loginToken;
var i;



// log the uptime of the bot
setInterval(logUptime, 60000);

function logUptime()
{
var uptime = process.uptime();
console.log('Uptime: '+func.format(uptime));

}

// get the login token
// from a paste on pb
console.log('trying to login using token'); // log that we are trying to login.

pastebin.getPaste('16huwYu7').then(function (data) 
  {
    loginToken = data;
      // we would put the console.log here but since it only does this code if it successfully returns the paste
      // we need to do it outside the function so it logs no matter if it successfully retrieves the paste or not.
    client.login(loginToken);
  })
  .fail(function (err) { // if error do this gay shit lmfao
    console.log('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!');
    console.log('The code monkeys at our headquarters are working VEWY HAWD to fix this!')
    console.log(err); // dont forget to display the actual error lmao
})

// output a folder of images to an array
glob("yeet/*.png", function (er, files) {
  pictures = files;
});







// called when the bot is logged in
client.on("ready", () => {
  var uptime = process.uptime();
  console.log("I am ready! Took "+func.formatS(uptime)+" seconds to login.");
  client.user.setActivity('lmao u gay', { type: 'STREAMING' });

  changeAvatar();
	setInterval(changeAvatar, 336000 * pictures.length);
});

client.on("error", console.error) // if the client errors or we go offline, log the error.pp

client.on('message', msg => {
  if(msg.author.id === "159889018862043137") {
    if(msg.content == "-nou"){
      msg.edit(`https://i.imgur.com/IxDEdxW.png`)
    }
    if(msg.content == "-owo"){
      msg.edit(`https://i.imgur.com/lWvaHP8.png`)
    }
    if(msg.content == "-spin"){
      msg.edit(`https://i.imgur.com/B9d3uTH.gifv`)
    }
    if(msg.content == "-bortnite"){
      msg.edit(`https://i.imgur.com/6vaOAuu.gifv`)
    }
    if(msg.content == "-fap"){
      msg.edit(`https://i.imgur.com/iDxaaGD.jpg`)
    }
    if(msg.content == "-josh"){
      msg.edit(`https://i.imgur.com/PdB88Zg.jpg`)
    }
    if(msg.content == "-beth"){
      msg.edit(`https://cdn.discordapp.com/attachments/161284437311488000/491835114322657290/Ok_now_this_is_cool.mp4`)
    }
    if(msg.content == "-sean"){
      msg.edit(`https://cdn.discordapp.com/attachments/336990201794789376/459550603891310632/video.mov`)
    }
    if(msg.content == "-damon"){
      msg.edit(`https://i.imgur.com/gk157oT.jpg`)
    }
    if(msg.content.startsWith("-info ")){
    	console.log("PLEASE")
    	let member = msg.mentions.members.first()
      msg.reply(member.joinedTimestamp)
    }
  }

});

// the function to change avatars, called every 6 minutes (takes 6 minutes go go through every picture on the array)
function changeAvatar()
{
  // shuffles the array of pictures using the function in functions.js
  // pictures = func.shuffle(pictures)
  // commented out beacuse no need beacuse i am now doing it sequentionally (1234567..ect)

  // really fucking clunky way to put a delay in a for loop lmfao, do not do this lmfao
  for (var i = 0; i < pictures.length; i++) {
      (function(i) {
          setTimeout(function() {
            client.user.setAvatar(pictures[i].toString())
            .then(user => {
              console.log(`New avatar set! ( `+pictures[i].toString()+` )`);
           //  console.log("Changed avatar "+numC+" times in the span of "+func.format(uptime));
            })
            .catch(function(err){console.log('-------ERROR------- [ ur changing ur avatar too fast lol ] -------ERROR-------');}); // 
            numC++
            var uptime = process.uptime();
            
          }, 336000 * i);
      })(i);
  }
}