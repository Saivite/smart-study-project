import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function ActiveLink({ children, activeLinkClass, ...props }) {
  const { pathname } = useRouter();
  if (pathname == props.href) {
    props.className = `${props.className} ${
      props.activeLinkClass ? props.activeLinkClass : "text-indigo-600"
    }`;
  }
  return <Link {...props}>{children}</Link>;
}
