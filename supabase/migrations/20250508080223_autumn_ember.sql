/*
  # Enhance news updates table

  1. Changes
    - Add type field for categorizing updates (info, reminder, alert, success)
    - Add due_date for reminders and time-sensitive updates
    - Add sample data demonstrating different update types

  2. Security
    - Maintain existing RLS policies if they exist
    - Ensure public and authenticated read access
*/

-- Add new fields to news_updates if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'news_updates' AND column_name = 'type'
  ) THEN
    ALTER TABLE news_updates ADD COLUMN type text DEFAULT 'info';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'news_updates' AND column_name = 'due_date'
  ) THEN
    ALTER TABLE news_updates ADD COLUMN due_date timestamptz;
  END IF;
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'news_updates' AND policyname = 'Allow authenticated users to read news updates'
  ) THEN
    DROP POLICY "Allow authenticated users to read news updates" ON news_updates;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'news_updates' AND policyname = 'Allow public read access to news updates'
  ) THEN
    DROP POLICY "Allow public read access to news updates" ON news_updates;
  END IF;
END $$;

-- Recreate policies
CREATE POLICY "Allow authenticated users to read news updates"
  ON news_updates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to news updates"
  ON news_updates
  FOR SELECT
  TO public
  USING (true);

-- Insert sample data
INSERT INTO news_updates (title, content, type, category, priority, published_at, due_date)
VALUES 
  ('Holiday Campaign Review', 'Review and approve holiday campaign materials', 'reminder', 'Marketing', 1, now(), now() + interval '1 day'),
  ('System Maintenance Notice', 'Scheduled maintenance this weekend. Please save your work.', 'alert', 'System', 2, now(), now() + interval '3 days'),
  ('Content Calendar Updated', 'December content calendar is now available', 'success', 'Content', 1, now(), null),
  ('New Feature: Task Management', 'We have added new task management capabilities', 'info', 'Feature', 1, now(), null);