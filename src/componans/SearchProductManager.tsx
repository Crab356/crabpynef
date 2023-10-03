import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

function SearchProductManager({
  setSearchName,
  setSearchCategory,
  valueSelect1,
  valueSelect2,
  cate,
}: {
  cate: string;
  valueSelect1: string;
  setSearchName: (val: string) => void;
  setSearchCategory: (val: string) => void;
  valueSelect2: string;
}) {
  const nameRef = useRef(null);
  const cateRef = useRef(null);

  function searchClick() {
    const name = nameRef.current?.value;
    const category = cateRef.current?.value;
    setSearchName(name);
    setSearchCategory(category);
  }

  return (
    <>
      <div className="search__manager">
        <input type="text" placeholder="Search" ref={nameRef} />
        <button className="btn-manager" onClick={searchClick}>
          Search
        </button>
        <div style={{ margin: "20px 0 0" }}>
          <b>{cate}:</b>
          <InputCheck name="category" id="category" ref={cateRef}>
            <option value="">None</option>
            <option value={valueSelect1}>{valueSelect1}</option>
            <option value={valueSelect2}>{valueSelect2}</option>
          </InputCheck>
        </div>
      </div>
    </>
  );
}

export default SearchProductManager;

const InputCheck = styled.select`
  width: 150px;
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 20px;
`;
const SpanCheck = styled.span`
  display: inline-block;
  margin-left: 20px;
`;
