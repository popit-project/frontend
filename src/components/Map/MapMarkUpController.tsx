import { useEffect } from "react"
import { useMap } from "../hooks/useMap"
import MapMarker from "./MapMarker"
import { PlaceType } from "./mapTypes"

interface MapMarkUpControllerProps {
  places: PlaceType[];
  selectedPlaceId: string;
  onFindMyLocation: () => void;
}

const MapMarkUpController = (props: MapMarkUpControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (props.places.length < 1) {
      return;
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    props.places.forEach((place) => {
      bounds.extend(place.position);
    });

    map.setBounds(bounds);
  }, [props.places, map]);

  // const handleFindMyLocation = () => {
  //   props.onFindMyLocation();
  // };

  return (
    <>
      {props.places.map((place, index) => (
        <MapMarker
          key={place.id}
          place={place}
          index={index}
          showInfo={props.selectedPlaceId === place.id}
        />
      ))}
      {/* <button type="button" onClick={handleFindMyLocation}>
        내 위치 찾기
      </button> */}
    </>
  );
};

export default MapMarkUpController