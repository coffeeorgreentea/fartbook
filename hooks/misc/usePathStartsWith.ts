import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function usePathStartsWith(path: string) {
  const router = useRouter();
  const [currentPathStartsWith, setCurrentPathStartsWith] = useState(false);

  useEffect(() => {
    setCurrentPathStartsWith(router.asPath.startsWith(path));
  }, [router.asPath, path]);

  return currentPathStartsWith;
}
