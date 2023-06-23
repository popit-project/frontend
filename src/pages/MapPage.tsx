// import './App.css'
// import MainPage from './components/MainPage'
import { useState } from "react"
import DynamicMap from "../components/Map/DynamicMap"
import MapScriptLoader from "../components/Map/MapScriptLoader"
import SearchLocation from "../components/Map/SearchLocation"
import { PlaceType } from "../components/Map/mapTypes"
import MapMarkUpController from "../components/Map/MapMarkUpController"
import Footer from "../components/Footer"
// import MainPage from "./components/MainPage"
// import MyProfilePage from "./components/MyProfilePage"

function MapPage() {
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState('')

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setPlaces([
            {
              id: "currentLocation",
              position: new kakao.maps.LatLng(lat, lng),
              title: "Current Location",
              address: "Current Address",
            },
          ]);
          
          setSelectedPlaceId("currentLocation");
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
  };

  return (
    <>
      {/* <MainPage /> */}
      {/* <MyProfilePage /> */}
      <MapScriptLoader>
        <DynamicMap>
        <MapMarkUpController
            places={places}
            selectedPlaceId={selectedPlaceId}
            onFindMyLocation={findMyLocation}
          />
          <SearchLocation
            onUpdatePlaces={(places) => setPlaces(places)}
            onSelect={(placeId) => setSelectedPlaceId(placeId)}
            onFindMyLocation={findMyLocation}
          />
        </DynamicMap>
      </MapScriptLoader> 
      {/* <Footer /> */}
    </>
  )
}

export default MapPage