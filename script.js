let dateInput = document.querySelector('#datetime');
let numberOfMonths = document.querySelector('#monthselector');
let submitButton = document.querySelector('#submitbutton');
let timeContainer = document.querySelector('#displaydays');
let hoursContainer = document.querySelector('#displayhours');
let minutesContainer = document.querySelector('#displayminutes');
let secondsContainer = document.querySelector('#displayseconds');
let resetButton = document.querySelector('#reset');
let monthsValue;


let endingDate = [];
function getFromLocalStorage() {
    let  endDateValue= localStorage.getItem('endDateValue');
    if (endDateValue) {
      endingDate = JSON.parse(endDateValue);
      console.log(endingDate);
   } else {
    console.log("There is no data")  }
   }


  function addToLocalStorage() {
    localStorage.setItem('endDateValue', JSON.stringify(endingDate));
  }

  getFromLocalStorage()

 let countdownInterval = setInterval(function(){
    let endDateValue = localStorage.getItem('endDateValue');
    if (endDateValue){
    let finalDate =  new Date (endingDate[1]);
    finalDate.setMonth(finalDate.getMonth() + endingDate[0]);
    finalDate.setHours(finalDate.getHours() + 12);
    finalDate = finalDate.getTime();
    let currentDate = new Date().getTime();
    let calculateDiff = finalDate - currentDate
    let daysRemaining = Math.floor((calculateDiff / (1000*60*60*24)));
    let hoursRemaining = Math.floor((calculateDiff % (1000* 60 * 60 * 24) / (1000 *60 * 60)));
    let minutesRemaining = Math.floor((calculateDiff % (1000 * 60 * 60) /(1000 * 60)) );
    let secondsRemaining = Math.floor((calculateDiff % (1000 * 60) / 1000 ));
    timeContainer.innerHTML = daysRemaining + " Days ";
    hoursContainer.innerHTML = ` ${hoursRemaining}   Hours `;
    minutesContainer.innerHTML=  minutesRemaining + " Minutes ";  
    secondsContainer.innerHTML = secondsRemaining + " Seconds";
    if (calculateDiff < 0){
        timeContainer.innerHTML = "Your staking period has ended, please go to the staking website and claim your tokens or restake!"
        clearInterval(countdownInterval)
    }
}}


, 1000)  


function calculateTime(event){
   event.preventDefault()
   clearInterval(countdownInterval)
   let dateValue = parseInt(dateInput.value);
   monthsValue = parseInt(numberOfMonths.value);    
   if ((monthsValue === 1 || monthsValue === 3 || monthsValue === 6 || monthsValue === 12) && dateValue > 0){
        endingDate[0] = monthsValue;
        endingDate[1] = dateInput.value
        addToLocalStorage() 
        numberOfMonths.value = '' 
        showCountDown()


}  else {
    numberOfMonths.value  = ""
    timeContainer.innerHTML = "Please select valid number for months (1, 3, 6 or 12) and a Valid Date"

}


}

function showCountDown(){

    let countdownInterval = setInterval(function() { 
    if (monthsValue === 1 || monthsValue === 3 || monthsValue === 6 || monthsValue === 12){
    let initialDate = new Date ().getTime();
    let endDate =  new Date (dateInput.value);
    endDate.setMonth(endDate.getMonth() + monthsValue);
    endDate.setHours(endDate.getHours() + 12);
    endDate = endDate.getTime();
    let targetDate = endDate - initialDate;  
     let daysRemaining = Math.floor((targetDate / (1000*60*60*24)));
    let hoursRemaining = Math.floor((targetDate % (1000* 60 * 60 * 24) / (1000 *60 * 60)));
    let minutesRemaining = Math.floor((targetDate % (1000 * 60 * 60) /(1000 * 60)) );
    let secondsRemaining = Math.floor((targetDate % (1000 * 60) / 1000 ));
    timeContainer.innerHTML = daysRemaining + " Days " + hoursRemaining + " Hours " + minutesRemaining + " Minutes " + secondsRemaining + " Seconds "
    if (targetDate < 0){
        timeContainer.innerHTML = "Your staking period has ended, please go to the staking website and claim your tokens or restake!"
        clearInterval(countdownInterval)
    }

} 
}, 1000);
}


submitButton.addEventListener('click', calculateTime);
resetButton.addEventListener('click', function(){    
    localStorage.removeItem('endDateValue');
    location.reload()
})