const inputElement = document.getElementById('value');
const formLayout = document.getElementById('form');
const el = document.getElementById('bar'); // get canvas
const toggleAnimate = document.getElementById('toggle_animate');
const toggleHide = document.getElementById('toggle_hide');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const yellow = '#f5ed25';
const gray = '#efefef';

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
        drawCircle(gray, options.lineWidth, 200 / 100);
        el.style.display = "block";
        canvas.style.display = "block";
    }
}

function limitLength() {
    if (inputElement.value > 100) {
        inputElement.value = inputElement.value.replace(/[0-9]$/, '');
    }
}

function updateValue() {
    var val = inputElement.value;
    if (val !== 0 && val > 0 && val <= 100) {
        drawCircle(gray, options.lineWidth, 0, 2 * 100 / 100);
    }
    if(val === '' || val === 0) {
        drawCircle(gray, options.lineWidth, 0, 2 * 100 / 100);
    }
    if (val !== 0 && val > 0 && val <= 100 ) {
        if(toggleAnimate.checked){
            drawAnimateBar(val)
        } else{
            drawCircle(yellow, 8, 0, (val * 2 )/ 100);
        }
    }
}

function drawAnimateBar(val) {
    var i = 1;
    var timerId = setInterval(function() {
        drawCircle(yellow, 8, 0,  i * 2 / 100);
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
    ctx.arc(0, 0, radius, startAngle * Math.PI, endAngle * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
};


inputElement.onkeyup = inputElement.onchange = limitLength;
inputElement.oninput = updateValue;
drawCircle(gray, options.lineWidth, 0, 200 / 100);



