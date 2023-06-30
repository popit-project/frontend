import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

interface review {
  id: number;
  email: string;
  location: string;
  date: string;
  comment: string;
}

//api변수 storeid
export default function Review() {
  const [reviewList, setReviewList] = useState<review[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/reviews?_sort=id&_order=desc")
      .then((response) => {
        const data = response.data;
        setReviewList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5 m-5">
        {reviewList.length === 0 ? (
          <div className="text-center text-xl font-semibold leading-8">
            <p>아직 가게 후기가 없어요! 🥲</p>
          </div>
        ) : (
          <div className="tab-list first:pt-0">
            {reviewList.map((review) => (
              <div
                key={review.id}
                className="py-8 border-b border-indigo-200 first:pt-0 last:border-none"
              >
                <div className="flex items-center mb-2">
                  <div className="text-left">
                    <p className="font-bold text-base">{review.email}</p>
                    <div className="text-slate-500">
                      <span>{review.location}</span>
                      <span className="ml-1">•</span>
                      <span className="ml-1">{review.date}</span>
                    </div>
                  </div>
                </div>
                <div>{review.comment}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
