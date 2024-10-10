"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { styled } from "@mui/material";
import Button from "@/components/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Container } from "./components";

import { withOutAuth } from "@/components/HOC/withOutAuth";

const CardArticle = styled("article")(() => ({
  padding: "2.4rem",
  background: "#FFF0DD",
  borderRadius: "2rem",
  maxWidth: "50rem",
  marginInline: "auto",
  marginTop: "10rem",
}));

const Auth = () => {
  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <Container url={"/images/career-bg.svg"}>
        <CardArticle>
          <div className="py-10">
            <h1 className="text-center text-[36px] font-semibold leading-[1.2] text-stone-950 max-md:mt-0 max-md:text-[3.2rem]">
              Authenticate
            </h1>
            <div className="mt-4 text-center text-[1.6rem] tracking-wide text-stone-950 max-md:leading-[24px]">
              Login with Github!
            </div>
            <div className="mt-6 grid place-content-center">
              <Button onClick={() => signIn("github")} icon={<GitHubIcon />}>
                GitHub
              </Button>
            </div>
          </div>
        </CardArticle>
      </Container>
    </div>
  );
};

export default withOutAuth(Auth);
