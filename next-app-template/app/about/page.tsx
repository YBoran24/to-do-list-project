// app/about/page.tsx
import React from "react";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <p className="mt-4 text-gray-700">
        Bu sayfa hakkında bilgiler burada olacak.
      </p>
    </div>
  );
}
