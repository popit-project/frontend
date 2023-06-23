import { ReactNode, useEffect, useRef, useState } from "react"
import { KakaoMapContext } from "../hooks/useMap"
import NavBar from "../MainNav"
import Footer from "../Footer"

interface DynamicMapProps {
  children: ReactNode
}

const DynamicMap = (props:DynamicMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>()
  const kakaoMapRef = useRef<HTMLDivElement>(null)
  const [myLocationMarker, setMyLocationMarker] = useState<kakao.maps.Marker | null>(null)

  useEffect(() => {
    if(!kakaoMapRef.current) {
      return
    }

    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667)
    const options = {
      center: targetPoint,
      level: 3
    }

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, options))
  }, [])

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          const myLocation = new kakao.maps.LatLng(lat, lng);
  
          if (myLocationMarker) {
            myLocationMarker.setPosition(myLocation);
          } else {
            const marker = new kakao.maps.Marker({
              position: myLocation
            });
            marker.setMap(map || null); // map이 유효하지 않을 경우 null을 전달합니다.
            setMyLocationMarker(marker);
          }
  
          map?.panTo(myLocation); // map이 유효할 경우에만 panTo 메서드를 호출합니다.
        },
        (error) => {
          console.error("내 위치를 가져올 수 없습니다.", error);
        }
      );
    } else {
      console.error("브라우저가 Geolocation API를 지원하지 않습니다.");
    }
  };
  

  useEffect(() => {
    findMyLocation()
  }, [])

  return (
    <>
    <div className="max-w-screen-lg my-0 mx-auto">
      <NavBar />
      <div className="right-0 left-0 top-0 bottom-0">
        <div className="max-w-screen-lg" ref={kakaoMapRef} style={{ height: '550px' }} />
      </div>
      {map ? (
        <KakaoMapContext.Provider value={map}>
          {props.children}
        </KakaoMapContext.Provider>
      ) : (
        <div>
          지도 정보를 가져오는데 실패하였습니다.
        </div>
      )}
      <Footer />
        </div>
    </>
  )
}

export default DynamicMap