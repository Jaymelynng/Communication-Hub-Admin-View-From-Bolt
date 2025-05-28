/*
  # Content Creation System

  1. New Tables
    - `content_creation`
      - Stores content tasks for social, email, and in-gym marketing
      - Includes validation for content types and dates
      - Supports visual tasks tracking via jsonb

  2. Security
    - Enable RLS
    - Add policy for authenticated users

  3. Sample Data
    - Adds example holiday post content
*/

-- Create content_creation table if it doesn't exist
CREATE TABLE IF NOT EXISTS content_creation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content_type text NOT NULL,
  series_type text DEFAULT 'single',
  content_date date NOT NULL,
  task_due_date date NOT NULL,
  focus_area text,
  goal text,
  key_notes text,
  photo_examples text,
  visual_tasks jsonb DEFAULT '[]',
  sharepoint_link text,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Add validation
  CONSTRAINT valid_content_type CHECK (content_type IN ('social', 'email', 'in-gym')),
  CONSTRAINT valid_series_type CHECK (series_type IN ('single', 'series')),
  CONSTRAINT valid_dates CHECK (task_due_date <= content_date)
);

-- Enable RLS
ALTER TABLE content_creation ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow authenticated read access to content_creation" ON content_creation;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Add RLS policies
CREATE POLICY "Allow authenticated read access to content_creation"
  ON content_creation FOR SELECT
  TO authenticated
  USING (true);

-- Drop existing trigger if it exists
DO $$
BEGIN
  DROP TRIGGER IF EXISTS update_content_creation_updated_at ON content_creation;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Add updated_at trigger
CREATE TRIGGER update_content_creation_updated_at
  BEFORE UPDATE ON content_creation
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample data
INSERT INTO content_creation (
  title,
  content_type,
  series_type,
  content_date,
  task_due_date,
  focus_area,
  goal,
  key_notes,
  photo_examples,
  visual_tasks,
  sharepoint_link,
  status
) VALUES (
  'December Holiday Post',
  'social',
  'single',
  '2024-12-15',
  '2024-12-10',
  'Holiday Spirit',
  'Engage community',
  'Capture festive gym atmosphere',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
  '[
    {"text": "Set up holiday decorations", "completed": false},
    {"text": "Take photos in morning light", "completed": false},
    {"text": "Add branded overlays", "completed": false}
  ]'::jsonb,
  'https://sharepoint.example.com/holiday-2024',
  'draft'
);