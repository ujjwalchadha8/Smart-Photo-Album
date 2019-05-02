function animateIncomingMessage() {
    $('#btn-input').val('')
    let msgContainer = $('.msg_container_base');
    msgContainer.animate({
        scrollTop: msgContainer[0].scrollHeight
    }, 300)
    return msgContainer.promise()
}

$("#input-attach-container").hide();
$("#input-attach-toggle").click(() => {
    setFileAttachmentVisibility(!isFileAttachmentVisible())
})

function isFileAttachmentVisible() {
    return $("#input-attach-container").is(":visible")
}

function setFileAttachmentVisibility(makeVisible) {
    if (makeVisible) {
        $("#input-attach-container").show();
        $("#btn-input").prop('disabled', true);
    } else {
        $("#input-attach-container").hide();
        $("#btn-input").prop('disabled', false);
    }
}

function createMessageTemplate(messageSender, messageType, messageData) {
    switch (messageSender) {
        case 'USER':
            switch(messageType) {
                case 'IMAGE':
                    return `
                    <div class="row msg_container base_sent">
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_sent">
                                <img src='` + messageData + `'>
                                <time datetime="2009-11-13T20:00">you . now</time>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="resources/empty_dp.jpg" class=" img-responsive ">
                        </div>
                    </div>`
                case 'TEXT':
                return `
                    <div class="row msg_container base_sent">
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_sent">
                                <p>` + messageData + `</p>
                                <time datetime="2009-11-13T20:00">you . now</time>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="resources/empty_dp.jpg" class=" img-responsive ">
                        </div>
                    </div>`
            }
            break;
        case 'BOT':
            switch(messageType) {
                case 'TEXT':
                return `
                    <div class="row msg_container base_receive">
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_sent">
                                <p>` + messageData + `</p>
                                <time datetime="2009-11-13T20:00">chatbot . now</time>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                        </div>
                    </div>`
                
                case 'IMAGE':
                return `
                    <div class="row msg_container base_receive">
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_sent">
                                <img src='` + messageData + `'>
                                <time datetime="2009-11-13T20:00">chatbot . now</time>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                        </div>
                    </div>`
            }
            break;
    }
}