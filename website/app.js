/* showing the current date under the title with interval each second */
setInterval(showTime, 1000);
/* function to show time */
function showTime() {
  // Create a new date instance dynamically with JS
  let d = new Date();

  /* time format variables*/
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  /* converting Hour format to AM and PM */
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

  /* a new div created in HTML to with ID #date to hold the current time  */
  let showDate = document.querySelector("#current-date");
  let newDate =
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " " +
    strTime;
  /* applying time to the DOM  */
  showDate.innerHTML = newDate;
  return newDate;
}
showTime();

/* --------------------- */

/* catching the user feelings data */
let userFeeling = document.querySelector("#feelings");
/* geeting the button ID that generates the data*/
let btnGenerate = document.getElementById("generate");
//object will be sent to server
let sentData = {};

/* event listener on click */
btnGenerate.addEventListener("click", () => {
  /* getting zip code from user and trim its value from any spaces accidentally typed*/
  let zipCode = document.getElementById("zip").value.trim();
  /* getting zip code from user */
  let countryCode = document
    .getElementById("contry-code")
    .value.toUpperCase()
    .trim();
  /* getting the data form API */
  //API key sent
  const apiKey = "e3a9fab5ed252880267d1287105fdf46&units=metric";
  //API URL
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`;

  //using fetch method to get the temp and city name from API
  fetch(apiURL)
    // converting to JSON format
    .then((response) => response.json())
    .then((allData) => {
      //getting city name from API
      let cityName = allData.name;
      // converting the temp from Kelvin to Celsius
      let currentTemp = `${allData.main.temp.toFixed(2)} Celsius`;

      //saving data to the object will be sent
      sentData = {
        date: showTime(),
        city: cityName,
        temp: currentTemp,
        content: userFeeling.value,
      };

      //posting data to server
      fetch("postData", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        //data will be saved in JSON format
        body: JSON.stringify(sentData),
      }).then(
        //getting data that posted to the sarver
        fetch("getData")
          .then((response) => response.json())
          //.then((finalResponse) => finalResponse.json())
          .then((finalData) => {
            //getting city name from API
            let cityName = finalData.city;
            let currentTemp = `${finalData.temp}`;
            // collecting the data for post it in server
            let date = document.querySelector("#date");
            let city = document.querySelector("#city");
            let temp = document.querySelector("#temp");
            let content = document.querySelector("#content");

            // applying data to DOM
            date.innerHTML = `<span>Time: </span> ${showTime()}`;
            city.innerHTML = `<span>City Name: </span> ${cityName}`;
            temp.innerHTML = `<span>Temperature: </span> ${currentTemp}`;
            //define the content from the user to save it to the object
            if (userFeeling.value == "") {
              content.innerHTML = `<span>Feeling: </span> "you didn't enter your feelings!!"`;
            } else {
              content.innerHTML = `<span>Feeling: </span> ${userFeeling.value}`;
            }
          })
      );
    })
    // error apeared when user enderes a wrong zip Code
    .catch(() => {
      window.alert(
        "Sorry, Data you requested are not found in the server or wrong data entered in Zip code / Country code field!!"
      );
    });
});
