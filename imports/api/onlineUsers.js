Meteor.publish('onlineUsers', function () {
  return Meteor.users.find({
    'status.online': true
  }, {
    fields: {
      username: 1,
      isPlaying: 1,
      gameId: 1
    }
  });
});
