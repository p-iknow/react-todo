import React from 'react';
import './Refetch.scss';
import { IoMdRefresh } from 'react-icons/io';
import { useRefetch } from '../../TodoContext';

const Refetch = () => {
  const refetch = useRefetch();
  const onRefetch = () => {
    refetch();
  };

  return (
    <div className="refetch-wrapper">
      <IoMdRefresh className="refetch" onClick={onRefetch} />
      <span className="text">
        데이터 로딩중 에러가 발생했습니다. <br /> 위 버튼을 눌러 다시 데이터를
        요청하세요.
      </span>
    </div>
  );
};

export default Refetch;
