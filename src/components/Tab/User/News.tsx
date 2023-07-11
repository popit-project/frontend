import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

interface NewsProps {
  storeName: string;
}

interface NewsItem {
  city: string;
  content: string;
  timeAgo: string;
  id: number;
  newsImgURL: string;
  storeName: string;
}

export default function News({ storeName }: NewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`https://pop-it.store/api/${storeName}/news`)
      .then((response) => {
        const data = response.data.data;
        setNews(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storeName]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5 m-5">
        {news.length === 0 ? (
          <div className="text-center text-xl font-semibold">
            아직 소식이 없어요! 🥲
          </div>
        ) : (
          <div className="tab-list">
            {[...news].reverse().map((item) => (
              <div
                key={item.id}
                className="py-8 border-b border-slate-300 first:pt-0 last:border-none"
              >
                <div className="flex items-center mb-2">
                  <div className="text-left">
                    <p className="font-bold text-base">{item.storeName}</p>
                    <div className="text-slate-500">
                      <span>{item.city}</span>
                      <span className="ml-1">•</span>
                      <span className="ml-1">{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div>{item.content}</div>
                {item.newsImgURL && (
                  <div className="w-full overflow-hidden mt-5">
                    <img src={item.newsImgURL} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
