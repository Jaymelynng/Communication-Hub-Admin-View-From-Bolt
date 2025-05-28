/*
  # Content Management System Schema

  1. New Tables
    - `content_items` - Main content entries
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content_type` (text, required) - reel, photo, carousel
      - `description` (text)
      - `examples` (text[]) - Reference images/ideas
      - `manager_duties` (text[]) - Manager checklist
      - `support_duties` (text[]) - Support team checklist
      - `go_live_date` (date, required)
      - `task_due_date` (date, required)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content_type text NOT NULL,
  description text,
  examples text[],
  manager_duties text[],
  support_duties text[],
  go_live_date date NOT NULL,
  task_due_date date NOT NULL,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Validation
  CONSTRAINT valid_content_type CHECK (content_type IN ('reel', 'photo', 'carousel')),
  CONSTRAINT valid_dates CHECK (task_due_date <= go_live_date)
);

-- Create content_assignments table for tracking gym assignments
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
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_assignments ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow authenticated read access to content_items"
  ON content_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read access to content_assignments"
  ON content_assignments FOR SELECT
  TO authenticated
  USING (true);

-- Add updated_at triggers
CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_assignments_updated_at
  BEFORE UPDATE ON content_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample content
INSERT INTO content_items (
  title,
  content_type,
  description,
  examples,
  manager_duties,
  support_duties,
  go_live_date,
  task_due_date,
  status
) VALUES
  (
    'December Holiday Reel',
    'reel',
    'Showcase holiday decorations and festive atmosphere in the gym',
    ARRAY[
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
      'https://images.unsplash.com/photo-1518281420975-50db6e5d0a97'
    ],
    ARRAY[
      'Set up holiday decorations in designated areas',
      'Coordinate with staff for filming times',
      'Ensure proper lighting and safety'
    ],
    ARRAY[
      'Film 3-5 short clips of holiday activities',
      'Add festive music overlay',
      'Include holiday greetings text'
    ],
    '2024-12-15',
    '2024-12-12',
    'draft'
  ),
  (
    'Winter Camp Photos',
    'photo',
    'Capture engaging moments from winter camp activities',
    ARRAY[
      'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe'
    ],
    ARRAY[
      'Schedule photo sessions during key activities',
      'Get photo release forms signed',
      'Identify best photo opportunities'
    ],
    ARRAY[
      'Take multiple photos of each activity',
      'Edit for brightness and color',
      'Add branded overlays'
    ],
    '2024-12-20',
    '2024-12-18',
    'draft'
  );