import type { ApiResponse } from "@/utils/Interface";
import { useState, useEffect, useCallback } from "react";

export function useAxios<TData>(
  serviceFn: (...args: any[]) => Promise<ApiResponse<TData>>,
  args: any[] = [],
  deps: any[] = []
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceFn(...args);

      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || "Unknown error");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [serviceFn, ...args, ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
