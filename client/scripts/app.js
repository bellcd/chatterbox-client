var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    // attach click handler on refresh button to invoke Parse.readAll onclick
    $('#refresh').click(() => {
      Parse.readAll((data) => {
        MessagesView.render(data);
      });
    });

    // attach click handler for refresh button getting only certain messages from the server
    $('#get-only-one-room').click(() => {
      Parse.readOnlySomeRooms((data) => {
        MessagesView.render(data);
      }, null, RoomsView.currentlySelected);
    });

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      MessagesView.render(data);
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
