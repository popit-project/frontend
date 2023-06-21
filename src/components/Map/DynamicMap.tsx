import { ReactNode, useEffect, useRef, useState } from "react"
import { KakaoMapContext } from "../../hooks/useMap"

interface DynamicMapProps {
  children: ReactNode
}

const DynamicMap = (props:DynamicMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>()
  const kakaoMapRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <div className="absolute right-0 left-0 top-0 bottom-0">
        <div className="static w-full h-full" ref={kakaoMapRef}/>
      </div>
      {
        map ? (
          <KakaoMapContext.Provider value={map}>
            { props.children }
          </KakaoMapContext.Provider>
        ) : (
          <div>
              지도 정보를 가져오는데 실패하였습니다.
          </div>
        )
      }
    </>
  )
}

export default DynamicMap