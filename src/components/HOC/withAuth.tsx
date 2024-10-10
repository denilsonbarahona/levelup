import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper = (props: any) => {
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status !== "authenticated" && status !== "loading" && !session) {
        router.push("/auth");
      }
    }, [status, router, session]);

    if (
      status === "loading" ||
      (status === "authenticated" && !session.signedToken)
    ) {
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
