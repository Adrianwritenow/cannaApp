import Link from "next/link";
import React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function CookieDisclaimer() {
  return (
    <CookieConsent
      declineButtonText="No Thanks"
      enableDeclineButton
      buttonText="Okay"
      flipButtons
      style={{
        background: "white",
        color: "#374151",
        borderRadius: "15px 15px 0 0",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
      }}
      buttonStyle={{
        color: "white",
        borderRadius: "6px",
        background: "#2F603D",
        alignSelf: "center",
        marginTop: "1.5em",
        padding: ".75em 3em",
        marginRight: "0",
      }}
      contentStyle={{
        lineHeight: "1.6",
        margin: '1em 1em 0 0',
        padding: "0 1em",
      }}
      declineButtonStyle={{
        borderRadius: "6px",
        marginTop: ".5em",
        padding: ".625em 1.75em",
        background: "white",
        color: "#2F603D",
        border: "solid 2px #2F603D",
        fontweight: "bold",
        boxSizing: "border-box",
    
      }}
    >
      To enhance your experience, this website uses cookies.{" "}
      <Link passHref href={"/privacy-policy"}>
        <a className="font-bold underline text-green-400">Learn More</a>
      </Link>
    </CookieConsent>
  );
}
