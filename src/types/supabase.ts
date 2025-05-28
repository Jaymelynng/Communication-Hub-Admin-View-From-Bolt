export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      marketing_content: {
        Row: {
          id: string
          title: string
          description: string | null
          content_type: string
          scheduled_date: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content_type: string
          scheduled_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content_type?: string
          scheduled_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      marketing_tasks: {
        Row: {
          id: string
          content_id: string | null
          task_type: string
          due_date: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content_id?: string | null
          task_type: string
          due_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content_id?: string | null
          task_type?: string
          due_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      gym_details: {
        Row: {
          id: string
          gym_name: string
          location: string | null
          instagram_url: string | null
          facebook_url: string | null
          sharepoint_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          gym_name: string
          location?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          sharepoint_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          gym_name?: string
          location?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          sharepoint_url?: string | null
          created_at?: string
        }
      }
      gyms: {
        Row: {
          id: string
          name: string
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      marketing_items: {
        Row: {
          id: string
          item_type: string | null
          title: string
          caption: string | null
          visuals_notes: string | null
          key_notes: string | null
          photo_examples: string | null
          post_format: string | null
          is_global: boolean | null
          created_at: string
          updated_at: string
          campaign_id: string | null
          collection_id: string | null
          optimized_url: string | null
          display_order: number | null
          version: number | null
          html_content: string | null
          ab_test: Json | null
        }
        Insert: {
          id?: string
          item_type?: string | null
          title: string
          caption?: string | null
          visuals_notes?: string | null
          key_notes?: string | null
          photo_examples?: string | null
          post_format?: string | null
          is_global?: boolean | null
          created_at?: string
          updated_at?: string
          campaign_id?: string | null
          collection_id?: string | null
          optimized_url?: string | null
          display_order?: number | null
          version?: number | null
          html_content?: string | null
          ab_test?: Json | null
        }
        Update: {
          id?: string
          item_type?: string | null
          title?: string
          caption?: string | null
          visuals_notes?: string | null
          key_notes?: string | null
          photo_examples?: string | null
          post_format?: string | null
          is_global?: boolean | null
          created_at?: string
          updated_at?: string
          campaign_id?: string | null
          collection_id?: string | null
          optimized_url?: string | null
          display_order?: number | null
          version?: number | null
          html_content?: string | null
          ab_test?: Json | null
        }
      }
      tasks: {
        Row: {
          id: string
          marketing_item_id: string | null
          gym_id: string | null
          title: string
          description: string | null
          due_date: string | null
          status: string | null
          created_at: string
          updated_at: string
          template_id: string | null
          recurrence: Json | null
          dependencies: Json | null
          time_tracking: Json | null
        }
        Insert: {
          id?: string
          marketing_item_id?: string | null
          gym_id?: string | null
          title: string
          description?: string | null
          due_date?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
          template_id?: string | null
          recurrence?: Json | null
          dependencies?: Json | null
          time_tracking?: Json | null
        }
        Update: {
          id?: string
          marketing_item_id?: string | null
          gym_id?: string | null
          title?: string
          description?: string | null
          due_date?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
          template_id?: string | null
          recurrence?: Json | null
          dependencies?: Json | null
          time_tracking?: Json | null
        }
      }
    }
  }
}