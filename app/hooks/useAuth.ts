"use client";
import { useEffect } from "react";
import { useFragment } from "../generate";
import { RegularUserFragmentDoc } from "../generate/graphql";
import { useMeQuery } from "../generate/hooks";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../constants/routes";

const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, data?.me);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`${routes.login}?next=${pathName}`);
    }
  }, [loading, user]);
};

export default useIsAuth;
