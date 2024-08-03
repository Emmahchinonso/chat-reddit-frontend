"use client";
import Posts from "./components/Posts";
import Wrapper from "./components/Wrapper";

export default async function Home() {
  return (
    <Wrapper>
      <main>
        <Posts />
      </main>
    </Wrapper>
  );
}
