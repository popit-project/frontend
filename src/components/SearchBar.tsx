import React, { useState, useEffect, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
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

  useEffect(() => {
    axiosInstance
      .get<PopupItem[]>("http://3.34.149.107:8082/api/store/searchAll")
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
    <div className="flex justify-center mt-5 mb-1 relative">
      <form onSubmit={handleSearch} className="flex">
        <button type="submit" className="items-center justify-center flex m-2">
          <FiSearch size={28} color="#a5b4fc" />
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
