Rappers=new Mongo.Collection("rappers")
if (Meteor.isClient) {
Meteor.startup(function(){
React.render(<App />,document.getElementById('container'))


})
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
