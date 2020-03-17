$(function(){ 
  function buildHTML(message){
   if ( message.content && message.image ) {
     var html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__left">
          <div class="messages__left__name">
            ${message.user_name}
          </div>
          <div class="messages__left__date">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__comment">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src=${message.image}  class="class="lower-message__image">
        </div>
        
      </div>`
    } else if (message.content) {
      var html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__left">
          <div class="messages__left__name">
            ${message.user_name}
          </div>
          <div class="messages__left__date">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__comment">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
     var html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__left">
          <div class="messages__left__name">
            ${message.user_name}
          </div>
          <div class="messages__left__date">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__comment">
          <img src=${message.image}  class="class="lower-message__image">
        </div>
      </div>`
    };   
     return html;
  };

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);     
      $('form')[0].reset();
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight}); 
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.message').append(insertHTML);
          $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
  });