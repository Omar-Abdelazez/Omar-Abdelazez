//Necessary Definitions:
var in_txt = document.querySelector('#in_txt');//textBox that contain the number of alphabets.
var in_btn = document.querySelector('#in_btn');//Generate button.
var btn_div = document.querySelector('#btn_div');//the div that will contain the alphabets buttons.
var img_div = document.querySelector('#img_div'); //the div that will contain the image of the alphabet.
var img = document.querySelector('img');//the image of the alphabet.
var div_empty = document.querySelector('.empty');//to empty the div with the button and the image.
var letters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x","y", "z"
]; //array of the characters.
var arr_ch = [letters.length];//the lenght of the array of character = 26.
var arr_obj = [];//array of the stored object.
var arr_key_name = [];//array of the key name of the stored object.
//to create objects with the necessary attribute.
var event_object = { Event_Type: "", Event_Target: "", Event_Time: ""};
var ob_Windows_OnLoad = Object.create(event_object);
var ob_Windows_OnunLoad = Object.create(event_object);
var ob_Generate_Button = Object.create(event_object);
var ob_Alphabet_Button = Object.create(event_object);

//Necessary Function:
//to get event information to the object
function get_event_info(object_name, e){
  object_name['Event_Type'] = e.type;
  object_name['Event_Target'] = e.target;
  object_name['Event_Time'] = new Date().toLocaleString() + " / Time Stamp: " + e.timeStamp;//e.timeStamp;
}
//to store object in array and in localStorage as will.
function store_event_info(object_name, key_name){ 
  arr_obj.push(object_name);
  window.localStorage.setItem(key_name, JSON.stringify(arr_obj)); 
  arr_key_name.push(key_name);
}
//so evrey 5 second the stored objects in the array are sent to php file, 
//and Upon success the localstorage will be cleared as will the array of object.
setInterval(function event_ajax(){
  for(var i=0 ; i< arr_obj.length ; i++){
    arr_obj[i].Event_Target=arr_key_name[i];
    $.ajax({
      type: "POST",
      url: "ajax.php",
      data: {"data": JSON.stringify(arr_obj[i])},
      success: function(){
        window.localStorage.clear();
        arr_obj = [];
        arr_key_name = [];
      }
    });
  }
}, 5000);
//To get the Alphabet Random Buttons and show them in the div allotted to them.
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

//Necessary Event:
//to carry on executing the necessary function on loading the window.
window.onload = function (e) {
  get_event_info(ob_Windows_OnLoad, e);
  store_event_info(ob_Windows_OnLoad, 'Windows OnLoad');
};
//to carry on executing the necessary function on Unloading the window.
window.onunload = function (e) {
  get_event_info(ob_Windows_OnunLoad, e);  
  store_event_info(ob_Windows_OnunLoad, 'Windows OnUnloadn');
};
//to carry on executing the necessary function on clicking on Generate Button.
in_btn.addEventListener('click', function(e) {
  if(div_empty.innerHTML === '')
    div_empty=true;
  else
    div_empty=false;

  get_event_info(ob_Generate_Button, e);
  store_event_info(ob_Generate_Button, 'Generate Button');
  //to clear the div if necessary.
  if (div_empty === false) {
    btn_div.innerHTML = '';
    img_div.innerHTML = '';
  }
  //Validation on the entered value on the textBox.
  if (in_txt.value >= 1 && in_txt.value <= 26)
    rand_char(in_txt.value);
  else if(in_txt.value > 26){
    alert("The number you entered is greater than 26.\n You must enter a number between 1 to 26.");
    in_txt.value= 26;
    rand_char(in_txt.value);
  }
  else 
    alert("You must enter a number between 1 to 26.");
});
//to carry on executing the necessary function on clicking on Alphabet Buttons.
btn_div.addEventListener('click', function (e) {
  if(e.target.innerHTML.length === 1)
  {
    get_event_info(ob_Alphabet_Button, e);
    store_event_info(ob_Alphabet_Button, `Alphabet Random Button (${e.target.innerHTML})`);
    //to get the image value and display the image in the div provided.
    img.setAttribute('src',`pic/${e.target.innerHTML}.jpg`);
    img_div.appendChild(img);
  }
});