var JSONdata;

$.get("getPatientQuestion", function(data){
  document.getElementById('question').innerHTML = buildQuestion(data);
});

function buildQuestion(data) {
  JSONdata = JSON.parse(data);
  var returnHTML = "";
  //var id = baslib.getByString(compileIDs(data.Questions));
  returnHTML = returnHTML + "<form>";
  returnHTML = returnHTML + "<h1>" + JSONdata.title + "<\/h1><br\/>"
  for(var i=0;i<JSONdata.response.length;i++) {
    returnHTML = returnHTML + "<button type=\"submit\" name=\"result\" onClick=\"submitQuestion(" + i + ");\"";
  }
  return returnHTML;
}

function compileIDs(data) {
  var returnArray = [];
  for(var i=0;i<data.length;i++) {
    returnArray.push(data[i].id);
  }
  return returnArray;
}

function submitQuestion(answer) {
  $.post( "setPatientQuestionResult", { file: JSONdata.file ,id: JSONdata.id, answer: JSONdata.response("") } );
}
