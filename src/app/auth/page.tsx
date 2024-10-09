"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { styled } from "@mui/material";
import Button from "@/components/Button";
import { ModalUI } from "@/components/Modal";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Input } from "@mui/material";

import { Container } from "./components";

const CardArticle = styled("article")(() => ({
  padding: "2.4rem",
  background: "#FFF0DD",
  borderRadius: "2rem",
  maxWidth: "50rem",
  marginInline: "auto",
  marginTop: "10rem",
}));

const Auth = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  console.log(session, "sesion");

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
              <Button
                // onClick={() => setOpen((prev) => !prev)}
                onClick={() => signIn("github")}
                icon={<GitHubIcon />}
              >
                GitHub
              </Button>
              <button onClick={() => signOut()} />
            </div>
          </div>
        </CardArticle>
      </Container>
      <ModalUI isOpen={open} handleClose={() => setOpen((prev) => !prev)}>
        <h3 className="text-center text-[24px] font-semibold leading-[1.2] text-stone-950 max-md:mt-0 max-md:text-[3.2rem]">
          Name
        </h3>
        <div className="mt-4 text-center text-[1.6rem] tracking-wide text-stone-950 max-md:leading-[24px]">
          how you want us to call you?
        </div>
        <Input className="mt-8 w-full" />
        <div className="grid place-content-center">
          <button
            className="mx-auto mt-5 rounded-2xl bg-[#ff684b] px-20 py-2 text-3xl font-semibold text-white"
            type="button"
          >
            Next
          </button>
        </div>
      </ModalUI>
    </div>
  );
};

export default Auth;
