/*
  # Add Sample Marketing Content

  1. Sample Data
    - Marketing content entries for different content types
    - Associated tasks and details
    - Content assets with example images
    - Content details with specifications

  2. Content Types
    - Email newsletter
    - Social media campaign
    - In-gym flyer
*/

-- Add sample marketing content
INSERT INTO marketing_content (
  title, 
  description, 
  content_type, 
  scheduled_date, 
  approval_status,
  theme,
  target_audience,
  focus_area
) VALUES
  (
    'December Newsletter', 
    'Monthly newsletter highlighting winter programs', 
    'email', 
    '2024-12-01', 
    'pending',
    'Winter Wonderland',
    'Current Members',
    'Program Updates'
  ),
  (
    'Holiday Camp Promotion', 
    'Social media campaign for winter camp', 
    'social_media', 
    '2024-12-05', 
    'pending',
    'Holiday Fun',
    'Parents',
    'Camp Registration'
  ),
  (
    'Winter Competition Flyer', 
    'In-gym flyer for upcoming competition', 
    'in_gym', 
    '2024-12-10', 
    'approved',
    'Competition Season',
    'Team Parents',
    'Competition Details'
  );

-- Add associated tasks
INSERT INTO marketing_tasks (content_id, task_type, due_date, status)
SELECT 
  id,
  'review',
  scheduled_date - interval '3 days',
  'pending'
FROM marketing_content;

-- Add content details
INSERT INTO content_details (
  content_id, 
  photo_examples, 
  visual_notes, 
  key_points,
  dimensions,
  print_specs
)
SELECT 
  id,
  ARRAY['https://images.unsplash.com/photo-1518281420975-50db6e5d0a97'],
  'Use winter-themed imagery with warm, inviting colors',
  ARRAY['Highlight early bird pricing', 'Include testimonials', 'Feature facility photos'],
  CASE 
    WHEN content_type = 'in_gym' THEN '8.5x11 inches'
    ELSE NULL 
  END,
  CASE 
    WHEN content_type = 'in_gym' THEN 
      '{"paper": "glossy", "color": "full", "quantity": 50}'::jsonb
    ELSE NULL
  END
FROM marketing_content;

-- Add content assets
INSERT INTO content_assets (content_id, asset_type, url, description)
SELECT 
  id,
  'image',
  'https://images.unsplash.com/photo-1518281420975-50db6e5d0a97',
  'Header image for campaign'
FROM marketing_content;