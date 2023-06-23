import { FormEvent, useEffect, useRef, useState } from "react"
import { useMap } from "../hooks/useMap"
import { PlaceType } from "./mapTypes"

interface SearchLocationProps {
  onUpdatePlaces: (places:PlaceType[]) => void
  onSelect: (placeId:string) => void
  onFindMyLocation: () => void
}

const SearchLocation = (props:SearchLocationProps) => {
  const map = useMap()
  const [keyword, setKeyword] = useState('')
  const [places, setPlaces] = useState<PlaceType[]>([])
  const placeService = useRef<kakao.maps.services.Places | null>(null)

  useEffect(() => {
    if(placeService.current) {
      return
    }

    placeService.current = new kakao.maps.services.Places()
  }, [])

  const searchPlaces = (keyword:string) => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return;
    }

    if(!placeService.current) {
      alert('placeService 에러')
      return
    }

    placeService.current.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // console.log(data)

        const placeInfos = data.map(placeSearchResultItem => {
          return {
            id: placeSearchResultItem.id,
            position: new kakao.maps.LatLng(Number(placeSearchResultItem.y), Number(placeSearchResultItem.x)),
            title: placeSearchResultItem.place_name,
            address: placeSearchResultItem.address_name
          }
        })

        props.onUpdatePlaces(placeInfos)
        setPlaces(placeInfos)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

          alert('검색 결과가 존재하지 않습니다.');
          return;

      } else if (status === kakao.maps.services.Status.ERROR) {

          alert('검색 결과 중 오류가 발생했습니다.');
          return;

      }
    })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchPlaces(keyword)
  }

  const handleItemClick = (place:PlaceType) => {
    map.setCenter(place.position)
    map.setLevel(4)
    props.onSelect(place.id)
  }

  const handleFindMyLocation = () => {
    props.onFindMyLocation()
  } 

  return (
    <div className="absolute z-10 bg-white opacity-80 overflow-y-auto" style={{ height: '550px', top: '70px' }}>
      <form className="flex sticky top-0" onSubmit={handleSubmit}>
        <input className="min-w-[200px] w-full p-2 border border-solid border-slate-400" value={keyword} onChange={(e) => {
          setKeyword(e.target.value)
        }} />
      <button
        type="button"
        onClick={handleFindMyLocation}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded"
      >
        내 위치 찾기
      </button>
      </form>
      <ul className="list-none m-0 p-0">
        {
          places.map((item, index) => {
            return(
              <li 
              key={item.id} 
              className="flex flex-col p-2 border-b border-dashed border-slate-300 cursor-pointer hover:bg-slate-300 hover:opacity-100 transition-none duration-0"
              onClick={() => handleItemClick(item)}
              >
                <label>{`${index+1}. ${item.title}`}</label>
                <span>{item.address}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default SearchLocation