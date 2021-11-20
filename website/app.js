/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); <==== no need for that now that toDateSTring is here

//base URL - yeah baby
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

//API with metric units to grab the celsius value
const apikey = ',&appid=9e10ea9d28836b9e44c2e12294db38e4&units=metric';

// Event listener
document.getElementById('generate').addEventListener('click', action);

/* Function called upon event happening */
function action(e) {
    e.preventDefault();
    // get user input
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
  
    getWeather(baseURL, newZip, apikey)
      .then(function (userData) {
        // post the data
        postData('/postData', { date: newDate, temp: Math.round(userData.main.temp), content })
      }).then(function (newData) {
        // call updateUI to update browser values
        updateUI()
      })
  }

  /* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, key) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + newZip + apikey);
    try {
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }

  /* POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log("error", error);
    }
  };
  
  
  const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const allData = await request.json()
      // update new entry values
      document.getElementById('date').innerHTML = `Today is: ${allData.date}`;
      document.getElementById('temp').innerHTML = `The Temperature is ${allData.temp}` + '&degC';
      document.getElementById('content').innerHTML = `You are feeling especially ${allData.content} today!`;
    }
    catch (error) {
      console.log("error", error);
    }
  };