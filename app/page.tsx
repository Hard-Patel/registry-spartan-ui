import * as React from "react";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-1 justify-between items-center flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Spartan UI: Components Registry
        </h1>
        <div className="text-center">
          <span className="my-4 text-xl">
            Visit Website:{" "}
            <a
              className="text-blue-500 underline"
              href="https://components-hardp.netlify.app/"
            >
              https://components-hardp.netlify.app/
            </a>
          </span>
          <p className="text-muted-foreground">
            A custom registry for distributing code using shadcn.
          </p>
        </div>
        <div className="mt-8">
          <h6 className="text-xl font-medium tracking-tight">
            Made with React, Tailwind, Motion and ❤️ By{" "}
            <a
              target="_blank"
              className="text-blue-500 underline"
              href="https://hard-patel.netlify.app/"
            >
              Hard Patel
            </a>
          </h6>
        </div>
      </header>
    </div>
  );
}
