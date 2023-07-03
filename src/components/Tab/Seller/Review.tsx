import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

interface Review {
  id: number;
  email: string;
  location: string;
  date: string;
  comment: string;
}

interface ReviewProps {
  storeId: number | null;
}

//api변수 storeid
export default function Review({ storeId }: ReviewProps) {
  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`http://3.34.149.107:8082/api/review/read/${storeId}/comment`)
      .then((response) => {
        const data = response.data;
        setReviewList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storeId]);

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
