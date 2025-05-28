/*
  # Add Gym Schema and Data

  1. New Tables
    - `gyms` - Core gym information
    - `gym_locations` - Physical locations for each gym
    - `gym_social` - Social media links and details

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gym_locations table
CREATE TABLE IF NOT EXISTS gym_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  name text NOT NULL,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  email text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gym_social table
CREATE TABLE IF NOT EXISTS gym_social (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  platform text NOT NULL,
  url text NOT NULL,
  handle text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_social ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow authenticated read access to gyms"
  ON gyms FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read access to gym_locations"
  ON gym_locations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read access to gym_social"
  ON gym_social FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample gyms
INSERT INTO gyms (name, brand) VALUES
  ('Capital Gymnastics Cedar Park', 'Capital Gymnastics'),
  ('Capital Gymnastics Pflugerville', 'Capital Gymnastics'),
  ('Capital Gymnastics Round Rock', 'Capital Gymnastics'),
  ('Estrella Gymnastics', 'Estrella Gymnastics'),
  ('Houston Gymnastics Academy', 'Houston Gymnastics'),
  ('Oasis Gymnastics', 'Oasis Gymnastics'),
  ('Rowland Ballard - Atascocita', 'Rowland Ballard'),
  ('Rowland Ballard - Kingwood', 'Rowland Ballard'),
  ('Scottsdale Gymnastics', 'Scottsdale Gymnastics'),
  ('Tigar Gymnastics', 'Tigar Gymnastics');

-- Insert sample locations
INSERT INTO gym_locations (gym_id, name, city, state, is_primary)
SELECT 
  id,
  name,
  CASE 
    WHEN name LIKE '%Cedar Park%' THEN 'Cedar Park'
    WHEN name LIKE '%Pflugerville%' THEN 'Pflugerville'
    WHEN name LIKE '%Round Rock%' THEN 'Round Rock'
    WHEN name LIKE '%Houston%' THEN 'Houston'
    WHEN name LIKE '%Scottsdale%' THEN 'Scottsdale'
    WHEN name LIKE '%Atascocita%' THEN 'Atascocita'
    WHEN name LIKE '%Kingwood%' THEN 'Kingwood'
    ELSE 'Unknown'
  END,
  CASE 
    WHEN name LIKE '%Scottsdale%' THEN 'AZ'
    ELSE 'TX'
  END,
  true
FROM gyms;

-- Insert sample social media
INSERT INTO gym_social (gym_id, platform, url, handle)
SELECT 
  id,
  'instagram',
  'https://instagram.com/' || LOWER(REPLACE(name, ' ', '')),
  LOWER(REPLACE(name, ' ', ''))
FROM gyms;