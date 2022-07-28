//ipify key
const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_BE1VA61VaUOnRXFHSG6mNFIKnK06K&ipAddress=`;

// form elements
const entered_ip = document.getElementById("ip_address");
const search_btn = document.getElementById("search_btn");

// elements to update
let ip = document.getElementById("ip");
let address = document.getElementById("address");
let time_zone = document.getElementById("time_zone");
let isp = document.getElementById("isp");

const headers_option = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const map = L.map("display-map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

updateMarker = (update_marker = [-33.665, 18.993]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

getIPDetails = (ip_address) => {
  axios
    .get(`${url}${ip_address}`)
    .then((response) => {
      //   console.log(response.data.location);
      ip.innerHTML = response.data.ip;
      address.innerHTML = `${response.data.location.city} ${response.data.location.country} ${response.data.location.postalCode}`;
      time_zone.innerHTML = response.data.location.timezone;
      isp.innerHTML = response.data.isp;

      // update map marker
      updateMarker([response.data.location.lat, response.data.location.lng]);
    })
    .catch((error) => {
      console.error(error);
      if (error.code === "ERR_NETWORK") {
        alert("Please disable your ad-blocker and try again");
      } else {
        alert("Network error occured, Please try again later!");
      }
    });
};

document.addEventListener("load", updateMarker());

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (entered_ip.value != "" && entered_ip.value != null) {
    getIPDetails(entered_ip.value);
    return;
  }
  alert("Please enter a valid IP address");
});

function initialValue(ip) {
  getIPDetails(ip);
}
