"use client";
import Intro from "@/components/introduction";
import CustomerDetailsExample from "@/components/billing";
import Application from "@/components/application";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col gap-8 max-w-7xl mx-auto">
      <Intro />

      <div className="flex gap-4 lg:flex-row flex-col-reverse">
        <CustomerDetailsExample />
        <Application />
      </div>
    </div>
  );
}
