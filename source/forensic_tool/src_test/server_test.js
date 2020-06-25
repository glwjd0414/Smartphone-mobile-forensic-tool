var io = require('socket.io').listen(3000);

io.on('connection', function(socket){
	console.log('connect');
	var instanceId = socket.id;

	socket.on('alert', function(data){
		console.log(data);
	})
})