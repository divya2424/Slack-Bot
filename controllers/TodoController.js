
var TodoModel = require("../models/TodoModel");
const SlackBot = require('slackbots');
var Slack = require('slack-node');
apiToken = "xoxb-638895790081-645299961040-6VfIA0W9OLFUHa9HsjrIxc9m";
var rest = require('restler');


slack = new Slack(apiToken);
 const bot = new SlackBot({
    token: apiToken,
    name: 'djbot'
});

bot.on("start", () => {
    console.log("Bot is ready.");
});
bot.on("message", (data) => {
    if(data.type==='message') {
    //   console.log('data',data)
    }
})



postToWebhook = function(listData){
    rest.post('https://hooks.slack.com/services/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', {
      data: JSON.stringify(botResponse(listData))
    }).on('complete', function(data, response) {
    });
  }

 botResponse = function(data){
    var res = {
      "text": "Bot Says " + data,
  }
  return res;
  }
  


exports.postTodo = function (req, res) { // Function to Post the Data in Todo Collection of Database
    var todo = new TodoModel({ // Making Object of Todo schema 
        name: req.body.text,
        description: `Added ${req.body.text || req.body.name}`,
        channel_name : req.body.channel_name,
        createdAt: new Date(),
        updatedAt: new Date()

    });
    let jsonReq = {
        name : req.body.text || req.body.name, 
        channel_name : req.body.channel_name
    };
    TodoModel.find(jsonReq,(err,allTodo)=>{
        if(err){
            // postToWebhook('I got an error')
            return res.json({
                "error" :true,
                "text": "Internal Server Error",
            });
        }
        else{
            if(allTodo.length == 0){
                todo.save(function (err, addTodo) { // Saving the Data into the Database
                    if (err) {
                        return res.json({
                            "error": true
                        });
                    }
                    // postToWebhook(addTodo.description);
                    res.json({
                        "error" : false,
                        "text": jsonReq.name,
                        "attachments": [
                            {
                                "text": addTodo.description
                            }
                        ]
                    });
            
                });
            }
            else{
                // postToWebhook("Item Already Added To Bag");
                return res.send({
                    "error" : false,
                    "text": req.body.text,
                    "attachments": [
                        {
                            "text": "Item Already Added To Bag"
                        }
                    ]
                });
            }
        
        }
    });

    
};

exports.getTodo = function (req, res) { // Function to Get the Data in Todo Collection of Database
    TodoModel.find({ channel_name : req.query.channel_name}, {name: 1,description : 1}, (err,allTodo)=>{
        if(err){
            // postToWebhook("Got An Error Oops!");
            return res.json({
                "error" :true,
                "text": "Internal Server Error",
            });
        }
        else{
            if(allTodo.length == 0){
                // postToWebhook("Empty Basket");
                return res.json({
                    "error" :true,
                    "text": "Empty Basket",
                });
            }
            else{              
                // postToWebhook(allTodo);
                return res.json({
                    "error" : false,
                    "text": allTodo
                })
            }
        
        }
    });
 

};

exports.removeTodo = function (req, res) { // Function to Remove the Data in Todo Collection of Database
    let name = req.body.text || req.body.name;
    let channel = req.body.channel_name; 
    TodoModel.find( {name: name,channel_name:channel},(err,response)=>{
        if(err){
            // postToWebhook("Got An Error Oops!");
            return res.json({
                "error" :true,
                "text": "Internal Server Error",
            });
        }
        else if(response.length == 0 ){
            let noData = "No Record Found";
            // postToWebhook(noData);
            return res.json({
                "error" :true,
                "text": noData,
            });
        }
        else{
            TodoModel.deleteOne({name: response[0].name},function (err, remove) { // Saving the Data into the Database
                if(err){
                    // postToWebhook("Got An Error Oops!");
                    return res.json({
                        "error" :true,
                        "text": "Internal Server Error",
                    });
                }
                else{
                    let val = `${name} Removed SuccessFully`;
                    // postToWebhook(val);
                    return res.json({
                        "error" : false,
                        "text": name,
                        "attachments": [
                            {
                                "text": val
                            }
                        ]
                    });
                }
            });
        }
    })



};

