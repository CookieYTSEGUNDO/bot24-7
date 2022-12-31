var mineflayer = require('mineflayer');
var serverip = 'VPREMIER1LEAGUECRAFT.aternos.me'
const { log, replPlugin } = require('mineflayer-repl');
var options = {
    host: serverip,
    username: "Bot",
    password: "12345678",
    verbose: true
};

var bot = mineflayer.createBot(options);
replPlugin(bot);
bot.repl.on('enter', function(command) {
    if(command.length === 0) return;
    if(command === 'quit') return bot.quit();
    var first3letters = command.substring(0,4)
    var removef = command.substring(5)
    if(first3letters === 'chat') return bot.chat(removef)
});
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  console.log("<", username, "> ", message)
})

bindEvents(bot);

function bindEvents(bot) {

    bot.on('error', function(err) {
        console.log('Tentando reconectar: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Tentando reconectar novamente');
            console.log('30 Segundos...');
            setTimeout(relog, 30000);
        }
    });

    bot.on('end', function() {
        console.log("O bot foi finalizado.");
        // If set less than 30s you will get an invalid credentials error, which we handle above.
        setTimeout(relog, 30000);  
    });
}

function relog() {
    console.log("Tentando conectar...");
    bot = mineflayer.createBot(options);
    bindEvents(bot);
}