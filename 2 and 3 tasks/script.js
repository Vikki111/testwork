/***********прелоадер*************/


  $(window).on('load', function () {
    setTimeout(function() {
      $('.loader').fadeOut('slow');
      $('.loader-area').fadeOut('slow');
    }, 1500);
 
  });



let flag = 0,
    svg = document.querySelector('svg');

// Необходимо поймать второй клик (если на первом удалить атрибуты, анимация не начнётся), потом подменяем функцию на вызов по "разморозке" анимации
let start = function(){
  if(flag === 1){
    // Убираем у animateTransform триггер, чтобы не сбрасывалась анимация на ноль
    Array.from(svg.querySelectorAll('animateTransform')).forEach(e => e.removeAttribute('begin'));
    start = _ => svg.unpauseAnimations();
    start();
  }
  flag++;
}

const pause = function(){
  svg.pauseAnimations();
}  


setTimeout(function(){
  start();
}, 0);

setTimeout(function(){
  pause();
}, 500);




/*******************отправляем запрос и обрабатываем********************/
 var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=HTML&type=video&maxResults=20&key=AIzaSyDRWcNLaeIAqgcNoj0UAkO9Lgla59LO0fI', false);
  xhr.send();

  if (xhr.status != 200) {
        // обработать ошибку
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
      } else {
        // вывести результат
        var text = xhr.responseText;
        for(var i = 0; i<20; i++){
         var videoname = document.getElementById('video-name' + String(i)); 
         var from = text.indexOf('"title":');
         var to = text.indexOf('"description"');
         var tmp = text.substring(from+9, to-6);  
         videoname.innerHTML = tmp;

         var img = document.getElementById('preview' + String(i)); 
         var from2 = text.indexOf('"url"');
         var to2 = text.indexOf('"width": 120');
         var tmp2 = text.substring(from2+8, to2-9);
         img.setAttribute('src', tmp2);


         var from4 = text.indexOf('"videoId"');
         var to4 = text.indexOf('"snippet"');
         var videoid = text.substring(from4+12, to4-11);
         var videolink = "https://www.youtube.com/watch?v=" + videoid;
         var a = document.getElementsByTagName('a')[i];
         a.setAttribute('href', videolink);


          //очищаем исп текст
          var to3 = text.indexOf('"none"');
          text = text.slice(to3+19, -1);
        }

      }




/**************делаем пагинатор******************/

var count = 20; //всего записей
var cnt = 5; //сколько отображаем сначала
var cnt_page = Math.ceil(count / cnt); //кол-во страниц

//выводим список страниц
var paginator = document.querySelector(".paginator");
var page = "";
for (var i = 0; i < cnt_page; i++) {
  page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
}
paginator.innerHTML = page;

//выводим первые записи {cnt}
var div_num = document.querySelectorAll(".num");
for (var i = 0; i < div_num.length; i++) {
  if (i < cnt) {
    div_num[i].style.display = "block";
  }
}

var main_page = document.getElementById("page1");
main_page.classList.add("paginator-active");

//листаем
function pagination(event) {
  var e = event || window.event;
  var target = e.target;
  var id = target.id;
  
  if (target.tagName.toLowerCase() != "span") return;
  
  var num_ = id.substr(4);
  var data_page = +target.dataset.page;
  main_page.classList.remove("paginator-active");
  main_page = document.getElementById(id);
  main_page.classList.add("paginator-active");

  var j = 0;
  for (var i = 0; i < div_num.length; i++) {
    var data_num = div_num[i].dataset.num;
    if (data_num <= data_page || data_num >= data_page)
      div_num[i].style.display = "none";

  }
  for (var i = data_page; i < div_num.length; i++) {
    if (j >= cnt) break;
    div_num[i].style.display = "block";
    j++;
  }
}



