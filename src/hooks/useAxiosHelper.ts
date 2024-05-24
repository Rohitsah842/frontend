"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { loginContext } from "@/contexts/LoginContext";
import { get } from "lodash";
import api from "@/middleware/AxiosInterceptor";

export const useAxiosRequestHelper = <T>(
  config: AxiosRequestConfig<any>,
  isStartLoading: boolean = true,
  path?: string
) => {
  const cookies = new Cookies();
  const router = useRouter();
  const { dispatch } = useContext(loginContext);
  const [resData, setResData] = useState<any>({});
  const [errormessage, setErrorMessage] = useState<any>({});
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isStartLoading) {
      sendRequest();
    }
  }, [isStartLoading]);

  const sendRequest = async (data?: any) => {
    if (data !== null) config = { ...config, data: data };

    console.log(config);

    try {
      setIsLoading(true);
      setError(false);

      const response = await api(config);

      setIsLoading(false);
      console.log(response);

      if (
        response.headers.authorization !== undefined &&
        response.headers.refreshtoken !== undefined &&
        response.status === 200
      ) {
        console.log(" inside auth token");

        const decodeJwt = jwtDecode(response.headers.authorization);
        cookies.remove("Authorization");
        cookies.remove("RefreshToken");

        cookies.set("Authorization", response.headers.authorization, {
          expires: new Date(decodeJwt.exp! * 1000),
        });
        cookies.set("RefreshToken", response.headers.refreshtoken);
        dispatch({ type: "LOGIN", payload: true });
        cookies.remove("userdetails");
        console.log(cookies.get("userdetails"));
      }
      const xsrfToken = cookies.get("XSRF-TOKEN");
      sessionStorage.setItem("XSRF-TOKEN", xsrfToken);
      setResData(response);

      router.push(path!);
    } catch (error) {
      console.log(error);

      cookies.remove("userdetails");
      setIsLoading(false);
      setError(true);
      setErrorMessage(get(error, `response.data.message`));
    }
  };

  return [resData, error, errormessage, isLoading, sendRequest];
};
