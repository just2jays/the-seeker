$(document).ready(function() {
    $('body').append('<div id="sprite-container"><div class="sprite cat-soldier" style="background: url('+chrome.extension.getURL('images/sprite_cat-soldier.png')+') 0 0 no-repeat;"></div></div>');
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
    var $walker = $('#sprite-container');
    var lastX = 0;
    var lastY = 0;

    $('body').on('mousemove', function(event) {
        $walker.removeClass('moving-left moving-right stopped')
        if( event.pageX-($walker.outerWidth()/2) < $walker.position().left ) {
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
        $walker.animate({ top: event.pageY-$walker.outerHeight(), left: event.pageX-($walker.outerWidth()/2) }, 6000, 'swing', function(){
            $walker.removeClass('moving-left moving-right');
            $walker.addClass('stopped');
        });
    });
}

function newCharacter(name) {
    $('#sprite-container').remove();
    if( name == "soldier" ) {
        $('body').append('<div id="sprite-container"><div class="sprite cat-soldier" style="background: url('+chrome.extension.getURL('images/sprite_cat-soldier.png')+') 0 0 no-repeat;"></div></div>');
    }else if( name == "sir-nerdington"  ) {
        $('body').append('<div id="sprite-container"><div class="sprite sir-nerdington" style="background: url('+chrome.extension.getURL('images/sprite_sir-nerdington.png')+') 0 0 no-repeat;"></div></div>');
    }else if( name == "the-robot"  ) {
        $('body').append('<div id="sprite-container"><div class="sprite the-robot" style="background: url('+chrome.extension.getURL('images/sprite_the-robot.png')+') 0 0 no-repeat;"></div></div>');
    }
    beginJourney();
}