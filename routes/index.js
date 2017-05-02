var mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mean'
});


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack); 
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

var internals = {};

internals.status = function(request, reply) {
	return reply('OK');
};

module.exports = [

    { method: 'GET', path: '/status/{id?}', handler: function(req,reply){
    	console.log("name ", req.params.id);
    	var re= {};
    	if(req.params.id !== null && req.params.id !== undefined){
    		connection.query('SELECT article.*, user.name, user.`email` FROM article JOIN `user` ON article.user_id = user.id where article.id = ?', [req.params.id] , function(err,result, fields){
		      if(err){
		      	re.msg= err;
		      	re.data= '';
		      }		      
		      	re.msg = "Result Found";
		      	re.data = result;
		      	reply(re);
		   });
    	}else{
    		connection.query('SELECT article.*, user.name, user.`email` FROM article JOIN `user` ON article.user_id = user.id ', function(err,result, fields){
		      if(err){
		      	re.msg= err;
		      	re.data= '';
		      }	
		      re.msg = "Total Records Found " +result.length;
		      re.data= result; 
		      reply(re);
		   });
    	}
    } },
    { method: 'GET', path: '/', handler: internals.status }

];
