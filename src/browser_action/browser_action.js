document.addEventListener('DOMContentLoaded', function() {

    // SOLDIER CAT
    document.getElementById("CharacterButtonA").onclick = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length == 0){ 
                console.log("could not send mesage to current tab");
            }else{
                chrome.tabs.sendMessage(tabs[0].id, {name: "cat-soldier"}, function(response) {
                    // console.log(response);
                });
            }
        });
    }

    // SIR NERDINGTON
    document.getElementById("CharacterButtonB").onclick = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length == 0){ 
                console.log("could not send mesage to current tab");
            }else{
                chrome.tabs.sendMessage(tabs[0].id, {name: "sir-nerdington"}, function(response) {
                    // console.log(response);
                });
            }
        });
    }

    // THE ROBOT
    document.getElementById("CharacterButtonC").onclick = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length == 0){ 
                console.log("could not send mesage to current tab");
            }else{
                chrome.tabs.sendMessage(tabs[0].id, {name: "the-robot"}, function(response) {
                    // console.log(response);
                });
            }
        });
    }

    // PUPPY
    document.getElementById("CharacterButtonD").onclick = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length == 0){ 
                console.log("could not send mesage to current tab");
            }else{
                chrome.tabs.sendMessage(tabs[0].id, {name: "puppy"}, function(response) {
                    // console.log(response);
                });
            }
        });
    }

});