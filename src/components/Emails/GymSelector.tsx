import React from 'react';
import { GYMS } from '../../utils/constants';

interface GymSelectorProps {
  selectedGym: string;
  onGymChange: (gym: string) => void;
}

export function GymSelector({ selectedGym, onGymChange }: GymSelectorProps) {
  return (
    <div className="mb-8">
      <select
        value={selectedGym}
        onChange={(e) => onGymChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg border bg-white"
        style={{ borderColor: "#cec4c1" }}
      >
        <option value="">Select a gym...</option>
        {GYMS.sort().map((gym, index) => (
          <option key={index} value={gym}>
            {gym} (ID: {index + 1000})
          </option>
        ))}
      </select>
    </div>
  );
}