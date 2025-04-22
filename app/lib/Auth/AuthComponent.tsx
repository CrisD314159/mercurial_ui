'use client'
import useSWR from "swr";
import { useEffect } from "react";
import { useMercurialStore } from "@/app/store/useMercurialStore";
import { checkIsloggedIn } from "./authChecks";



export default function AuthComponent() {
  const { data, error } = useSWR("checkAuth", checkIsloggedIn);
  const {setIsLoggedIn, setIsNotLoggedIn } = useMercurialStore();

  useEffect(() => {
    if (data) {
      setIsLoggedIn();
    }else{
      setIsNotLoggedIn()
    } 
  }, [data, error, setIsLoggedIn, setIsNotLoggedIn]);

  return <></>;
}