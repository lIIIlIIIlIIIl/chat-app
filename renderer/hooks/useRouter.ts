import { useRouter } from "next/router";

export const useRouteTo = () => {
  const router = useRouter();

  return {
    currentPath: window.location.pathname,
    routeTo: (path: string) => router.push(path),
    routeback: () => router.back(),
  };
};
