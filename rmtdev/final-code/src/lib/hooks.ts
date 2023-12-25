import { RefObject, useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "./constants";
import { handleError } from "./utils";
import { JobItem, JobItemExpanded, JobItemId } from "./types";

// ------------------------------

export function useOnClickOutside(
  // refs can be a single ref or an array of refs
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        // if clicked outside of the ref elements
        Array.isArray(refs)
          ? refs.every(
              (refItem) => !refItem.current?.contains(e.target as Node)
            )
          : !refs.current?.contains(e.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, callback]);
}

// ------------------------------

export function useActiveId() {
  const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveJobItemId(id);
    };
    handleHashChange(); // for initial page load

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeJobItemId;
}

// ------------------------------

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

// ------------------------------

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    // 4xx or 5xx response
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  return await response.json();
};

export function useSearchQuery(searchText: string) {
  const { data, isLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      enabled: Boolean(searchText),
      staleTime: 1000 * 20,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );

  return [data?.jobItems || [], isLoading] as const;
}

// ------------------------------

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    // 4xx or 5xx response
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  return await response.json();
};

export function useJobItems(ids: JobItemId[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const atLeastOneLoading = results.some((result) => result.isLoading);
  const jobItems = results
    .map((result) => result.data?.jobItem)
    // .filter(Boolean);
    // .filter((jobItem) => jobItem !== undefined);
    // .filter((jobItem) => !!jobItem);
    .filter((jobItem) => jobItem !== undefined) as JobItemExpanded[];
  return { jobItems, isLoading: atLeastOneLoading } as const;
}

export function useJobItem(id: JobItemId | null) {
  const { data, isLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : undefined),
    // () => {
    //   if (id) {
    //     return fetchJobItem(id);
    //   }
    // },
    {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  return [data?.jobItem, isLoading] as const;
}
