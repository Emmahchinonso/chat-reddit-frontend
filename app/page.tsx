"use client";
import { Suspense } from "react";
import Posts from "./components/Posts";
import Wrapper from "./components/Wrapper";

export default async function Home() {
  return (
    <Wrapper>
      <main>
        <Suspense>
          <Posts />
        </Suspense>
      </main>
    </Wrapper>
  );
}
