let dateInput = document.querySelector('#datetime');
let numberOfMonths = document.querySelector('#monthselector');
let submitButton = document.querySelector('#submitbutton');
let timeContainer = document.querySelector('#displaydays');
let hoursContainer = document.querySelector('#displayhours');
let minutesContainer = document.querySelector('#displayminutes');
let secondsContainer = document.querySelector('#displayseconds');




function calculateTime(e){
   e.preventDefault()
   let monthsValue;
   monthsValue = parseInt(numberOfMonths.value);
   let dateValue = parseInt(dateInput.value);
    if ((monthsValue === 1 || monthsValue === 3 || monthsValue === 6 || monthsValue === 12) && dateValue > 0){
        console.log("Please wait, the countdown can take upto 1 minute to appear");
         showCountDown()

}  else {
    console.log("Can't set timer, please make sure you have selected the date field as well as correct number of months");

}


}

function showCountDown(){
    let countdownInterval = setInterval(function() { 
    let initialDate = new Date ().getTime();
    let monthsValue =  parseInt(numberOfMonths.value);
    let endDate =  new Date (dateInput.value);
    endDate.setMonth(endDate.getMonth() + monthsValue);
    endDate.setHours(endDate.getHours() + 12);
    endDate = endDate.getTime();
    let targetDate = endDate - initialDate;  
     let daysRemaining = Math.floor((targetDate / (1000*60*60*24)));
    let hoursRemaining = Math.floor((targetDate % (1000* 60 * 60 * 24) / (1000 *60 * 60)));
    let minutesRemaining = Math.floor((targetDate % (1000 * 60 * 60) /(1000 * 60)) );
    let secondsRemaining = Math.floor((targetDate % (1000 * 60) / 1000 ));
    timeContainer.innerHTML = daysRemaining + " Days";
    hoursContainer.innerHTML = hoursRemaining + " Hours"
    minutesContainer.innerHTML = minutesRemaining + " Minutes"
    secondsContainer.innerHTML = secondsRemaining + " Seconds"
}, 1000);
}

submitButton.addEventListener('click', calculateTime);
