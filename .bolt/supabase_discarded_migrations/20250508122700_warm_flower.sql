/*
  # Add Admin Policies for Content Creation

  1. Changes
    - Add admin-specific policies for content_creation table
    - Ensure proper role-based access control
    - Add sample admin user if needed

  2. Security
    - Maintain existing RLS
    - Add granular admin policies
*/

-- Add admin-specific policies for content management
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