/*
  # Add Sample Marketing Content

  1. Sample Data
    - Marketing content entries
    - Associated tasks
    - Content details
    - Content assets

  2. Content Types
    - Email newsletter
    - Social media campaign
    - In-gym flyer
*/

-- Add sample marketing content
INSERT INTO marketing_content (title, description, content_type, scheduled_date, approval_status) VALUES
  ('December Newsletter', 'Monthly newsletter highlighting winter programs', 'email', '2024-12-01', 'pending'),
  ('Holiday Camp Promotion', 'Social media campaign for winter camp', 'social_media', '2024-12-05', 'pending'),
  ('Winter Competition Flyer', 'In-gym flyer for upcoming competition', 'in_gym', '2024-12-10', 'approved');

-- Add associated tasks
INSERT INTO marketing_tasks (content_id, task_type, due_date, status)
SELECT 
  id,
  'review',
  scheduled_date - interval '3 days',
  'pending'
FROM marketing_content;

-- Add content details
INSERT INTO content_details (content_id, photo_examples, visual_notes, key_points)
SELECT 
  id,
  ARRAY['https://images.unsplash.com/photo-1518281420975-50db6e5d0a97'],
  'Use winter-themed imagery with warm, inviting colors',
  ARRAY['Highlight early bird pricing', 'Include testimonials', 'Feature facility photos']
FROM marketing_content;

-- Add content assets
INSERT INTO content_assets (content_id, asset_type, url, description)
SELECT 
  id,
  'image',
  'https://images.unsplash.com/photo-1518281420975-50db6e5d0a97',
  'Header image for campaign'
FROM marketing_content;