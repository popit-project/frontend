import { useEffect, useState } from "react";
import Nav from "../components/LoginNav";
import google from '../icon/google.256x256.png';
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

//리뷰작성 완료하면 그 내용 + 기존에 있던 리뷰들을 선택한 팝업스토어 ID를 통해 서버에서 가져와서 렌더링하도록 구현 (캐러셀 형태)

interface Review{
    id: number;
    name: string;
    text: string;
}

export default function Review() {

    const [storeList, setStoreList] = useState<Review[]>([]);
    const [picked, setPicked] = useState<string>("");       

    //jsonserver id설정안해두면 500error 근데 id설정하니 오류 안나고 잘 들어감!
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                //처음 get하면 가게이름 쭉 받아옴.
                const response = await axiosInstance.get(
                    "http://localhost:3001/review"
                );
                setStoreList(response.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();        
        console.log(storeList)
    },[])

    const handleClick = (state :Review) => {
        setPicked(state.name);
        // name을 POST 보내면 거기에 대한 Review만 쭉 내려주면 받아서 사용.
        

    }

    const sendReivew = async () => {
        //리뷰 보내기 
        try {
            
            // const response = await axiosInstance.post(
            //     "http://localhost:3001/review",{userId: , reviewText: , brandName: ,}
            // );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <>
            <Nav></Nav>
            <div className="flex w-screen justify-center items-center mt-[3rem] mb-[3rem]">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn m-1 bg-green-500 hover:bg-green-300 mx-auto"
                    >
                        팝업 스토어 선택
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {storeList.map((data) => (
                            <li onClick={() => handleClick(data)}>
                                <div className="ml-[3rme]">{data.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="font-bold text-2xl">{picked}</div>
            </div>
            <div className="ReivewCreate w-screen">
                <form>
                    <div className="flex justify-center mx-auto">
                        <textarea className="border-2 resize-none w-[40rem] h-[20rem] max-sm:w-[15rem] max-sm:h-[10rem]"></textarea>
                    </div>
                    <div className="flex justify-center w-screen mt-[2rem]">
                        <button
                            type="button"
                            className="btn bg-green-500 hover:bg-green-300 mb-[3rem]"
                            onClick={sendReivew}
                        >
                            리뷰 작성 완료
                        </button>
                    </div>
                </form>
            </div>
            <div className="ReviewList w-screen">
                <div className="flex justify-center w-screen mb-[2rem]">
                    <div className="carousel w-[8rem] h-[8rem]">
                        <div
                            id="item1"
                            className="carousel-item w-[8rem] h-[8rem]"
                        >
                            <img src={google} className="w-full" />
                        </div>
                        <div
                            id="item2"
                            className="carousel-item w-[8rem] h-[8rem]"
                        >
                            <img src={google} className="w-full" />
                        </div>
                        <div
                            id="item3"
                            className="carousel-item w-[8rem] h-[8rem]"
                        >
                            <img src={google} className="w-full" />
                        </div>
                        <div
                            id="item4"
                            className="carousel-item w-[8rem] h-[8rem]"
                        >
                            <img src={google} className="w-full" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full py-2 gap-2">
                    <a href="#item1" className="btn btn-xs">
                        1
                    </a>
                    <a href="#item2" className="btn btn-xs">
                        2
                    </a>
                    <a href="#item3" className="btn btn-xs">
                        3
                    </a>
                    <a href="#item4" className="btn btn-xs">
                        4
                    </a>
                </div>
            </div>
        </>
    );
}