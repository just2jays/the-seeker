class Character {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.template = '<div id="sprite-container"><div class="sprite '+name+'" style="background: url('+chrome.extension.getURL('images/sprite_'+name+'.png')+') 0 0 no-repeat;"></div></div>';
        this.movementTimer = undefined;

        $('body').append(this.template);
    }

    initiateMovement() {
        $('body').off('mousemove');
        clearTimeout(currentCharacter.movementTimer);

        // generate a random Bool for choosing b/w 2 options
        //  - this will have to change once more are added obvs
        var decidedPath = Math.random() >= 0.5;

        if(decidedPath) {
            currentCharacter.followRandomPoint();
        }else{
            currentCharacter.followUserMouse();
        }
        currentCharacter.movementTimer = setTimeout(currentCharacter.initiateMovement, 8000);
    }

    followRandomPoint() {
        var $walker = $('#sprite-container');
        var randomX = Math.random() * (window.outerWidth - 1) + 1;
        var randomY = Math.random() * (window.outerHeight - 1) + 1;
        var lastX = 0;
        var lastY = 0;

        $walker.removeClass('moving-up moving-down moving-left moving-right stopped')
        
        if( randomX-($walker.outerWidth()/2) < $walker.position().left ) {
            // moving LEFT
            $walker.addClass('moving-left');
        }else{
            // moving RIGHT
            $walker.addClass('moving-right');
        }
        lastX = randomX;

        if( randomY < lastY ) {
            // moving UP
            $walker.addClass('moving-up');
        }else{
            // moving DOWN
            $walker.addClass('moving-down');
        }
        lastY = randomY;

        $walker.stop();
        $walker.animate({ top: randomY-$walker.outerHeight(), left: randomX-($walker.outerWidth()/2) }, 6000, 'swing', function(){
            $walker.removeClass('moving-up moving-down moving-left moving-right');
            $walker.addClass('stopped');
            this.followRandomPoint();
        }.bind(this));
    }

    followUserMouse() {
        var $walker = $('#sprite-container');
        var lastX = 0;
        var lastY = 0;
    
        $('body').on('mousemove', function(event) {
            // Remove all previous classes
            $walker.removeClass('moving-up moving-down moving-left moving-right stopped');
            
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
                $walker.addClass('moving-up');
            }else{
                // moving DOWN
                $walker.addClass('moving-down');
            }
            lastY = event.pageY;
    
            $walker.stop();
            $walker.animate({ top: event.pageY-$walker.outerHeight(), left: event.pageX-($walker.outerWidth()/2) }, 6000, 'swing', function(){
                $walker.removeClass('moving-left moving-right');
                $walker.addClass('stopped');
            });
        });
    }

    // Remove the character from page entirely
    kill() {
        $('#sprite-container').remove();
    }
}

// Create Default Character
var currentCharacter = new Character("cat-soldier");

// Start the initial journey
$(document).ready(function() {
    currentCharacter.initiateMovement();
});

// Listen for Character change request
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        currentCharacter.kill();
        currentCharacter = new Character(request.name);
        currentCharacter.initiateMovement();
    }
);