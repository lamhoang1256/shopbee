import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  return { queryParams, searchParams, setSearchParams };
}
