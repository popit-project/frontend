import { FormEvent, useEffect, useRef, useState } from "react"
import { useMap } from "../hooks/useMap"
import { PlaceType } from "./mapTypes"
import { axiosInstance } from "../../components/AxiosInstance/AxiosConfig";
import axios from "axios";
import { BiCurrentLocation } from 'react-icons/Bi';

interface SearchLocationProps {
  onUpdatePlaces: (places:PlaceType[]) => void
  onSelect: (placeId:string) => void
  onFindMyLocation: () => void
}

interface Popup {
  id: number;
  storeName: string;
  storeAddress: string;
  x: number;
  y: number;
}

// const sampleObjects = [{
//   storeAddress: "서울 관악구 신림동 408-10",
//   y: 37.4767123984012,
//   storeName: "뉴플리",
//   x: 126.935674694601,
//   storePhone: null,
//   openDate: null,
//   openTime: null,
//   closeTime: null,
//   closeDate: null,
//   storeType: "FLEA_MARKET",
//   id: 3,
// },
// {
//   storeAddress: "경기 광명시 디지털로 63",
//   y: 37.4746749593818,
//   storeName: "플리마켓",
//   x: 126.871609303422,
//   storePhone: null,
//   openDate: null,
//   openTime: null,
//   closeTime: null,
//   closeDate: null,
//   storeType: "FLEA_MARKET",
//   id: 4
// }
// ];

const SearchLocation = (props:SearchLocationProps) => {
  const map = useMap()
  const [keyword, setKeyword] = useState('')
  const [places, setPlaces] = useState<PlaceType[]>([])
  const placeService = useRef<kakao.maps.services.Places | null>(null)

  const [mapData, setMapData] = useState<Popup[]>([]);

  const fetchPopups = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/map");
      setMapData(data);
    } catch (error) {
      console.error("Error fetching popups:", error);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/map")
      .then((response) => {
        const data = response.data;
        setMapData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

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
        const placeInfos = mapData.map(data => {
          if (data.storeName.includes(keyword)) {
            return {
              id: data.id,
              position: new kakao.maps.LatLng(Number(data.y), Number(data.x)),
              title: data.storeName,
              address: data.storeAddress
            };
          }else {
            return null; // Return null if storeName doesn't match the keyword
          }
        }).filter(Boolean); // Filter out null values
  
        if (placeInfos.length === 0) {
          alert('검색 결과가 존재하지 않습니다.');
          return;
        }
  
        props.onUpdatePlaces(placeInfos);
        setPlaces(placeInfos);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
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
    <div className="absolute z-10 bg-white opacity-80 overflow-y-auto h-[200px] md:h-[550px] top-[415px] md:top-[65px] w-full md:w-[310px]">
      <form className="flex sticky top-0" onSubmit={handleSubmit}>
      <div className="form-control w-screen md:w-full">
        <div className="input-group w-full">
          <input type="text" placeholder="검색하세요!" className="min-w-[200px] w-full p-2 border border-solid border-slate-200 focus:outline-indigo-400" value={keyword} onChange={(e) => {
                setKeyword(e.target.value)
              }} />
          <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
        {/* <input className="min-w-[200px] w-full p-2 border border-solid border-slate-400 md:w-28 lg:w-52" value={keyword} onChange={(e) => {
          setKeyword(e.target.value)
        }} /> */}
      <button
        type="button"
        onClick={handleFindMyLocation}
        className="bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-bold py-1 px-2 rounded"
      >
        <BiCurrentLocation size={28}/>
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