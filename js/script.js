window.addEventListener('load', () => {
    let long, lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector(".temperature");
    const tempSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/cb64e50c3cef6160dc291587241661a9/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        temperature, summary, icon
                    } = data.currently;
                    //set DOM elements from the API
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    // set icons
                    setIcons(icon, document.querySelector(".icon"));

                    //change temp to celsuus/farenheit
                    tempSection.addEventListener('click', () => {
                        if (tempSpan.textContent === "F") {
                            tempSpan.textContent = "C";
                            tempDegree.textContent = Math.floor(celsius);
                        } else {
                            tempSpan.textContent = "F";
                            tempDegree.textContent = temperature;
                        }
                    });
                });
        });
    } else {
        h1.textContent = "enable your location";
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

    // check if browser supports geolaction
    // function browserSupport(){
    //     if(geolocation in navigator){
    //         navigator.geolocation.getCurrentPosition()
    //     }
    // }
});
