import { useEffect } from "react"
import { useMap } from "../../hooks/useMap"
import MapMarker from "./MapMarker"
import { PlaceType } from "./mapTypes"

interface MapMarkUpControllerProps {
  places:PlaceType[]
  selectedPlaceId: string
  onFindMyLocation: () => void 
}

const MapMarkUpController = (props:MapMarkUpControllerProps) => {
  const map = useMap()

  useEffect(() => {
    if(props.places.length < 1) {
      return
    }

    const bounds = new window.kakao.maps.LatLngBounds()
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가함
    props.places.forEach(place => {
      bounds.extend(place.position)
    })

    map.setBounds(bounds)
  }, [props.places])

  const handleFindMyLocation = () => {
    props.onFindMyLocation()
  }

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
      <button type="button" onClick={handleFindMyLocation}>
        내 위치 찾기
      </button>
    </>
  )
}

export default MapMarkUpController