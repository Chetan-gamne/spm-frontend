import React from "react";
import Dashboard from "../components/dashboard";
import ClientOnly from "../components/ClientOnly";

function dash() {
  return (
    <div>
      <ClientOnly>
        <Dashboard />
      </ClientOnly>
    </div>
  );
}

export default dash;
