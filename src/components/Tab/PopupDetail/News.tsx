import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

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
                <figure className="w-16 h-16 rounded-full bg-gray-400">
                  <img src="" alt="" />
                </figure>
                <div className="ml-3 text-left">
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
