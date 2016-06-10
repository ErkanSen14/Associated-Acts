Rappers = new Mongo.Collection(null)

let rappers = null
let texts
let counter = 0
let rapperInsert
let index = 0
let tempIndex = 0
listOfDefaults = ["Tupac", "Destiny's_Child", "Drake", "Wale"]
let added = []
let names = {"nodes":[]}
let links = {"links":[]}
let origin = 0
let temp2=1
if (Meteor.isClient) {
  Meteor.startup(function() {
   let rappers = []
    //React.render(<App/>, document.getElementById('bar'))
    let title = "J._Cole"
    function getWikiForreal(wikiTitle) {
      tempIndex++
      console.log(tempIndex)
      rappers = []
      if (!Rappers.findOne({name: wikiTitle})) {
        let url = "http://dbpedia.org/sparql";
        let query = "select ?z where {<http://dbpedia.org/resource/" + wikiTitle + "> dbo:associatedMusicalArtist ?z}"
        let queryUrl = encodeURI(url + "?query=" + query + "&format=json");
        let temp
        $.ajax({
          dataType: "jsonp",
          url: queryUrl,
          success: function(data) {
            for (let value of data.results.bindings)
              rappers.push(value.z.value.split("http://dbpedia.org/resource/")[1])



            return insertRappers(wikiTitle,rappers,data)
          }

        })
      }
      else {
        return
      }
    }



    function insertRappers(name, rappers,data){
    //  names.nodes.push(name)
      if(rappers.length>0)
      rapperInsert = {
        name: name,
        rapperList: rappers

      }
      else if(rappers.length<=0)
      {
        rapperInsert = {
          name: name,
          rapperList: ["err"]
        }

      }
      Rappers.insert(rapperInsert)
      if(added.indexOf({name}) >-1) {
          console.log(name + "is at " + added.indexOf(name))
        }
      else {
      names.nodes.push({"name": name, "group": 1})
      added.push(name)
    }
      let temp = origin + temp2
      for (let value of rappers) {
        if(added.indexOf({value}) > -1) {
            console.log(name + "is at " + added.indexOf(name))
          }
          else {
        names.nodes.push({"name": value, "group": 1})
        added.push(value)
      }
        links.links.push({"source": origin, "target": temp, "value": 1})
        temp++
      }
      temp2 = temp
      return recurse(data)
    }

    function recurse(data){
      for (let value of data.results.bindings) {
        temp = value.z.value.split("http://dbpedia.org/resource/")[1]
        if(tempIndex === 20) {
          break
        }
        getWikiForreal(temp)
        origin++

}
return
}

function getDaWiki(callback) {
  getWikiForreal(title)
  setTimeout(callback, 0500)
}

function drawD3() {
  console.log(added)
    //d3 function to draw
    var width = 960,
height = 500
    var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
var force = d3.layout.force()
  .gravity(0.05)
  .distance(100)
  .charge(-100)
  .size([width, height]);
force
    .nodes(names.nodes)
    .links(links.links)
    .start();
var link = svg.selectAll(".link")
    .data(links.links)
  .enter().append("line")
    .attr("class", "link");
var node = svg.selectAll(".node")
    .data(names.nodes)
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);
node.append("image")
    .attr("xlink:href", "https://github.com/favicon.ico")
    .attr("x", -8)
    .attr("y", -8)
    .attr("width", 16)
    .attr("height", 16);
node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name });
force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
})
console.log(names)
console.log(links)
}
getDaWiki(drawD3)
  })
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.methods({})
  })
}
