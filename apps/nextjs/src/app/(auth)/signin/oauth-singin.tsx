"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/types";

import { Button } from "@linxia/ui";
import * as Icons from "@linxia/ui";

export default function OauthSingIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const oauthSignIn = async (provider: OAuthStrategy) => {
    if (!signInLoaded) return null;
    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (cause) {
      setIsLoading(null);
      console.error(cause);
    }
  };
  return (
    <>
      <div className="flex space-x-2">
        <Button
          type="outline"
          size={"lg"}
          className="w-full p-2  shadow"
          loading={isLoading === "oauth_github"}
          icon={<Icons.GitHub />}
          onClick={() => oauthSignIn("oauth_github")}
        ></Button>
        <Button
          type="outline"
          size={"lg"}
          className="w-full shadow"
          loading={isLoading === "oauth_google"}
          icon={<Icons.Google />}
          onClick={() => oauthSignIn("oauth_google")}
        ></Button>
      </div>
    </>
  );
}
