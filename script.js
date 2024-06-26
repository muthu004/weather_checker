const search = document.querySelector(".button");
const container = document.querySelector(".container");
const main = document.querySelector(".main");
const content = document.querySelector(".content");

const description = document.querySelector(".description");
const image = document.querySelector(".icon");

search.addEventListener("click", fetchWeather);

container.textContent = "";
const api = "57de625892f83fe4bec4143bafbf28d7";
async function fetchWeather() {
  try {
    container.textContent = "";
    const cityName = document.querySelector(".input-search").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${api}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (cityName === "") {
      const error = document.createElement("p");
      error.textContent = "Pls enter city";
      container.appendChild(error);
    } else if (data.cod !== "200") {
      const error = document.createElement("p");
      error.textContent = "Enter valid city";
      container.appendChild(error);
    } else {
      const div = document.createElement("div");
      div.classList.add("container");
      const headingOne = document.createElement("h3");
      headingOne.textContent = data.list[0].weather[0].main;
      const heading = document.createElement("h4");
      heading.textContent = (data.list[0].main.temp - 273.5).toFixed(1) + "°C";
      const description = document.createElement("p");
      description.textContent = data.list[0].weather[0].description;

      const id = data.list[0].weather[0].id;

      const img = document.createElement("img");

      img.src = getWeatherPicture(id);
      div.appendChild(img);
      div.appendChild(headingOne);
      div.appendChild(heading);
      div.appendChild(description);
      container.appendChild(div);
    }

    function getWeatherPicture(weatherId) {
      switch (true) {
        case weatherId >= 200 && weatherId < 300:
          return `./assets/thunder.png`;
        case weatherId >= 300 && weatherId < 400:
          return `./assets/drizzle.png`;
        case weatherId >= 500 && weatherId < 600:
          return "./assets/rainy-day.png";
        case weatherId >= 600 && weatherId < 700:
          return `./assets/snow.png`;
        case weatherId >= 700 && weatherId < 800:
          return `./assets/fog.png`;
        case weatherId === 800:
          return `./assets/sun.png`;
        case weatherId >= 801 && weatherId < 810:
          return `./assets/cloudy.png`;

        default:
          return "not defined";
      }
    }
  } catch (error) {
    console.error("Error in fetching", error);
    return [];
  }
}
