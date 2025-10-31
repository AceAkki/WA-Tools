
export class Utility {
    // async method to fetch API that returns the json data
    async fetchAPI(apiurl){
    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    // shows Toast Message using toastify lib
    showToast(message) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#075e54",
              color:"#dcf8c6",
              borderRadius:"16px" 
            },
            onClick: function(){} // Callback after click
          }).showToast()
    }

    async getCountry(){
      let [latitude, longitude] = this.getLocation();
      /* 
      api-0 - https://nominatim.openstreetmap.org/reverse?lat=52.2296756&lon=21.0122287&.json
      api-1 - https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837
      */
      let locData = await this.fetchAPI(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
      return locData.countryCode;
    }

    getLocation(){
      navigator.geolocation.getCurrentPosition(position => {
        return [position.coords.latitude, position.coords.longitude]
      })
    }
}