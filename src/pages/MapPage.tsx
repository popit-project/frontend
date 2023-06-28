// import './App.css'
// import MainPage from './components/MainPage'
import { useState } from "react"
import DynamicMap from "../components/Map/DynamicMap"
import MapScriptLoader from "../components/Map/MapScriptLoader"
import SearchLocation from "../components/Map/SearchLocation"
import { PlaceType } from "../components/Map/mapTypes"
import MapMarkUpController from "../components/Map/MapMarkUpController"
import axios from "axios"
import { useRecoilState } from 'recoil';
import { latState, lngState } from '../recoilAtom/mapAtom';

interface Store {
  id: number;
  x: number;
  y: number;
  storeName: string;
  storeAddress: string;
}


function MapPage() {
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState('')
  // const [lat, setLat] = useState<number | null>(null);
  // const [lng, setLng] = useState<number | null>(null);
  const [recoilLat, setRecoilLat] = useRecoilState(latState);
  const [recoilLng, setRecoilLng] = useRecoilState(lngState);

  const findMyLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('내 위치:', lat, lng);
          setRecoilLat(lat);
          setRecoilLng(lng);
          
          try {
            const response = await axios.get(`http://3.34.149.107:8082/api/store/searchAll/5km?userLat=${lat}&userLon=${lng}`);
            const storesWithin5km = response.data;
  
            if (storesWithin5km.length > 0) {
              const updatedPlaces = storesWithin5km.map((store:Store) => ({
                id: store.id,
                position: new kakao.maps.LatLng(store.y, store.x),
                title: store.storeName,
                address: store.storeAddress,
              }));
    
              setPlaces(updatedPlaces);
              setSelectedPlaceId(storesWithin5km[0].id);
            } else {
              // 데이터가 없을 때 알림창 표시
              alert("아직 내 주변 팝업스토어가 없어요🥲");
            }
          } catch (error) {
            console.error('데이터를 가져오는 중에 오류가 발생했습니다.', error);
          }
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
    </>
  )
}

export default MapPage