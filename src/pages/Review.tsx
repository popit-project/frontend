import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import google from '../icon/google.256x256.png'

//리뷰작성 완료하면 그 내용 + 기존에 있던 리뷰들을 선택한 팝업스토어 ID를 통해 서버에서 가져와서 렌더링하도록 구현 (캐러셀 형태)

export default function Review() {

    const [storeList, setStoreList] = useState<string[]>([]);
    const [picked, setPicked] = useState<string>("");
    
    useEffect(() => {
        setStoreList(["item1", "item2", "item3", "item4"]);
    },[])

    const handleClick = (state :string) => {
        setPicked(state);
    }

    return (
        <>
            <Nav></Nav>
            <div className="flex w-screen justify-center items-center mt-[3rem] mb-[3rem]">
                <div className="dropdown mr-[2rem]">
                    <label
                        tabIndex={0}
                        className="btn m-1 bg-green-500 hover:bg-green-300"
                    >
                        팝업 스토어 선택
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {storeList.map((data) => (
                            <li onClick={() => handleClick(data)}>
                                <div>{data}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="font-bold text-2xl">{picked}</div>
            </div>
            <div className="ReivewCreate w-screen">
                <form>
                    <textarea className="border-2 resize-none w-[40rem] h-[20rem] max-sm:w-[15rem] max-sm:h-[10rem]"></textarea>
                    <div className="flex justify-end mt-[2rem]">
                        <button
                            type="button"
                            className="btn btn-success mr-[2rem]"
                        >
                            리뷰 작성 완료
                        </button>
                    </div>
                </form>
            </div>
            <div className="ReviewList w-screen">
                <div className="carousel w-[8rem] h-[8rem]">
                    <div id="item1" className="carousel-item w-[8rem] h-[8rem]">
                        <img src={google} className="w-full" />
                    </div>
                    <div id="item2" className="carousel-item w-[8rem] h-[8rem]">
                        <img src={google} className="w-full" />
                    </div>
                    <div id="item3" className="carousel-item w-[8rem] h-[8rem]">
                        <img src={google} className="w-full" />
                    </div>
                    <div id="item4" className="carousel-item w-[8rem] h-[8rem]">
                        <img src={google} className="w-full" />
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