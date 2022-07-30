import { path } from "constants/path";
import { Link } from "react-router-dom";
import styled from "styled-components";
import classNames from "utils/className";

const StyledPurchaseTabs = styled.ul`
  a.active {
    border-bottom: 2px solid #ff424e;
    color: #ff424e;
  }
`;

interface PurchaseTabsProps {
  handleActive: (value: number) => boolean;
}

const PurchaseTabs = ({ handleActive }: PurchaseTabsProps) => {
  return (
    <StyledPurchaseTabs className='flex bg-white'>
      <li>
        <Link
          to={path.purchase}
          className={classNames(
            "block w-40 py-4 text-center transition-all duration-75",
            handleActive(0) ? "active" : "",
          )}
        >
          Tất cả
        </Link>
      </li>
      <li>
        <Link
          to={`${path.purchase}?status=1`}
          className={classNames(
            "block w-40 py-4 text-center transition-all duration-75",
            handleActive(1) ? "active" : "",
          )}
        >
          Đang xác nhận
        </Link>
      </li>
      <li>
        <Link
          to={`${path.purchase}?status=4`}
          className={classNames(
            "block w-40 py-4 text-center transition-all duration-75",
            handleActive(4) ? "active" : "",
          )}
        >
          Đã giao
        </Link>
      </li>
      <li>
        <Link
          to={`${path.purchase}?status=5`}
          className={classNames(
            "block w-40 py-4 text-center transition-all duration-75",
            handleActive(5) ? "active" : "",
          )}
        >
          Đã hủy
        </Link>
      </li>
    </StyledPurchaseTabs>
  );
};

export default PurchaseTabs;
