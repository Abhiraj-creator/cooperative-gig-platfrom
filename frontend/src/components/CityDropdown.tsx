import React from 'react';

interface CityDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CITIES = [
  'Mumbai, MH',
  'Delhi, DL',
  'Bengaluru, KA',
  'Chennai, TN',
  'Kolkata, WB',
  'Hyderabad, TG',
  'Ahmedabad, GJ',
  'Pune, MH',
  'Surat, GJ',
  'Jaipur, RJ',
  'Lucknow, UP',
  'Kanpur, UP',
  'Nagpur, MH',
  'Indore, MP',
  'Bhopal, MP',
  'Patna, BR',
  'Ludhiana, PB',
  'Coimbatore, TN',
  'Kochi, KL',
  'Visakhapatnam, AP'
];

export const CityDropdown: React.FC<CityDropdownProps> = ({ value, onChange }) => (
  <select
    id="city-dropdown"
    value={value}
    onChange={e => onChange(e.target.value)}
    className="tech-input"
    required
  >
    <option value="">Select City</option>
    {CITIES.map(city => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>
);
