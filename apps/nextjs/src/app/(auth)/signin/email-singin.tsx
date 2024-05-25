"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button, Input } from "@linxia/ui";

export function EmailSignIn() {
  const [showEmailOption, setShowEmailOption] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const router = useRouter();

  const signInWithLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    console.log(email);

    if (!signInLoaded || typeof email !== "string" || email === "") return null;

    // the catch here prints out the error.
    // if the user doesn't exist we will return a 422 in the network response.
    // so push that to the sign up.
    setIsLoading(true);
    await signIn
      .create({
        identifier: email,
      })
      .catch((error) => {
        console.log("sign-in error", JSON.stringify(error));
      });

    const firstFactor = signIn.supportedFirstFactors.find(
      (f) => f.strategy === "email_link",
      // This cast shouldn't be necessary but because TypeScript is dumb and can't infer it.
    ) as { emailAddressId: string } | undefined;

    if (firstFactor) {
      const magicFlow = signIn.createMagicLinkFlow();

      setIsLoading(false);
      toast("Email enviado", {
        description: "Check your inbox for a verification email.",
      });
      const response = await magicFlow
        .startMagicLinkFlow({
          emailAddressId: firstFactor.emailAddressId,
          redirectUrl: `${window.location.origin}/`,
        })
        .catch(() => {
          toast.error("Error", {
            description: "Something went wrong, please try again.",
          });
        });

      const verification = response?.firstFactorVerification;
      if (verification?.status === "expired") {
        toast("Link Expired", {
          description: "Link expired, please try again.",
        });
      }

      magicFlow.cancelMagicLinkFlow();
      if (response?.status === "complete") {
        await setActive({ session: response.createdSessionId }).then(() =>
          router.push(`/dashboard`),
        );
      }
    } else {
      if (!signUpLoaded) return null;
      await signUp.create({
        emailAddress: email,
      });
      const { startMagicLinkFlow } = signUp.createMagicLinkFlow();

      setIsLoading(false);
      toast("Email Sent", {
        description: "Check your inbox for a verification email.",
      });
      const response = await startMagicLinkFlow({
        redirectUrl: `${window.location.origin}/`,
      })
        .catch(() => {
          toast.error("Error", {
            description: "Something went wrong, please try again.",
          });
        })
        .then((res) => res);

      if (response?.status === "complete") {
        await setActive({ session: response.createdSessionId }).then(() =>
          router.push(`/dashboard`),
        );
        return;
      }
    }
  };

  return (
    <form className="grid gap-2" onSubmit={signInWithLink}>
      {showEmailOption && (
        <div className="mb-2 grid gap-1">
          <Input
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>
      )}
      <Button
        loading={isLoading}
        {...(!showEmailOption && {
          onClick: (e) => {
            e.preventDefault();
            setShowEmailOption(true);
          },
        })}
        htmlType="submit"
      >
        Entrar com email
      </Button>
    </form>
  );
}
