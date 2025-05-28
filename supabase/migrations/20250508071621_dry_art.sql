/*
  # Content Schedule System

  1. New Tables
    - `tasks` - Base task management
    - `content_types` - Types of content (Reel, Carousel, etc)
    - `content_schedule` - Content calendar entries
    - `content_tasks` - Links content to tasks and gyms

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tasks table first since it's referenced by content_tasks
CREATE TABLE IF NOT EXISTS tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_types (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_schedule (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  content_type_id uuid REFERENCES content_types(id),
  scheduled_date date NOT NULL,
  examples text,
  manager_checklist text[],
  support_checklist text[],
  upload_folder text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id uuid REFERENCES content_schedule(id),
  task_id uuid REFERENCES tasks(id),
  gym_id uuid REFERENCES gyms(id),
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tasks ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow read access to authenticated users" ON tasks
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON content_types
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON content_schedule
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON content_tasks
  FOR SELECT TO authenticated USING (true);

-- Insert initial content types
INSERT INTO content_types (name, icon, description) VALUES
  ('Reel', '🎥', '3-5 video clips'),
  ('Carousel', '🎠', '4 photos'),
  ('Static', '📸', '1-2 photos');