var in_txt = document.querySelector('#in_txt');
var in_btn = document.querySelector('#in_btn');
var btn_div = document.querySelector('#btn_div');
var img_div = document.querySelector('#img_div');
var img = document.querySelector('img');
var div_empty = document.querySelector('.empty');
var letters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x","y", "z"
];
var arr_ch = [letters.length];

setInterval(function(){ window.localStorage.clear(); }, 50000);

var event_object = { "Event Type": "", "Event Target": "", "Event Time": ""};

var ob_Windows_OnLoad = Object.create(event_object);
var ob_Windows_OnunLoad = Object.create(event_object);
var ob_Generate_Button = Object.create(event_object);
var ob_Alphabet_Button = Object.create(event_object);

function get_event_info(object_name, e){
  object_name['Event Type'] = e.type;
  object_name['Event Target'] = e.target;
  object_name['Event Time'] = e.timeStamp;
}

function store_event_info(object_name, key_name){
  var arr = [];
  arr.push(object_name);
  arr.push(JSON.parse(window.localStorage.getItem(key_name)));
  window.localStorage.setItem(key_name, JSON.stringify(arr)); 
}

window.onload = function (e) {
  get_event_info(ob_Windows_OnLoad, e);
  store_event_info(ob_Windows_OnLoad, 'Windows OnLoad');
};

window.onunload = function (e) {
  get_event_info(ob_Windows_OnunLoad, e);  
  store_event_info(ob_Windows_OnunLoad, 'Windows OnUnloadn');
};

in_btn.addEventListener('click', function(e) {
  if(div_empty.innerHTML === '')
    div_empty=true;
  else
    div_empty=false;

  get_event_info(ob_Generate_Button, e);
  store_event_info(ob_Generate_Button, 'Generate Button');
  if (div_empty === false) {
    btn_div.innerHTML = '';
    img_div.innerHTML = '';
  }
  
  if (in_txt.value >= 1 && in_txt.value <= 26) {
    rand_char(in_txt.value);
    btn_div.addEventListener('click', function (e) {
      if(e.target.innerHTML.length === 1)
      {
        get_event_info(ob_Alphabet_Button, e);
        store_event_info(ob_Alphabet_Button, 'Alphabet Random Button');

        img.setAttribute('src',`pic/${e.target.innerHTML}.jpg`);
        img_div.appendChild(img);
      }
    });
  } 
});

function rand_char(l) {
  for (var i = 0; i < letters.length; i++) {
    arr_ch[i]=false;
  }
  while (l > 0) {
    var x = Math.floor(Math.floor(Math.random() * 26) + 1);

    if (arr_ch[x - 1] == false) {
      arr_ch[x - 1] = true;
      var btn = document.createElement('button');
      btn.innerHTML = letters[x - 1].toUpperCase();
      btn_div.appendChild(btn);
      l--;
    }
  }
}