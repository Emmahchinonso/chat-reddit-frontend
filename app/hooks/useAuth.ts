"use client";
import React, { useEffect } from "react";
import { IS_CLIENT } from "../constants";
import { useFragment } from "../generate";
import { RegularUserFragmentDoc } from "../generate/graphql";
import { useMeQuery } from "../generate/hooks";
import { useRouter } from "next/navigation";
import { routes } from "../constants/routes";

const queryContext = {
  suspense: false,
};

const useCheckAuthState = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: !IS_CLIENT(),
  });
  const user = useFragment(RegularUserFragmentDoc, data?.me);
  const router = useRouter();

  useEffect(() => {
    console.log("result", fetching, user);
    if (!fetching && !user) {
      router.replace(routes.login);
    }
  }, [fetching, user]);
};

export default useCheckAuthState;
