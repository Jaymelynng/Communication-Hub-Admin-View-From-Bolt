import React from 'react';
import { GymSelector } from './GymSelector';

export function DashboardBar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
      <GymSelector />
      <div className="flex gap-4">
        <select 
          className="px-4 py-2 rounded-lg border text-[#737373]"
          style={{ borderColor: "#cec4c1" }}
        >
          <option value="all">All Channels</option>
          <option value="email">Email Marketing</option>
          <option value="social">Social Media</option>
          <option value="in-gym">In-Gym Marketing</option>
        </select>
        <select 
          className="px-4 py-2 rounded-lg border text-[#737373]"
          style={{ borderColor: "#cec4c1" }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}