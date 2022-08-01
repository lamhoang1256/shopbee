import { Link } from "react-router-dom";
import classNames from "utils/className";

interface TabsProps {
  query: string | number;
  tabs: {
    to: string;
    key: number;
    display: string;
  }[];
}

const Tabs = ({ tabs, query }: TabsProps) => {
  return (
    <ul className='flex overflow-auto bg-white'>
      {tabs.map((tab) => {
        const tabStyles = "block w-40 py-4 text-center transition-all duration-75";
        const tabActiveStyles = "border-b-2 border-b-[#ff424e] text-[#ff424e]";
        const checkActive = (value: number) => Number(value) === Number(query);
        return (
          <li key={tab.key}>
            <Link
              to={tab.to}
              className={classNames(
                tabStyles,
                checkActive(tab.key) ? tabActiveStyles : "text-[#555]",
              )}
            >
              {tab.display}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
