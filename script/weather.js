        var weather = document.querySelector('.weather');
        var advweather =document.querySelector('.advweather');
        var moreweather = document.querySelector('#moreweather');

        moreweather.addEventListener('click', ()=> {
        var sign = moreweather.classList;
        console.log(sign);
        if(sign.contains('rotate')){

            advweather.style.display = 'none';
         
          sign.remove('rotate');
          weather.classList.remove('background');
        }
        else{
           advweather.style.display = 'inline-block';
          // sign.remove('fa-chevron-up');
          sign.add('rotate');
          weather.classList.add('background');

        }

        });
        


        function checkWeather() {
            var city = localStorage.city;
            document.getElementById('ccity').textContent = `(current: ${localStorage.city})`
            var xmlhttp = new XMLHttpRequest();
            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=9f514757e0798046b85d900b2b2d3534";
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var myArr = JSON.parse(this.responseText);
                    temp = Math.round(myArr.main.temp);
                    cityw = myArr.name;
                    desc = myArr.weather[0].main;
                    adesc = myArr.weather[0].description;
                    tempmin = myArr.main.temp_min;
                    tempmax = myArr.main.temp_max;
                    humidity = myArr.main.humidity;
                    pressure = myArr.main.pressure;
                    country = myArr.sys.country;
                    windspeed = myArr.wind.speed;
                    icon = myArr.cod;
                    var iconUrl = "http://openweathermap.org/img/w/" + myArr.weather[0].icon + ".png";
                    // Show weather
                    document.getElementById('temp').textContent =    temp + '°C';
                    document.getElementById('city').textContent = `in ${cityw}.`;
                     document.getElementById('desc').textContent = desc + ' (' + adesc +') ';
                    document.getElementById('icon').innerHTML = ` <i class="owf owf-${icon} ml2 owf-5x"></i>`
                     document.getElementById('hum').innerHTML = `Humidity: ${humidity}% <br> Pressure: ${pressure}hPa <br> Wind speed: ${windspeed}m/s`;
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

        }
checkWeather();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function checkTime() {
  var date = new Date();
  var sufix = '';
  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);
  var day = date.getDate();
  var month = monthNames[date.getMonth()];
  var weekday = dayNames[date.getDay()];
  if (day > 3 && day < 21) sufix = 'th';
  switch (day % 10) {
    case 1:
      sufix = "st";
    case 2:
      sufix = "nd";
    case 3:
      sufix = "rd";
    default:
      sufix = "th";
  }
  document.getElementById('time').innerHTML = "  It's <span class='hour'>" + hours + ":" + minutes + "</span><br/><span class='date'>" + month + ' ' + day + sufix + ', ' + weekday + '.';
}

setInterval(checkTime, 3000);