import { useEffect, useState } from "react";
import Nav from "../components/Nav";

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
            <div className="flex justify-center items-center mt-[3rem]">
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
            <div className="ReivewCreate">
                <form >
                    <textarea className="border-2" cols={40} rows={5}>

                    </textarea>
                </form>
            </div>
            
        </>
    );
}