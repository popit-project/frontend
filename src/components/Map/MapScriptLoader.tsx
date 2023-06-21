import { ReactNode, useEffect, useState } from "react"

const MAP_SCRIPT_ID = 'map-script'
const MAP_APP_KEY = import.meta.env.VITE_MAP_APP_KEY

interface MapScriptLoaderProps {
  children: ReactNode
}

const MapScriptLoader = (props:MapScriptLoaderProps) => {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false)

  useEffect(() => {
    const mapScipt = document.getElementById(MAP_SCRIPT_ID)

    if(mapScipt && !window.kakao) {
      return
    }

    const script = document.createElement('script')
    script.id = MAP_SCRIPT_ID
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${MAP_APP_KEY}&libraries=services&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true)
      })
    }
    script.onerror = () => {
      setMapScriptLoaded(false)
    }

    document.getElementById('root')?.appendChild(script)
  }, [])

  return (
    <>
    {
      mapScriptLoaded ? props.children : (
        <div>
          지도를 가져오는 중 입니다
        </div>
      )
    }
    </>
  )
}

export default MapScriptLoader