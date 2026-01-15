"use client";
import { useSession } from "next-auth/react";
import React from "react";
import AdminOverview from "./(admin)/adminOverview/page";
import UserOverview from "./(user)/user-overview/page";

const Overview = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Please log in to access this page.</p>
      </div>
    );
  }

  const isAdmin = session?.user?.role === "admin";

  return <main>{isAdmin ? <AdminOverview /> : <UserOverview />}</main>;
};

export default Overview;
