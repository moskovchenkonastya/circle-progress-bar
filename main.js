const inputElement = document.getElementById('value');
const el = document.getElementById('bar'); // get canvas
const toggleAnimate = document.getElementById('toggle_animate');
const toggleHide = document.getElementById('toggle_hide');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const yellow = '#f5ed25';
const gray = '#efefef';

const MAX_VALUE = 100;
const MIN_VALUE = 0;
const MATH_VALUE = Math.PI * 2;


var options = {
    percent:  el.getAttribute('data-percent') || 1,
    size: el.getAttribute('data-size') || 160,
    lineWidth: el.getAttribute('data-line') || 10,
    rotate: el.getAttribute('data-rotate') || 0,
    loading: 0
};

canvas.width = canvas.height = options.size;
el.appendChild(canvas);
ctx.translate(options.size / 2, options.size / 2); // change center
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

const radius = (options.size - options.lineWidth) / 2;

function hideProgress() {
    if(toggleHide.checked) {
        el.style.display = "none";
        canvas.style.display = "none";

    } else {
        drawCircle(gray, options.lineWidth, 1);
        el.style.display = "block";
        canvas.style.display = "block";
    }
}

function limitLength() {
    var value = inputElement.value;
    value = (value.search(/[0-9]/) !== 0) ? MIN_VALUE : value;
    value = parseInt(value, 10);
    value = (value < MIN_VALUE) ? MIN_VALUE : value;
    value = (value > MAX_VALUE) ? MAX_VALUE : value;
    inputElement.value = value;
    updateValue();
}

function updateValue() {
    var val = inputElement.value;
    if (val !== 0 && val >= 0 && val <= 100) {
        drawCircle(gray, options.lineWidth, 0, 1);
    }
    if (val !== 0 && val > 0 && val <= 100 ) {
        if(toggleAnimate.checked){
            drawAnimateBar(val)
        } else{
            drawCircle(yellow, 8, 0, (val - 1) / MAX_VALUE);
        }
    }
}

function drawAnimateBar(val) {

    var i = 1;
    var timerId = setInterval(function() {
        drawCircle(yellow, 8, 0,  i / MAX_VALUE);
        console.log(i);
        console.log(val);
        if (i === Number(val)){
            clearInterval(timerId);
        }
        i++;
    }, 100);
}

var drawCircle = function(color, lineWidth, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, startAngle * MATH_VALUE, endAngle * MATH_VALUE);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
};

inputElement.onkeyup = inputElement.onchange = limitLength;
drawCircle(gray, options.lineWidth, 0, 1);



