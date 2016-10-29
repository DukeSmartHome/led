var numlights = 0; // keeps track of number of lights
var phaseShift = 0; // phase shift
var requestID; // ID of request animation frame

addLEDs();

$(window).resize(function () {
    addLEDs();
});

function addLEDs() {
    var size = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }
    $('#led-display').empty();
    numlights = Math.round(size.width / 150);
    for (var i = 0; i < numlights; ++i) {
        insertLED(i);
        $('#led-' + i).css('left', i * 150 + 'px');
        $('#led-' + i).css('bottom', ((100 * getSinePos(i, 0)) - 300) + 'px');
    }
}

function insertLED(id) {
    var led_html = '<div class="led-body" id="led-' + id + '"><div class="left-pin"></div><div class="right-pin"></div><div class="led-cap"></div></div>'
    $('#led-display').append(led_html);
}

$("#led-display")
    .mouseenter(function () {
        animateLights();
    })
    .mouseleave(function () {
        cancelAnimationFrame(requestID);
    });


function animateLights() {
    phaseShift += 0.060;
    for (var i = 0; i < numlights; ++i) {
        var bottomShift = getSinePos(i, 0),
            colorShift = (bottomShift / 3) + 0.5;
        $('#led-' + i).css('bottom', ((100 * bottomShift) - 300) + 'px');
        $('#led-' + i).css('background-color', 'rgba(255, 255, 255, ' + colorShift + ')');
    }
    requestID = requestAnimationFrame(animateLights);
}

function getSinePos(index, phase) {
    return Math.sin((0.5 * index) + phaseShift);
}

function shortAnim() {
    animateLights();
    window.setTimeout(function () {
        cancelAnimationFrame(requestID);
    }, 300);
}
