import React, { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "./AxiosInstance/AxiosConfig";

interface PopupItem {
  id: number;
  storeName: string;
  storeAddress: string;
}

const SearchBar = () => {
  const { document } = window;
  const location = useLocation();
  const navigate = useNavigate();
  const searchKeyword = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState<PopupItem[]>([]);
  const [popupList, setPopupList] = useState<PopupItem[]>([]);
  console.log(searchResults)

  useEffect(() => {
    axiosInstance
      .get<PopupItem[]>("https://pop-it.store/api/store/searchAll")
      .then((response) => {
        const data = response.data;
        setPopupList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const results = popupList.filter((popup) =>
      popup.storeName.includes(searchKeyword ?? "")
    );
    setSearchResults(results);
  }, [searchKeyword, popupList]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = document.querySelector<HTMLInputElement>(
      'input[name="searchInput"]'
    );
    const searchKeyword = searchInput?.value;
    navigate(`/popuplist?q=${searchKeyword}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchKeyword = event.target.value;
    if (newSearchKeyword === "") {
      setSearchResults([]);
    } else {
      const results = popupList.filter((popup) =>
        popup.storeName.includes(newSearchKeyword)
      );
      setSearchResults(results);
    }
  };

  return (
    <div className="flex justify-center mt-5 mb-1 relative -z-1">
      <form onSubmit={handleSearch} className="flex">
        <button type="submit" className="items-center justify-center flex m-2">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.2498 34.4823L26.8098 25.0423C29.0783 22.3189 30.2095 18.8258 29.9681 15.2897C29.7267 11.7535 28.1313 8.44652 25.5138 6.05667C22.8963 3.66683 19.4582 2.37812 15.9147 2.45864C12.3712 2.53915 8.99522 3.98269 6.48895 6.48895C3.98269 8.99522 2.53915 12.3712 2.45864 15.9147C2.37812 19.4582 3.66683 22.8963 6.05667 25.5138C8.44652 28.1313 11.7535 29.7267 15.2897 29.9681C18.8258 30.2095 22.3189 29.0783 25.0423 26.8098L34.4823 36.2498L36.2498 34.4823ZM4.99978 16.2498C4.99978 14.0247 5.65958 11.8497 6.89575 9.99961C8.13191 8.14956 9.88892 6.70762 11.9446 5.85613C14.0003 5.00465 16.2623 4.78186 18.4445 5.21594C20.6268 5.65003 22.6314 6.72149 24.2047 8.29483C25.7781 9.86817 26.8495 11.8727 27.2836 14.055C27.7177 16.2373 27.4949 18.4993 26.6434 20.555C25.7919 22.6106 24.35 24.3676 22.4999 25.6038C20.6499 26.84 18.4748 27.4998 16.2498 27.4998C13.2671 27.4965 10.4075 26.3101 8.29848 24.2011C6.18941 22.092 5.00309 19.2324 4.99978 16.2498Z" fill="#a5b4fc" />
          </svg>
        </button>

        <input
          type="text"
          name="searchInput"
          placeholder="스토어나 동네를 검색하세요"
          defaultValue={searchKeyword !== null ? searchKeyword : ""}
          className="px-4 py-2 w-64 md:w-80 lg:w-96 rounded-full border border-gray-300 focus:rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
