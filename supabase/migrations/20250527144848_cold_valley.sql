/*
  # Fix duplicate policies for marketing_tasks table

  1. Changes
    - Drop duplicate "Allow authenticated read access to marketing_tasks" policy
    - Create new policy with unique name "Enable read access for authenticated users"

  2. Security
    - Maintains same security level by ensuring authenticated users can still read tasks
    - No changes to existing permissions or access levels
*/

DO $$ 
BEGIN
  -- Drop the duplicate policy if it exists
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'marketing_tasks' 
    AND policyname = 'Allow authenticated read access to marketing_tasks'
  ) THEN
    DROP POLICY IF EXISTS "Allow authenticated read access to marketing_tasks" ON marketing_tasks;
  END IF;
END $$;

-- Create new policy with unique name
CREATE POLICY "Enable read access for authenticated users"
  ON marketing_tasks
  FOR SELECT
  TO authenticated
  USING (true);