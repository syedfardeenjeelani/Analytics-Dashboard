"use client";

import { Provider } from "react-redux";
import { makeStore } from "../lib/store/store";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={makeStore()}>{children}</Provider>;
}
