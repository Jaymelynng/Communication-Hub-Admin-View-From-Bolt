/*
  # Content Creation System

  1. New Tables
    - `content_creation` - Manages content creation workflow
      - Supports social, email, and in-gym content types
      - Handles single posts and series
      - Includes task management and visual requirements
      - Tracks content status and deadlines

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add admin-specific policies for content management
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'content_creation' AND schemaname = 'public'
  ) THEN
    DROP POLICY IF EXISTS "Allow authenticated read access to content_creation" ON content_creation;
    DROP POLICY IF EXISTS "Allow admin insert access to content_creation" ON content_creation;
    DROP POLICY IF EXISTS "Allow admin update access to content_creation" ON content_creation;
    DROP POLICY IF EXISTS "Allow admin delete access to content_creation" ON content_creation;
  END IF;
END $$;

-- Drop existing trigger if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_content_creation_updated_at'
  ) THEN
    DROP TRIGGER IF EXISTS update_content_creation_updated_at ON content_creation;
  END IF;
END $$;

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

-- Add RLS policies
CREATE POLICY "Allow authenticated read access to content_creation"
  ON content_creation FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin insert access to content_creation"
  ON content_creation FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Allow admin update access to content_creation"
  ON content_creation FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Allow admin delete access to content_creation"
  ON content_creation FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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