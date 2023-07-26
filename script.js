//Selecting all the HTML Elements
const dateInput = document.querySelector('#datetime');
const numberOfMonths = document.querySelector('#monthselector');
const submitButton = document.querySelector('#submitbutton');
const timeContainer = document.querySelector('#timecontainer');
const daysContainer = document.querySelector('#displaydays');
const hoursContainer = document.querySelector('#displayhours');
const minutesContainer = document.querySelector('#displayminutes');
const secondsContainer = document.querySelector('#displayseconds');
const resetButton = document.querySelector('#reset');
let monthsValue;

//Array that will get data from Local storage
let endingDate = [];

//Function Declaration which gets localStorage Data and stores it in the above Array
function getFromLocalStorage() {
    let  endDateValue= localStorage.getItem('endDateValue');
    if (endDateValue) {
      endingDate = JSON.parse(endDateValue);
      console.log(endingDate);
   } else {
    console.log("There is no data")  }
   }

// Invoking the function
   getFromLocalStorage()


//Function declaration to add the data to localStorage
  function addToLocalStorage() {
    localStorage.setItem('endDateValue', JSON.stringify(endingDate));
  }

 
// A variable which has a setInterval function and creates a countdown after taking the data from localStorage
//This is used when a visitors has previously visited the website and comes back
 let countdownInterval = setInterval(function(){
    let endDateValue = localStorage.getItem('endDateValue');
    if (endDateValue){
    let finalDate =  new Date (endingDate[1]);
    finalDate.setMonth(finalDate.getMonth() + endingDate[0]);
    finalDate.setHours(finalDate.getHours() + 12);
    // finalDate.setMinutes(finalDate.getMinutes() + 1)
    finalDate = finalDate.getTime();
    let currentDate = new Date().getTime();
    let calculateDiff = finalDate - currentDate;
    let daysRemaining = Math.floor((calculateDiff / (1000*60*60*24)));
    let hoursRemaining = Math.floor((calculateDiff % (1000* 60 * 60 * 24) / (1000 *60 * 60)));
    let minutesRemaining = Math.floor((calculateDiff % (1000 * 60 * 60) /(1000 * 60)) );
    let secondsRemaining = Math.floor((calculateDiff % (1000 * 60) / 1000 ));
    daysContainer.textContent = `${daysRemaining} Days  `;
    hoursContainer.textContent = `  ${hoursRemaining} Hours`;
    minutesContainer.textContent= `  ${minutesRemaining} Minutes`;  
    secondsContainer.textContent = `  ${secondsRemaining} Seconds`;
    if (calculateDiff < 0){
        timeContainer.textContent ="Your staking period has ended, please go to the staking website and claim your tokens or restake!"
        clearInterval(countdownInterval)
    }
}}, 1000)  



//Function Declaration which calculates remaining time and saves it when a users adds the data first time. 
//It can also be used to override the previous data
function calculateTime(event){
   event.preventDefault()
   clearInterval(countdownInterval)
   let dateValue = parseInt(dateInput.value);
   monthsValue = parseInt(numberOfMonths.value);
   if ((monthsValue === 1 || monthsValue === 3 || monthsValue === 6 || monthsValue === 12) && dateValue > 0){
    // endingDate[0] = monthsValue;
    endingDate[0] = monthsValue;
        endingDate[1] = dateInput.value
        addToLocalStorage() 
        numberOfMonths.value = '' 
        showCountDown()
}  else {
    numberOfMonths.value  = ""
   timeContainer.textContent=  "Please select valid number for months (1, 3, 6 or 12) and a Valid Date";
    setTimeout( function(){
        location.reload()
    }, 3000)
}


}


//Actual Function which shows us countdown, it is being invoked in the above function
function showCountDown(){

    let countdownInterval = setInterval(function() { 
    if (monthsValue === 1 || monthsValue === 3 || monthsValue === 6 || monthsValue === 12){
    let initialDate = new Date ().getTime();
    let endDate =  new Date (dateInput.value);
    endDate.setMonth(endDate.getMonth() + monthsValue);
    endDate.setHours(endDate.getHours() + 12);
    // endDate.setMinutes(endDate.getMinutes() + 1)
    endDate = endDate.getTime();
    let targetDate = endDate - initialDate;  
    let daysRemaining = Math.floor((targetDate / (1000*60*60*24)));
    let hoursRemaining = Math.floor((targetDate % (1000* 60 * 60 * 24) / (1000 *60 * 60)));
    let minutesRemaining = Math.floor((targetDate % (1000 * 60 * 60) /(1000 * 60)) );
    let secondsRemaining = Math.floor((targetDate % (1000 * 60) / 1000 ));
    daysContainer.textContent = `${daysRemaining} Days`;
    hoursContainer.textContent = `  ${hoursRemaining} Hours  `;
    minutesContainer.textContent= `  ${minutesRemaining} Minutes  `;  
    secondsContainer.textContent = `  ${secondsRemaining} Seconds  `;
    if (targetDate < 0){
        timeContainer.textContent = "Your staking period has ended, please go to the staking website and claim your tokens or restake!"
        clearInterval(countdownInterval);
    }

} 
}, 1000);
}


//Event Listeners which show countdown when clicked after filling the data
submitButton.addEventListener('click', calculateTime);
resetButton.addEventListener('click', function(){    
    localStorage.removeItem('endDateValue');
    location.reload()
})