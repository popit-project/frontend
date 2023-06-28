import { Link } from "react-router-dom";
import {
  CalendarICon,
  LocationICon,
  TimeICon,
} from "../../../assets/icons/Icons";

interface Popup {
  storeAddress: string;
  y: number;
  storeName: string;
  x: number;
  storePhone: string;
  openDate: string;
  openTime: string;
  closeTime: string;
  closeDate: string;
  storeType: string;
  id: 1;
  // 이 아래는 각각 api 알아봐야함. 즉, 없어지거나 수정예정
  likes: number;
  isLike: boolean;
  comments: number;
}

interface HomeProps {
  popup: Popup | null;
}

export default function Home({ popup }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5">
        <h2 className="text-2xl font-semibold mb-6">{popup?.storeName}</h2>
        <div className="flex item-center mb-3">
          <LocationICon width={30} height={30} fill="#818cf8" />
          <span className="ml-3">{popup?.storeAddress}</span>
        </div>
        <div className="flex items-center mb-3">
          <TimeICon width={30} height={30} fill="#818cf8" />
          <span className="ml-3">
            {popup?.openTime} ~ {popup?.closeTime}
          </span>
        </div>
        <div className="flex items-center">
          <CalendarICon width={30} height={30} fill="#818cf8" />
          <span className="ml-3">
            {popup?.openDate} ~ {popup?.closeDate}
          </span>
        </div>
        <Link to={"/sellerRegisPage"}>
          <div className="btn btn-outline w-full mt-8 focus:outline-none sm:w-auto border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400">
            정보 수정하기
          </div>
        </Link>
      </div>
    </div>
  );
}
