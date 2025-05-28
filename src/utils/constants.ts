export const GYMS = [
  "Capital Gymnastics Cedar Park",
  "Capital Gymnastics Pflugerville",
  "Capital Gymnastics Round Rock",
  "Estrella Gymnastics",
  "Houston Gymnastics Academy",
  "Oasis Gymnastics",
  "Rowland Ballard - Atascocita",
  "Rowland Ballard - Kingwood",
  "Scottsdale Gymnastics",
  "Tigar Gymnastics"
] as const;

export const TASK_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
} as const;

export const EMAIL_STATUS = {
  NEEDS_APPROVAL: 'needsApproval',
  HAS_EDITS: 'hasEdits',
  APPROVED: 'approved'
} as const;

export const TASK_CHANNELS = {
  SOCIAL_MEDIA: 'social-media',
  EMAIL_MARKETING: 'email-marketing',
  IN_GYM_MARKETING: 'in-gym-marketing',
  MISC: 'misc'
} as const;

export const TASK_CHANNEL_LABELS = {
  'social-media': 'Social Media',
  'email-marketing': 'Email Marketing',
  'in-gym-marketing': 'In-Gym Marketing',
  'misc': 'Miscellaneous'
} as const;