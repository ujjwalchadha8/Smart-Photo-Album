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
            sendUserMessage(inputFile, (replyType, replyData) => {
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
        callback('IMAGE', output.split(" , ")[0])
    })
    //TODO SEND USER MESSAGE TO BOT HERE
    //TODO When replycomes call the callback with replyType and replyData: callback('TEXT', 'Hello') or callback('IMAGE', 'url')
    //Reply can be of 2 types: TEXT or IMAGE.
}

function sendUserImage(inputFile, callback){
    //TODO SEND USER IMAGE TO BOT HERE
    //TODO When replycomes call the callback with replyType and replyData: callback('TEXT', 'Hello') or callback('IMAGE', 'url')
    //Reply can be of 2 types: TEXT or IMAGE.
}

onReplyReceived = (replyType, replyData) => {
    $('.msg_container_base').append(createMessageTemplate('BOT', replyType, replyData));
    animateIncomingMessage()
}

onReplyReceived('TEXT', 'If you need some help, drop me a text!')
onReplyReceived('TEXT', 'Here is a flower for you!')
onReplyReceived('IMAGE', 'https://www.gstatic.com/webp/gallery3/1_webp_ll.png')
