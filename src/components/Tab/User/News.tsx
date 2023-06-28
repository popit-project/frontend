import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";
import { AddPhotoIcon } from "../../../assets/icons/Icons";

interface NewsItem {
  id: number;
  storeName: string;
  storeCity: string;
  time: string;
  title: string;
  image: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [nextId, setNextId] = useState(3);

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
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5">
        {news.length === 0 ? (
          <div className="text-center text-xl font-semibold">
            아직 소식이 없어요! 🥲
          </div>
        ) : (
          <div className="tab-list">
            {news.map((item) => (
              <div
                key={`${item.storeName}_${item.time}`}
                className="py-8 border-b border-slate-300 first:pt-0 last:border-none"
              >
                <div className="flex items-center mb-2">
                  <div className="text-left">
                    <p className="font-bold text-base">{item.storeName}</p>
                    <div className="text-slate-500">
                      <span>{item.storeCity}</span>
                      <span className="ml-1">•</span>
                      <span className="ml-1">{item.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-5">{item.title}</div>
                <div
                  className="bg-slate-500 w-f
                ull h-48"
                >
                  <img src="" alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
