import React from "react";
import {
  CalendarICon,
  LocationICon,
  TimeICon,
} from "../../../assets/icons/Icons";

interface Popup {
  id: number;
  name: string;
  address: string;
  period: string;
  comments: number;
  isLike: boolean;
  likes: number;
}

interface HomeProps {
  popup: Popup | null;
}

export default function Home({ popup }: HomeProps) {
  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      <h2 className="text-2xl font-semibold mb-6">{popup?.name}</h2>
      <div className="flex item-center mb-3">
        <LocationICon width={30} height={30} fill="gray" />
        <span className="ml-3">{popup?.address}</span>
      </div>
      <div className="flex items-center mb-3">
        <TimeICon width={30} height={30} fill="gray" />
        <span className="ml-3">오전 11:00~오후 9:00</span>
      </div>
      <div className="flex items-center">
        <CalendarICon width={30} height={30} fill="gray" />
        <span className="ml-3">{popup?.period}</span>
      </div>
    </div>
  );
}
