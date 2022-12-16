import { IconStar } from "components/Icons";

interface SelectStarProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const SelectStar = ({ rating, setRating }: SelectStarProps) => {
  const handleSelectRating = (num: number) => {
    setRating(() => num);
  };
  return (
    <div className="flex justify-center mt-2">
      {[1, 2, 3, 4, 5].map((num) => {
        const color = num <= rating ? "text-[#ffce3d]" : "text-[#e3e3e3]";
        return (
          <button
            key={num}
            type="button"
            onClick={() => handleSelectRating(num)}
            onMouseEnter={() => handleSelectRating(num)}
          >
            <IconStar className={`w-7 h-7 ${color}`} />
          </button>
        );
      })}
    </div>
  );
};

export default SelectStar;
