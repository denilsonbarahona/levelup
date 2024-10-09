import { useEffect } from "react";
import { apiClient } from "@/utils/axios";
import { useSession } from "next-auth/react";

export const useSetupAxiosInterceptors = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use(
      (config) => {
        if (session?.signedToken) {
          config.headers.Authorization = `Bearer ${session.signedToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return () => {
      apiClient.interceptors.request.eject(interceptor);
    };
  }, [session?.signedToken]);
};
