document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("CharacterButtonA").onclick = function(){
        console.log("clicked button");

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length == 0){ 
                console.log("could not send mesage to current tab");
            }else{
                chrome.tabs.sendMessage(tabs[0].id, {name: "soldier"}, function(response) {
                    // console.log(response);
                });
            }
        });
    }
    document.getElementById("CharacterButtonB").onclick = function(){
        console.log("clicked button");

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length == 0){ 
                console.log("could not send mesage to current tab");
            }else{
                chrome.tabs.sendMessage(tabs[0].id, {name: "humanoid"}, function(response) {
                    // console.log(response);
                });
            }
        });
    }
});