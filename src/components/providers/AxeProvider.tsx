"use client";

import { useEffect } from "react";

export default function AxeProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    void (async () => {
      const [ReactModule, ReactDOMModule] = await Promise.all([
        import("react"),
        import("react-dom"),
      ]);

      const React = ReactModule.default ?? ReactModule;
      const ReactDOM = ReactDOMModule.default ?? ReactDOMModule;
      const reactMajor = Number.parseInt(React.version.split(".")[0] ?? "0", 10);

      if (reactMajor >= 18) {
        console.warn(
          "Skipping @axe-core/react because it does not support React 18+.",
        );
        return;
      }

      const { default: axe } = await import("@axe-core/react");
      axe(React, ReactDOM, 1000);
    })().catch((error) => {
      console.warn("Failed to initialize @axe-core/react.", error);
    });
  }, []);

  return null;
}
