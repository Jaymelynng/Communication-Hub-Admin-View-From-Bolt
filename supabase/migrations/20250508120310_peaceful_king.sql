/*
  # Content Assignment System

  1. New Tables
    - `content_assignments`
      - Links content items to gyms
      - Tracks completion status and notes
      - Manages assignment lifecycle

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create content_assignments table if it doesn't exist
CREATE TABLE IF NOT EXISTS content_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content_items(id) ON DELETE CASCADE,
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  manager_notes text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_assignments ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'content_assignments' 
    AND policyname = 'Allow authenticated read access to content_assignments'
  ) THEN
    DROP POLICY "Allow authenticated read access to content_assignments" ON content_assignments;
  END IF;
END $$;

-- Add RLS policies
CREATE POLICY "Allow authenticated read access to content_assignments"
  ON content_assignments FOR SELECT
  TO authenticated
  USING (true);

-- Drop existing trigger if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_content_assignments_updated_at'
  ) THEN
    DROP TRIGGER IF EXISTS update_content_assignments_updated_at ON content_assignments;
  END IF;
END $$;

-- Add updated_at trigger
CREATE TRIGGER update_content_assignments_updated_at
  BEFORE UPDATE ON content_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample assignments
INSERT INTO content_assignments (content_id, gym_id, status, manager_notes)
SELECT 
  c.id as content_id,
  g.id as gym_id,
  'pending' as status,
  'Please complete by due date' as manager_notes
FROM content_items c
CROSS JOIN gyms g
WHERE c.title IN ('December Holiday Reel', 'Winter Camp Photos')
  AND g.name IN ('Capital Gymnastics Cedar Park', 'Houston Gymnastics Academy');