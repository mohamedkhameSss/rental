"use client";
import React, { useEffect, useState } from "react";
interface ClientOnlyProps {
  children: React.ReactNode;
}
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMHounted, setasMounted] = useState(false);
  useEffect(() => {
    setasMounted(true);
  }, []);
  if (!hasMHounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
