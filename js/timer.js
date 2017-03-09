//function definition to start timer
var startTimer = function() {
  //initialization of variables
    var $clock = document.getElementsByClassName('clock')[0]
    var $secHand = document.getElementsByClassName('secHand')[0]
    var $timer = document.getElementById('timer')
    var hh = document.getElementById('hour').value
    var mm = document.getElementById('min').value
    var ss = document.getElementById('sec').value
    var elems = document.getElementsByClassName('inputFields')[0]
    //calculating time in seconds
    var $hour = hh * 60 * 60
    var $min = mm * 60
    var $sec = ss
    var $time = Number($hour) + Number($min) + Number($sec)
    var date = new Date($time * 1000)
    this.disabled = true;
    //toggling between output div and div containing input elements
    if (elems.style.visibility !== 'hidden') {
        elems.style.visibility = 'hidden';
    } else {
        elems.style.display = 'block';
    }
    //Function to be called recursively to display time lapse
    var result = date.toISOString().substr(11, 8);
    var i = window.setInterval(func, 1000);
    function func() {
        console.log(result);
        $timer.innerHTML = result;
        $time--;
        date = new Date($time * 1000);
        result = date.toISOString().substr(11, 8);
        $secHand.classList.add("rotateHand");
        if ($time < 0) {
            var audio = new Audio('http://mobiles-media.com/ringtones/mp3/sound-effects/1337518059_tring_tring.mp3');
            $timer.innerHTML = "00:00:00";
            audio.play();
            window.clearInterval(i);
            $clock.classList.add("clockBuzz");
            $secHand.classList.remove("rotateHand");
        }
    }

};
//reset function definition
var resetClock = function() {

    document.getElementById('setTimer').reset();
    document.getElementById('timer').innerHTML = "00:00:00"

}
//function call to start timer
var begin = document.getElementById('start');
begin.addEventListener('click', startTimer);
//function call to reset timer
var reset = document.getElementById('restart');
reset.addEventListener('click', resetClock)

//Funcion to handle invalid user input
var c = document.getElementsByClassName('common')
for (i = 0; i < c.length; i++) {
    c[i].oninput = function() {
        if (this.value < 0) this.value = 0;
        if (document.getElementById('hour').value > 8) {
            alert("We encourage you to work for less than 8 hours, C'mon! you deserve a break.")
            this.value = 7;
            document.getElementById('min').value = 59;
            document.getElementById('sec').value = 59;
        }
        if (this.value.length > 2)
            this.value = this.value.slice(0, 2);
    }
}
