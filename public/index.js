$('#btn-input').keypress((event) => {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        onUserSendMessage()
    }
})

$('#btn-chat').click(() => {
    onUserSendMessage()
});

onUserSendMessage = () => {
    if (isFileAttachmentVisible()) {
        let inputFile = $("#input-attach")[0].files[0];
        if (!inputFile) {
            alert('You must select a file first');
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.msg_container_base').append(createMessageTemplate('USER', 'IMAGE', e.target.result));
        }
        reader.readAsDataURL(inputFile);
        animateIncomingMessage().then(() => {
            setFileAttachmentVisibility(false);
            sendUserImage(inputFile, (replyType, replyData) => {
                onReplyReceived(replyType, replyData)
            });
        })
    } else {
        let userText = $('#btn-input').val();
        if (userText == "") {
            return
        }
        $('.msg_container_base').append(createMessageTemplate('USER', 'TEXT', userText));
        $('#btn-input').val('')
        animateIncomingMessage().then(() => {
            sendUserMessage(userText, (replyType, replyData) => {
                onReplyReceived(replyType, replyData)
            });
        })
    }
}

function sendUserMessage(text, callback) {
    $.get('https://evrwg36k9k.execute-api.us-east-1.amazonaws.com/Stage1/search', {
        chatText: text
    }, (output) => {
        console.log(typeof output)
        outputs = output.split(" , ")
        for (i = 0; i < outputs.length; i++) { 
            if(outputs[i].startsWith("http")) {
                console.log(outputs[i])
                callback('IMAGE', outputs[i])
            }
            else if(outputs[i] != ""){
                callback('TEXT', outputs[i])
            }
        }
        
        
    })
    //TODO SEND USER MESSAGE TO BOT HERE
    //TODO When replycomes call the callback with replyType and replyData: callback('TEXT', 'Hello') or callback('IMAGE', 'url')
    //Reply can be of 2 types: TEXT or IMAGE.
}

function sendUserImage(inputFile, callback){
    //TODO SEND USER IMAGE TO BOT HERE
    //TODO When replycomes call the callback with replyType and replyData: callback('TEXT', 'Hello') or callback('IMAGE', 'url')
    //Reply can be of 2 types: TEXT or IMAGE.

    console.log("Image")
    console.log(typeof inputFile)
    console.log(btoa(inputFile))

    var reader = new FileReader();
    reader.readAsBinaryString(inputFile);

    
    reader.onload = function () {
        var body = btoa(reader.result);
        var additionalParams = {
            headers: {
                "Content-Type" : "image/***"
            }
            
        };
        var params = {"Content-Type" : "image/***", "key":inputFile["name"],"bucket":"store-photos-b2"};
        apigClient = apigClientFactory.newClient()
        apigClient.uploadBucketKeyPut(params, body, additionalParams)
        .then(function(result){
            console.log("PUT request success: ", result)
            //insertChat("the_bot", messageFromBot);
            //This is where you would put a success callback
        }).catch( function(result){
            console.log("PUT request failed: ", result)
            //insertChat("the_bot", "I am sorry! I think I am not well right now. I will help you later. If you are a developer, you should check my logs.");
            //This is where you would put an error callback
        });   
    };

    reader.onerror = function () {
        console.log(reader)
    };

    
}

onReplyReceived = (replyType, replyData) => {
    $('.msg_container_base').append(createMessageTemplate('BOT', replyType, replyData));
    animateIncomingMessage()
}

onReplyReceived('TEXT', 'If you need some help, drop me a text!')
