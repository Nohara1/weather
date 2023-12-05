const urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=53.9024716&lon=27.5618225&appid=d184a227e22099fe9a84dabc31d03f28";
const urlPhoto = "https://api.unsplash.com/search/photos?query=mountain&client_id=qQoohPOcCxSmL85LuYWCpMJE4y8P0lropsaf8x4EUbo"

const main = document.querySelector('.main');


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

    const background = document.createElement('img');
    const buttonLeft = document.createElement('button');
    const buttonRight = document.createElement('button');
    const input = document.createElement('input');


    buttonLeft.classList.add('main__buttonleft');
    buttonRight.classList.add('main__buttonright');
    background.classList.add('main__image');
    input.classList.add('main__input');

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
  })

    main.appendChild(buttonLeft);
    main.appendChild(input);
    main.appendChild(background);
    main.appendChild(buttonRight);
    
  }
  getPhoto();



async function getWeather() {
    const res = await fetch(urlWeather);
    const data = await res.json();

    const name = data.name;

    console.log(name);
    console.log(data);
  }
  getWeather();


