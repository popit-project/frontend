import { createContext, useContext } from "react";

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null)

//Map 객체를 가져오는 훅 만들기
export const useMap = () => {
  const kakaoMap = useContext(KakaoMapContext)

  if(!kakaoMap) {
    throw new Error('kakoMap not found')
  }

  return kakaoMap
}