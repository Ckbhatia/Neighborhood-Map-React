const foursquare_Api = `https://api.foursquare.com/v2/venues/explore?visit=places&near=jaipur&client_id=ZGHPEJVLV3MDALTJVNB2MOFFC1TWT5MXDPTFQTTCEIKOHD1S&client_secret=XQJFWPIW1Y5CRUZZ3N2NY4LTHXQVR31WFLX24RAWNDDHLR3Z&v=20181122`;

export const getLocationDetails = () => 
    fetch(foursquare_Api)
        .then(response => response.json())
        .then(result => result.response.groups[0].items)
        .catch(err => alert(`Foursquare Api faild to load! Error: ${err}`));

export const initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 26.91962, lng: 75.78781},//jaipur coordinates
            zoom: 14
        });
        window.map = map; // making map window object rather than passing this an prop
    }
export const createScript = () => {
        const mapScript = document.createElement("script");
        const API = "AIzaSyBtsirN68OAeo4fv8o0iEOZ5dJlEAHLUxA";
        mapScript.src= `https://maps.googleapis.com/maps/api/js?key=${API}&callback=initMap`;
        mapScript.async = true;
        mapScript.defer = true;
        mapScript.onerror = function () {
         alert('Google maps faild to load, Error!');
        };
        return mapScript;
    }    
export const loadScript = () => {
        let scriptElement = createScript();
        let scriptOfPage = document.getElementsByTagName("script");
        let firstScript = scriptOfPage[0];
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
        window.initMap = initMap;//make initMap function for window object
    } //loadScript fetch the data From foursquare_Api & Google Map Api and this is call on App.js Line no 10
