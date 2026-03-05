'use client';
import React, { useState, useEffect } from "react";

const TrialDashboard: React.FC = () => {
 

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-100">
      <div className=" rounded-2xl w-[80vw] pb-8 h-100 flex flex-col my-10 bg bg-white drop-shadow-lg">
      <div className="flex justify-center items-center gap-4">

      <div className="border-4 border-blue-500">
  This element has a blue border.
</div>
<div className="outline-4 outline-blue-500">
  This element has a blue outline.
</div>
<div className="ring-4 ring-blue-500 ring-offset-2">
  This element has a blue ring around it.
</div>
</div>
<div className="flex justify-center items-center gap-4">

      <div className="border-4 border-l-red-500 border-r-blue-500">
  This element has a blue border.
</div>
<div className="border-4 border-red-500">
  This element has a blue outline.
</div>
<div className="ring-4 ring-red-500">
  This element has a blue ring around it.
</div>
</div>
      </div>
      </div>
     
  );
}

export default TrialDashboard;