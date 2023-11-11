"use client";

import FA2Register from "@/components/FA2/FA2Register";
import FormPersonalInformation from "./FormPersonalInformation";
import { useState } from "react";

export default function PersonalInfo() {
  const editInfoState = useState(true);

  return (
    <>
      <FormPersonalInformation editInfoState={editInfoState} />

      {/* If not editingInfo */}
      {!editInfoState[0] && <FA2Register />}
    </>
  );
}
