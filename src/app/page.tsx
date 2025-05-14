"use client";
import Intro from "@/components/introduction";
import CustomerDetailsExample from "@/components/billing";
import Application from "@/components/application";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col gap-8 max-w-7xl mx-auto">
      <Intro />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerDetailsExample />
        <Application />
      </div>
    </div>
  );
}
