/*
  # Streamline Marketing Content Management

  1. Changes
    - Consolidate content tables into core marketing_content table
    - Add marketing_tasks for task tracking
    - Add content_assignments for gym assignments
    - Add proper validation and relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-specific policies for content management
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated read access to marketing_content" ON marketing_content;
DROP POLICY IF EXISTS "Allow authenticated read access to marketing_tasks" ON marketing_tasks;
DROP POLICY IF EXISTS "Allow authenticated read access to content_assignments" ON content_assignments;

-- Ensure core tables exist with proper structure
CREATE TABLE IF NOT EXISTS marketing_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content_type text NOT NULL CHECK (content_type IN ('social', 'email', 'in-gym')),
  scheduled_date date NOT NULL,
  due_date date NOT NULL CHECK (due_date <= scheduled_date),
  status text DEFAULT 'draft',
  focus_area text,
  photo_examples text[],
  visual_notes text,
  key_points text[],
  manager_checklist text[],
  support_checklist text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS marketing_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES marketing_content(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES marketing_content(id) ON DELETE CASCADE,
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  notes text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE marketing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_assignments ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for read access
CREATE POLICY "marketing_content_read_policy"
  ON marketing_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "marketing_tasks_read_policy"
  ON marketing_tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "content_assignments_read_policy"
  ON content_assignments FOR SELECT
  TO authenticated
  USING (true);

-- Add admin-specific policies
CREATE POLICY "marketing_content_insert_policy"
  ON marketing_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "marketing_content_update_policy"
  ON marketing_content FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "marketing_content_delete_policy"
  ON marketing_content FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Add updated_at triggers
CREATE TRIGGER update_marketing_content_updated_at
  BEFORE UPDATE ON marketing_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_marketing_tasks_updated_at
  BEFORE UPDATE ON marketing_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_assignments_updated_at
  BEFORE UPDATE ON content_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample content
INSERT INTO marketing_content (
  title,
  description,
  content_type,
  scheduled_date,
  due_date,
  status,
  focus_area,
  photo_examples,
  visual_notes,
  key_points,
  manager_checklist,
  support_checklist
) VALUES (
  'December Holiday Post',
  'Showcase holiday spirit in the gym',
  'social',
  '2024-12-15',
  '2024-12-10',
  'draft',
  'Holiday Spirit',
  ARRAY['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634'],
  'Use warm lighting and festive decorations',
  ARRAY['Show community engagement', 'Highlight holiday activities', 'Feature decorated areas'],
  ARRAY['Set up decorations', 'Schedule photo time', 'Review content'],
  ARRAY['Take photos', 'Add overlays', 'Schedule post']
);