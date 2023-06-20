import React from "react";
import { CalendarICon, LocationICon, TimeICon } from "../../assets/icons/Icons";

export default function Home() {
  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      <h2 className="text-2xl font-semibold mb-6">부엉이돈까스학동역점</h2>
      <div className="flex item-center mb-3">
        <LocationICon width={30} height={30} fill="gray" />
        <span className="ml-3">서울특별시 강남구 지상 학동로 165</span>
      </div>
      <div className="flex items-center mb-3">
        <TimeICon width={30} height={30} fill="gray" />
        <span className="ml-3">오전 11:00~오후 9:00</span>
      </div>
      <div className="flex items-center">
        <CalendarICon width={30} height={30} fill="gray" />
        <span className="ml-3">2023.06.01 ~ 2023.06.31</span>
      </div>
    </div>
  );
}
