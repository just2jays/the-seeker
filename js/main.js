$(document).ready(function() {
    $('body').append('<div id="mainbox" class="plain-box"><div class="sprite cat-soldier"></div></div>');
    beginJourney();

    $('#mainElement').on('click', '.new-character', newCharacter);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(request);
        newCharacter(request.name);
    }
);

function beginJourney() {
    var $walker = $('.plain-box');
    var lastX = 0;
    var lastY = 0;

    $('body').on('mousemove', function(event) {
        $walker.removeClass('moving-left moving-right')
        if( event.pageX < $walker.position().left ) {
            // moving LEFT
            $walker.addClass('moving-left');
        }else{
            // moving RIGHT
            $walker.addClass('moving-right');
        }
        lastX = event.pageX;

        if( event.pageY < lastY ) {
            // moving UP
        }else{
            // moving DOWN
        }
        lastY = event.pageY;

        $walker.stop();
        $walker.animate({ top: event.pageY, left: event.pageX }, 10000);
    });
}

function newCharacter(name) {
    $('#mainbox').remove();
    if( name == "soldier" ) {
        $('body').append('<div id="mainbox" class="plain-box"><div class="sprite cat-soldier"></div></div>');
        beginJourney();
    }else{
        $('body').append('<div id="mainbox" class="plain-box"><img src="'+chrome.extension.getURL('images/free_walker.gif')+'" /></div>');
        beginJourney();
    }
}