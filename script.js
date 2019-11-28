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

var event_object = { "Event Type": "", "Event Target": "", "Event Time": ""};

setInterval(function(){ window.localStorage.clear(); }, 5000);

var ob_Windows_OnLoad = Object.create(event_object);
var ob_Windows_OnunLoad = Object.create(event_object);
var ob_Generate_Button = Object.create(event_object);
var ob_Alphabet_Button = Object.create(event_object);

window.onload = function (e) {
  ob_Windows_OnLoad['Event Type'] = e.type;
  ob_Windows_OnLoad['Event Target'] = e.target;
  ob_Windows_OnLoad['Event Time'] = e.timeStamp;
  var arr = [];
  arr.push(ob_Windows_OnLoad);
  arr.push(JSON.parse(window.localStorage.getItem('Windows OnLoad')));
  window.localStorage.setItem('Windows OnLoad', JSON.stringify(arr)); 
};

window.onunload = function (e) {
  ob_Windows_OnunLoad['Event Type'] = e.type;
  ob_Windows_OnunLoad['Event Target'] = e.target;
  ob_Windows_OnunLoad['Event Time'] = e.timeStamp;
  var arr = [];
  arr.push(ob_Windows_OnunLoad);
  arr.push(JSON.parse(window.localStorage.getItem('Windows OnUnload')));
  window.localStorage.setItem('Windows OnUnloadn', JSON.stringify(arr)); 
};

in_btn.addEventListener('click', function(e) {
  if(div_empty.innerHTML === '')
    div_empty=true;
  else
    div_empty=false;

  ob_Generate_Button["Event Type"] = e.type;
  ob_Generate_Button["Event Target"] = e.target;
  ob_Generate_Button["Event Time"] = e.timeStamp;
  var arr = [];
  arr.push(ob_Generate_Button);
  arr.push(JSON.parse(window.localStorage.getItem('Generate Button')));
  window.localStorage.setItem('Generate Button', JSON.stringify(arr)); 
  if (div_empty === false) {
    btn_div.innerHTML = '';
    img_div.innerHTML = '';
  }
  
  if (in_txt.value >= 1 && in_txt.value <= 26) {
    rand_char(in_txt.value);
    btn_div.addEventListener('click', function (e) {
      if(e.target.innerHTML.length === 1)
      {
        ob_Alphabet_Button['Event Type'] = e.type;
        ob_Alphabet_Button['Event Target'] = e.target;
        ob_Alphabet_Button['Event Time'] = e.timeStamp;
        var arr = [];
        arr.push(ob_Alphabet_Button);
        arr.push(JSON.parse(window.localStorage.getItem('Alphabet Random Button')));
        window.localStorage.setItem('Alphabet Random Button', JSON.stringify(arr));
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