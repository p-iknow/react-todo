import React from 'react';
import { IoMdRefresh } from 'react-icons/io';
import './Refetch.scss';

const Refetch = ({ refetch }) => {
  return (
    <div className="refetch-wrapper">
      <IoMdRefresh className="refetch" onClick={() => refetch()} />
      <span className="text">
        데이터 로딩중 에러가 발생했습니다. <br /> 위 버튼을 눌러 다시 데이터를
        요청하세요.
      </span>
    </div>
  );
};

export default Refetch;
