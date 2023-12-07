const urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=53.9024716&lon=27.5618225&appid=d184a227e22099fe9a84dabc31d03f28";
const urlPhoto = "https://api.unsplash.com/search/photos?query=mountain&client_id=qQoohPOcCxSmL85LuYWCpMJE4y8P0lropsaf8x4EUbo"
const urlCitata = "https://type.fit/api/quotes";

const main = document.querySelector('.main');

const background = document.createElement('img');
const buttonLeft = document.createElement('button');
const buttonRight = document.createElement('button');
const input = document.createElement('input');
const city = document.createElement('h1');
const weather = document.createElement('div');
const weatherDescription = document.createElement('h2');
const weatherPhoto = document.createElement('img');
const weatherMain = document.createElement('p');
const divCitata = document.createElement('div');
const citata = document.createElement('p');
const author = document.createElement('p');

buttonLeft.classList.add('main__buttonleft');
buttonRight.classList.add('main__buttonright');
background.classList.add('main__image');
input.classList.add('main__input');
city.classList.add('main__city');
weather.classList.add('main__weather');
weatherDescription.classList.add('main__weather-description');
weatherPhoto.classList.add('main__weather-photo');
weatherMain.classList.add('main__weather-temp');
divCitata.classList.add('main__divCitata');
citata.classList.add('main__divCitata-citata');
author.classList.add('main__divCitata-citata')

main.appendChild(buttonLeft);
main.appendChild(city);
main.appendChild(input);
main.appendChild(weather);
weather.appendChild(weatherPhoto);
weather.appendChild(weatherDescription);
weather.appendChild(weatherMain);
main.appendChild(divCitata);
divCitata.appendChild(citata);
divCitata.appendChild(author);
main.appendChild(background);
main.appendChild(buttonRight);

async function getPhoto() {
    const res = await fetch(urlPhoto);
    const data = await res.json();

    const resultPhoto = data.results;

    let allPhotoDownloads = [];
    let i = 0;
    let text = 'Enter your name'
    
    resultPhoto.forEach(element => {
      let photoLink = element.links;
      let photoDownlad = photoLink.download;
      allPhotoDownloads.push(photoDownlad)
    });

    buttonLeft.innerText = '<';
    buttonRight.innerText = '>';
    background.src = allPhotoDownloads[i];
    input.setAttribute('type', 'text');
    input.value = text;

    buttonRight.addEventListener('click', () =>{
      background.src = allPhotoDownloads[i++];
      if (i > 9){
        i = 0;
      };
    });

    buttonLeft.addEventListener('click', () =>{
      if (i === 0){
        i = 9;
      }else{
        i--
      }
      background.src = allPhotoDownloads[i];
    });

    input.addEventListener('focus', () => {
      if (input.value === text) {
          input.value = ''; 
      }
    });

    input.addEventListener('blur', () => {
    if (input.value === '') {
        input.value = text;
      }
    });

    input.addEventListener('keyup', (event) =>{
      if (event.key === 'Enter') {
        const name = input.value.trim();
        if (name !== '' && name !== 'Enter your name') {
          input.value = `Hello, ${name}!`;
          localStorage.setItem('userName', name);
        }else{
          localStorage.removeItem('userName')
        }
      };
    })

    window.addEventListener('load', () =>{
      const saveName = localStorage.getItem('userName');
      if(saveName){
        input.value = `Hello, ${saveName}!`;
      }
  });  
  };
  getPhoto();

async function getWeather() {
    const res = await fetch(urlWeather);
    const data = await res.json();

    const name = data.name;
    const weather = data.weather;
    const description = weather[0].main;
    const main = data.main;
    const temp = main.temp;
    const celsi = temp - 273.15;

    city.innerText = name;
    weatherDescription.innerText = description;
    weatherPhoto.src = './photo/pngwing.com.png';
    weatherMain.innerText = celsi.toFixed(2) + 'C';
  }
  getWeather();


  async function getCitata() {
    const res = await fetch(urlCitata);
    const data = await res.json();

    const array = data.splice(10, data.length);
    let i = 0;

    buttonLeft.addEventListener('click', () =>{
      if (i === 0){
        i = 9;
      }else{
        i--
      }
      citata.innerText = data[i].text;
      author.innerText = data[i].author;
    });

    buttonRight.addEventListener('click', () =>{
      citata.innerText = data[i++].text;
      author.innerText = data[i++].author;
      if (i > 9){
        i = 0;
      };
    });

    citata.innerText = data[i].text;
    author.innerText = data[i].author;
  }
  getCitata()
