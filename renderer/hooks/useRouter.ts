import { useRouter } from "next/router";

export const useRouteTo = () => {
  const router = useRouter();

  return {
    routeTo: (path: string) => router.push(path),
    routeback: () => router.back(),
    routeQuery: router.query,
  };
};
