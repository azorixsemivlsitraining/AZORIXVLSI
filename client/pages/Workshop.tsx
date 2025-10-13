import React from "react";
import { Navigate } from "react-router-dom";

export default function Workshop() {
  // Redirect old workshop route to the consolidated demo page
  return <Navigate to="/demo" replace />;
}
