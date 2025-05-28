/*
  # Create news updates table

  1. New Tables
    - `news_updates`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `category` (text)
      - `priority` (integer, default: 0)
      - `published_at` (timestamptz, default: now())
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz, default: now())
      - `updated_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `news_updates` table
    - Add policy for authenticated users to read news updates
*/

CREATE TABLE IF NOT EXISTS news_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text,
  priority integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news_updates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read news updates
CREATE POLICY "Allow authenticated users to read news updates"
  ON news_updates
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to news updates"
  ON news_updates
  FOR SELECT
  TO public
  USING (true);

-- Insert some initial data
INSERT INTO news_updates (title, content, category, priority, published_at)
VALUES 
  ('Welcome to Our New Platform', 'We are excited to announce the launch of our new content management platform.', 'Announcement', 1, now()),
  ('System Maintenance Notice', 'Scheduled maintenance will occur this weekend. Please save your work.', 'System', 2, now()),
  ('New Feature: Task Management', 'We have added new task management capabilities to help streamline your workflow.', 'Feature', 1, now());