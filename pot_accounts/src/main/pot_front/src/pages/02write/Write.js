import React from "react";
import Paginations from "./components/Pagination";

const Write = () => {
    return (
        <div>
            <div> 
                {/* 내역보기 드롭메뉴 */}
                <div>
                    <p>전체 내역보기</p>
                    <p>|</p>
                    <p>카테 고리내역보기</p>
                </div>
                {/* 내역 추가하기 */}
                <button>
                    + 내역 추가하기
                </button>
            </div>

            <div>
                <ul>
                    <li>분류</li>
                    <li>분류</li>
                    <li>분류</li>
                    <li>분류</li>
                </ul>
            </div>

            <Paginations/>
        </div>
    )
}

export default Write