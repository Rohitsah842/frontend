"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { loginContext } from "@/contexts/LoginContext";

export const useAxiosRequestHelper = <T>(
  config: AxiosRequestConfig<any>,
  isStartLoading: boolean = true,
  path?: string
) => {
  let headers = {};
  let customer: any = null;
  const cookies = new Cookies();
  const router = useRouter();
  const { dispatch } = useContext(loginContext);

  let xsrf = cookies.get("XSRF-TOKEN");
  if (xsrf) {
    headers = { ...headers, "X-XSRF-TOKEN": xsrf };
  }
  headers = {
    ...headers,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  };

  const [resData, setResData] = useState<any>([]);
  const [errormessage, setErrorMessage] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isStartLoading) {
      sendRequest();
    }
  }, []);

  const sendRequest = async (data?: any) => {
    if (data !== null) config = { ...config, data: data };

    if (cookies.get("userdetails")!) {
      customer = cookies.get("userdetails");
    }
    if (customer && customer.email && customer.password) {
      const authorization =
        "Basic " + window.btoa(customer.email + ":" + customer.password);
      headers = { ...headers, Authorization: authorization };
    } else {
      let authorization = cookies.get("Authorization");

      if (authorization) {
        headers = { ...headers, Authorization: authorization };
      }
    }
    config = { ...config, headers: headers };

    try {
      setIsLoading(true);
      setError(false);

      const response = await axios(config);

      setIsLoading(false);
      console.log(response);
      console.log(response.headers);
      if (response.headers.authorization !== null) {
        const decodeJwt = jwtDecode(response.headers.authorization);
        cookies.set("Authorization", response.headers.authorization, {
          expires: new Date(decodeJwt.exp! * 1000),
        });
        dispatch({ type: "LOGIN", payload: true });
        cookies.remove("userdetails");
      }
      setResData(response.data);

      router.push(path!);
    } catch (error) {
      cookies.remove("userdetails");
      setIsLoading(false);
      setError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  return [resData, error, errormessage, isLoading, sendRequest];
};
