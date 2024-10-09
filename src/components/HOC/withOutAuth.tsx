import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export const withOutAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper = (props: any) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated") {
        router.push("/");
      }
    }, [status, router]);

    if (status === "loading") {
      return (
        <div className="grid h-screen w-screen place-content-center">
          <CircularProgress />
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};
