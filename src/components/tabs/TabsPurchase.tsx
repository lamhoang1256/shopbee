import { path } from "constants/path";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledTabsPurchase = styled.ul`
  a.active {
    border-bottom: 2px solid #ff424e;
  }
`;

const TabsPurchase = () => {
  return (
    <StyledTabsPurchase className='flex bg-white text-redff4'>
      <li>
        <NavLink to={path.purchase} className='block w-40 py-4 text-center border-text-redff4'>
          Tất cả
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${path.purchase}?status=1`}
          className='block w-40 py-4 text-center border-text-redff4'
        >
          Đang xác nhận
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${path.purchase}?status=4`}
          className='block w-40 py-4 text-center border-text-redff4'
        >
          Đã giao
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${path.purchase}?status=5`}
          className='block w-40 py-4 text-center border-text-redff4'
        >
          Đã hủy
        </NavLink>
      </li>
    </StyledTabsPurchase>
  );
};

export default TabsPurchase;
