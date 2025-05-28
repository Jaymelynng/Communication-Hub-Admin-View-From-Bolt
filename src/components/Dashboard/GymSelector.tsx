import React from 'react';
import { GYMS } from '../../utils/constants';

export function GymSelector() {
  return (
    <select
      defaultValue="All Gyms"
      className="px-6 py-2 rounded-lg border"
      style={{ borderColor: "#cec4c1", color: "#737373" }}
    >
      <option value="All Gyms">All Gyms</option>
      {GYMS.map((gym) => (
        <option key={gym} value={gym}>
          {gym}
        </option>
      ))}
    </select>
  );
}