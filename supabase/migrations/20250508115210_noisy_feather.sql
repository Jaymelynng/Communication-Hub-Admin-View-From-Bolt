/*
  # Schema Verification

  This migration verifies that:
  1. Required tables exist
  2. Content types are properly set up
  3. RLS is properly configured
  4. Foreign key relationships are correct
  5. Sample data exists
*/

DO $$ 
BEGIN
  -- Verify marketing content workflow
  ASSERT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('marketing_content', 'content_details', 'content_tasks', 'content_assets')
  ), 'Missing core marketing tables';

  -- Verify gym management
  ASSERT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('gym_details', 'gyms')
  ), 'Missing gym management tables';

  -- Verify content types
  ASSERT EXISTS (
    SELECT FROM content_types 
    WHERE name IN ('social_media', 'email', 'in_gym')
  ), 'Missing required content types';

  -- Verify RLS is enabled
  ASSERT EXISTS (
    SELECT FROM pg_tables t
    JOIN pg_class c ON c.relname = t.tablename
    WHERE t.schemaname = 'public' 
    AND t.tablename = 'marketing_content'
    AND c.relrowsecurity = true
  ), 'RLS not enabled on marketing_content';

  ASSERT EXISTS (
    SELECT FROM pg_tables t
    JOIN pg_class c ON c.relname = t.tablename
    WHERE t.schemaname = 'public' 
    AND t.tablename = 'content_details'
    AND c.relrowsecurity = true
  ), 'RLS not enabled on content_details';

  ASSERT EXISTS (
    SELECT FROM pg_tables t
    JOIN pg_class c ON c.relname = t.tablename
    WHERE t.schemaname = 'public' 
    AND t.tablename = 'gym_details'
    AND c.relrowsecurity = true
  ), 'RLS not enabled on gym_details';

  -- Verify foreign key relationships
  ASSERT EXISTS (
    SELECT FROM pg_constraint 
    WHERE conname = 'content_details_content_id_fkey'
  ), 'Missing content_details foreign key';

  ASSERT EXISTS (
    SELECT FROM pg_constraint 
    WHERE conname = 'content_tasks_content_id_fkey'
  ), 'Missing content_tasks foreign key';

  -- Verify sample data
  ASSERT EXISTS (
    SELECT FROM gym_details 
    WHERE gym_name = 'Capital Gymnastics Cedar Park'
  ), 'Missing sample gym data';

  RAISE NOTICE 'Schema verification complete - all checks passed';
END $$;