/**
 * Observe DOM mutations and covnert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */

var checkExist = setInterval(function() {
   if (document.getElementById("webMessengerRecentMessages") !== null) {
      monospaceInit();
      clearInterval(checkExist);
   }
}, 50);

function monospaceInit() {
    window.msgWindow = document.getElementById("webMessengerRecentMessages");
    update();
    // TODO: Update to just draw new elements.
    msgWindow.addEventListener('DOMNodeInserted', update, false);
}

var start = "`~";
var stop = "~`";

var del = "```";
var l = 2;


var text = [];

function update() {
    // TODO: fix discrepancies here
    var msgWindow = document.getElementById("webMessengerRecentMessages");
    var chat = msgWindow.getElementsByClassName("_38");

    // FB large chat specific
    for (i = chat.length-1; i >= 0; i--) {
        draw(chat[i].getElementsByTagName("p")[0]);
    }
}

//this should return nothing if only one line
function nBuild(newtext) {
    n = "";
    for (i = 1; i < newtext.split('\n').length + 1; i++) {
        n += "<br/>" + i;
    }
    return n.substring(5, n.length);
}


function draw(em) {
    text = em.innerText;
    var stop_index = text.lastIndexOf(del);
    var start_index = text.indexOf(del);
    // console.log( words.indexOf( "\n" ), start_index, stop_index );

    if (stop_index > start_index && start_index > -1) {
        var regexExpression = "/(" + del + ")(?:(?=(\\?))\2[^])*?\1/g";
        var regex = new RegExp(regexExpression, "i");
        var texts = text.split( regex );
        var codes = text.match( regex );
        
        var words = []; //array of words and codes in same order as text
        var newtext = "";
        
        //make sure code is up first
        if( start_index > 0){
            newtext += texts[0];
            texts.split();
        }
        
        //starts with codes[0] and builds innerHTML for em
        for(i = 0; i < codes.length; i++){
            newtext += "<div class='numbers'>" + nBuild(codes[i]) +"</div><pre class='text'>" + codes[i] + "</pre>";
            if(texts[i] != undefined){
                newtext += texts[i];
            }
        }

        //var newtext = text.substr(start_index + l, stop_index - start_index - l);
        //newtext = newtext.replace(/^[\r\n]+|[\r\n]+$/g, '');

        em.className += " code";
        em.innerHTML = newtext;
        hljs.highlightBlock(em.getElementsByClassName('text')[0]);
    }
}

var a = function assemble (w, s, t){
    var l = w.length;
    
    if( l <= 1 ) console.log( t + w[0]);
    
    if( s > 0 ){
        t += w[0];
        w.shift();
    }
    t += "<span>" + w[0] + "</span>";
    console.log(t);
    w.shift()
    assemble(w, 1, t);
}