Rappers = new Mongo.Collection(null)

var rappers = null
var texts
var counter = 0
var rapperInsert
listOfDefaults = ["Tupac", "Destiny's_Child", "Drake", "Wale"]
added = []

if (Meteor.isClient) {
  Meteor.startup(function() {
    var rappers=[]
    React.render(<App/>, document.getElementById('container'))
    var title = "J._Cole"
    function getWikiForreal(wikiTitle) {
      if(added.indexOf(wikiTitle)==-1){
      added.push(wikiTitle)
      var url = "http://dbpedia.org/sparql";
      var query = "select ?z where {<http://dbpedia.org/resource/"+wikiTitle+"> dbo:associatedMusicalArtist ?z}"
      var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
      var temp
      $.ajax({
        dataType: "jsonp",
        url: queryUrl,
        success: function(data) {
          rappers=[]
          for (var value of data.results.bindings)
            rappers.push(value.z.value.split("http://dbpedia.org/resource/")[1])


          rapperInsert = {
            name: wikiTitle,
            rapperList: rappers

          }
          Rappers.insert(rapperInsert)
          for (var value of data.results.bindings)
            {temp=value.z.value.split("http://dbpedia.org/resource/")[1]
            getWikiForreal(temp)

}
        }

      })
    }
    else {
      return
    }
}
    getWikiForreal(title)
  })
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.methods({})
  })
}
