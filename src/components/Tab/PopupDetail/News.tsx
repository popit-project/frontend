import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";
import { AddPhotoIcon } from "../../../assets/icons/Icons";

interface news {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
}

export default function News() {
  const [news, setNews] = useState<news[]>([]);
  useEffect(() => {
    axiosInstance
      .get("/news")
      .then((response) => {
        const data = response.data;
        setNews(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="m-10 bg-indigo-50 rounded-lg text-left p-5">
      <div className="mb-16">
        <form className="flex flex-col items-center sm:flex-row">
          <input
            type="text"
            placeholder="스토어 소식을 등록해주세요"
            className="h-12 p-2 rounded-lg w-full focus:outline-none sm:grow"
            // value={newReview}
            // onChange={(e) => setNewReview(e.target.value)}
          ></input>
          <button
            type="submit"
            className="group btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:fill-white hover:border-indigo-400"
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleReviewSubmit();
            // }}
          >
            <span className="group hover:fill-white fill-indigo-600">
              <AddPhotoIcon
                width={30}
                height={30}
                fill={"group-hover:fill-white"}
              />
            </span>
          </button>
          <button
            type="submit"
            className="btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400"
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleReviewSubmit();
            // }}
          >
            등록
          </button>
        </form>
      </div>
      {news.length === 0 ? (
        <div className="text-center text-xl font-semibold">
          아직 소식이 없어요! 🥲
        </div>
      ) : (
        <div className="tab-list">
          {news.map((item) => (
            <div
              key={item.id}
              className="py-8 border-b border-slate-300 first:pt-0 last:border-none"
            >
              <div className="flex items-center mb-2">
                <div className="text-left">
                  <p className="font-bold text-base">{item.name}</p>
                  <div className="text-slate-500">
                    <span>{item.location}</span>
                    <span className="ml-1">•</span>
                    <span className="ml-1">{item.date}</span>
                  </div>
                </div>
              </div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
