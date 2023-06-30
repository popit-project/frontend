import ReactDOM from 'react-dom';
import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { PlaceType } from "./mapTypes"
import { useMap } from "../hooks/useMap"
import { Link } from "react-router-dom";

interface MapMarkerProps {
  place: PlaceType
  index: number
  showInfo?: boolean
}

// 마커 이미지 url, 스프라이트 이미지를 씁니다
const MARKER_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'

const MapMarker = (props:MapMarkerProps) => {
  const map = useMap()
  const container = useRef(document.createElement('div'))

  const infowindow = useMemo(() => {
    container.current.style.position = 'absolute'
    container.current.style.bottom = '40px'

    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: container.current,
      // map: map
    })
  }, [])

  const marker = useMemo(() => {
    const imageSize = new kakao.maps.Size(36, 37) // 마커 이미지의 크기
    const imgOptions =  {
      spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin : new kakao.maps.Point(0, (props.index * 46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    }
    const markerImage = new kakao.maps.MarkerImage(MARKER_IMAGE_URL, imageSize, imgOptions)
    const marker = new kakao.maps.Marker({
      map: map,
      position: props.place.position,
      image: markerImage 
    })

    kakao.maps.event.addListener(marker, 'click', function() {
      map.setCenter(props.place.position)
      map.setLevel(6, {
        animate: true
      })
      infowindow.setMap(map)
    })

    // marker.setMap(map)
    return marker
  }, [])

  useLayoutEffect(() => {
    marker.setMap(map) // 지도 위에 마커 표시하기

    return () => {
      marker.setMap(null)
    }
  }, [map])

  useEffect(() => {
    if(props.showInfo) {
      infowindow.setMap(map)
      return
    }

    return () => {
      infowindow.setMap(null)
    }
    
  }, [props.showInfo])

  return (
    container.current ? 
      ReactDOM.createPortal(
        <div
          className='flex flex-col items-center justify-center -ml-24 rounded-2xl bg-slate-50 bg-opacity-90'
          style={{ minHeight: '190px', minWidth: '200px' }}
          onClick={() => {
            infowindow.setMap(null);
          }}
        >
          <Link to={`/popuplist/${props.place.id}`}>
          <div
            className='text-s w-[200px] mb-2 p-2 bg-indigo-400 rounded-t-2xl flex justify-center text-slate-50'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            스토어 바로가기 &gt;
          </div>
          </Link>


          <div className='w-28 h-28 bg-slate-400'>
            이미지 박스
          </div>
          <label className='font-bold py-1.5 px-2'>{props.place.title}</label>
          <span className='text-xs pt-0 px-1.5 pb-1.5'>{props.place.address}</span>
        </div>
       , container.current) : null
  )
}



export default MapMarker