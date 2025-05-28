/*
  # Add Gyms

  1. Changes
    - Insert gyms into gym_details table
    - Insert gyms into gyms table (without location field)
    - Use WHERE NOT EXISTS to prevent duplicates

  2. Security
    - No changes to existing RLS policies
*/

-- Insert gyms if they don't already exist
INSERT INTO gym_details (gym_name)
SELECT gym_name
FROM (VALUES
  ('Capital Gymnastics Cedar Park'),
  ('Capital Gymnastics Pflugerville'),
  ('Capital Gymnastics Round Rock'),
  ('Rowland Ballard - Atascocita'),
  ('Rowland Ballard - Kingwood'),
  ('Houston Gymnastics Academy'),
  ('Estrella Gymnastics'),
  ('Oasis Gymnastics'),
  ('Scottsdale Gymnastics'),
  ('Tigar Gymnastics')
) AS new_gyms(gym_name)
WHERE NOT EXISTS (
  SELECT 1 FROM gym_details 
  WHERE gym_details.gym_name = new_gyms.gym_name
);

-- Also add to gyms table for compatibility
INSERT INTO gyms (name)
SELECT gym_name
FROM (VALUES
  ('Capital Gymnastics Cedar Park'),
  ('Capital Gymnastics Pflugerville'),
  ('Capital Gymnastics Round Rock'),
  ('Rowland Ballard - Atascocita'),
  ('Rowland Ballard - Kingwood'),
  ('Houston Gymnastics Academy'),
  ('Estrella Gymnastics'),
  ('Oasis Gymnastics'),
  ('Scottsdale Gymnastics'),
  ('Tigar Gymnastics')
) AS new_gyms(gym_name)
WHERE NOT EXISTS (
  SELECT 1 FROM gyms 
  WHERE gyms.name = new_gyms.gym_name
);