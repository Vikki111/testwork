

function GO() {
    var item = document.getElementsByClassName('item')[0];
    item.innerHTML = 'Hello, world!';
    var start = document.getElementsByClassName('start')[0];
    start.onclick = function() {
        var container = document.getElementsByClassName('container')[0];
        container.classList.add('container-active');
        var item2 = document.getElementsByClassName('item')[0];

        var pos = 10;
        var id = setInterval(frame, 15);
        function frame() {
            if (pos == 50) {
                clearInterval(id);
            } else {
                pos=pos+0.5; 
                item2.style.top = pos + '%'; 
                item2.style.left = pos + '%'; 
            }
        }
    };
}

window.onload = function () {
    GO();
}

