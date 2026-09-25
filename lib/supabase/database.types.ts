export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      content_items: {
        Row: {
          access_policy: string
          ai_index_policy: string
          content_type: string
          cover_url: string | null
          created_at: string
          id: string
          language: string
          metadata: Json
          slug: string
          status: string
          summary: string | null
          tags: string[]
          title: string
          topics: string[]
          updated_at: string
          version: number
        }
        Insert: {
          access_policy?: string
          ai_index_policy?: string
          content_type: string
          cover_url?: string | null
          created_at?: string
          id?: string
          language?: string
          metadata?: Json
          slug: string
          status?: string
          summary?: string | null
          tags?: string[]
          title: string
          topics?: string[]
          updated_at?: string
          version?: number
        }
        Update: {
          access_policy?: string
          ai_index_policy?: string
          content_type?: string
          cover_url?: string | null
          created_at?: string
          id?: string
          language?: string
          metadata?: Json
          slug?: string
          status?: string
          summary?: string | null
          tags?: string[]
          title?: string
          topics?: string[]
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      content_product_access: {
        Row: {
          content_id: string
          created_at: string
          product_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          product_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_product_access_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_product_access_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      content_sources: {
        Row: {
          content_id: string
          created_at: string
          external_id: string | null
          extraction_status: string
          id: string
          media_url: string | null
          metadata: Json
          provider: string
          source_url: string | null
          transcript_status: string
          transcript_text: string | null
          updated_at: string
        }
        Insert: {
          content_id: string
          created_at?: string
          external_id?: string | null
          extraction_status?: string
          id?: string
          media_url?: string | null
          metadata?: Json
          provider: string
          source_url?: string | null
          transcript_status?: string
          transcript_text?: string | null
          updated_at?: string
        }
        Update: {
          content_id?: string
          created_at?: string
          external_id?: string | null
          extraction_status?: string
          id?: string
          media_url?: string | null
          metadata?: Json
          provider?: string
          source_url?: string | null
          transcript_status?: string
          transcript_text?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_sources_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      entitlements: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          product_id: string | null
          product_slug: string
          starts_at: string
          status: string
          updated_at: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          product_id?: string | null
          product_slug: string
          starts_at?: string
          status: string
          updated_at?: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          product_id?: string | null
          product_slug?: string
          starts_at?: string
          status?: string
          updated_at?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entitlements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          access_policy: string
          capacity: number | null
          created_at: string
          description: string | null
          end_at: string | null
          event_type: string | null
          id: string
          location_or_url: string | null
          metadata: Json
          price_cents: number | null
          product_id: string | null
          slug: string
          start_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          access_policy?: string
          capacity?: number | null
          created_at?: string
          description?: string | null
          end_at?: string | null
          event_type?: string | null
          id?: string
          location_or_url?: string | null
          metadata?: Json
          price_cents?: number | null
          product_id?: string | null
          slug: string
          start_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          access_policy?: string
          capacity?: number | null
          created_at?: string
          description?: string | null
          end_at?: string | null
          event_type?: string | null
          id?: string
          location_or_url?: string | null
          metadata?: Json
          price_cents?: number | null
          product_id?: string | null
          slug?: string
          start_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          external_id: string
          id: string
          paid_at: string | null
          product_id: string | null
          product_slug: string
          provider: string
          provider_payment_id: string | null
          source: Json
          status: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          external_id: string
          id?: string
          paid_at?: string | null
          product_id?: string | null
          product_slug: string
          provider: string
          provider_payment_id?: string | null
          source?: Json
          status: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          external_id?: string
          id?: string
          paid_at?: string | null
          product_id?: string | null
          product_slug?: string
          provider?: string
          provider_payment_id?: string | null
          source?: Json
          status?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          id: string
          metadata: Json
          name: string
          price_cents: number | null
          product_type: string
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          name: string
          price_cents?: number | null
          product_type: string
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          name?: string
          price_cents?: number | null
          product_type?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          equipment: Json
          experience_level: string | null
          id: string
          locale: string
          preferences: Json
          timezone: string
          training_goal: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          equipment?: Json
          experience_level?: string | null
          id: string
          locale?: string
          preferences?: Json
          timezone?: string
          training_goal?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          equipment?: Json
          experience_level?: string | null
          id?: string
          locale?: string
          preferences?: Json
          timezone?: string
          training_goal?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      program_days: {
        Row: {
          created_at: string
          id: string
          order_index: number
          program_id: string
          week: number
          weekday: number
          workout_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_index?: number
          program_id: string
          week: number
          weekday: number
          workout_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_index?: number
          program_id?: string
          week?: number
          weekday?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_days_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_days_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      program_enrollments: {
        Row: {
          completed_at: string | null
          created_at: string
          entitlement_id: string | null
          id: string
          metadata: Json
          program_id: string
          started_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          entitlement_id?: string | null
          id?: string
          metadata?: Json
          program_id: string
          started_at?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          entitlement_id?: string | null
          id?: string
          metadata?: Json
          program_id?: string
          started_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_enrollments_entitlement_id_fkey"
            columns: ["entitlement_id"]
            isOneToOne: false
            referencedRelation: "entitlements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          active: boolean
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json
          name: string
          product_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          name: string
          product_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          name?: string
          product_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          allergens: string[]
          content_id: string
          ingredients: Json
          meal_type: string | null
          metadata: Json
          nutrition: Json | null
          servings: number | null
          steps: Json
          updated_at: string
        }
        Insert: {
          allergens?: string[]
          content_id: string
          ingredients?: Json
          meal_type?: string | null
          metadata?: Json
          nutrition?: Json | null
          servings?: number | null
          steps?: Json
          updated_at?: string
        }
        Update: {
          allergens?: string[]
          content_id?: string
          ingredients?: Json
          meal_type?: string | null
          metadata?: Json
          nutrition?: Json | null
          servings?: number | null
          steps?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: true
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_slug: string
          product_id: string | null
          provider: string | null
          provider_subscription_id: string | null
          status: string
          updated_at: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_slug: string
          product_id?: string | null
          provider?: string | null
          provider_subscription_id?: string | null
          status: string
          updated_at?: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_slug?: string
          product_id?: string | null
          provider?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          key: string
          source: string
          updated_at: string
          user_id: string
          value: Json
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          source?: string
          updated_at?: string
          user_id: string
          value: Json
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          source?: string
          updated_at?: string
          user_id?: string
          value?: Json
          verified_at?: string | null
        }
        Relationships: []
      }
      workout_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          metadata: Json
          percentage: number
          started_at: string
          updated_at: string
          user_id: string
          watch_seconds: number
          workout_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          percentage?: number
          started_at?: string
          updated_at?: string
          user_id: string
          watch_seconds?: number
          workout_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          percentage?: number
          started_at?: string
          updated_at?: string
          user_id?: string
          watch_seconds?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_progress_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          active: boolean
          code: string
          created_at: string
          duration_seconds: number | null
          focus: string | null
          id: string
          metadata: Json
          number: number
          program_id: string
          provider: string
          provider_asset_id: string
          slug: string
          title: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          duration_seconds?: number | null
          focus?: string | null
          id?: string
          metadata?: Json
          number: number
          program_id: string
          provider: string
          provider_asset_id: string
          slug: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          duration_seconds?: number | null
          focus?: string | null
          id?: string
          metadata?: Json
          number?: number
          program_id?: string
          provider?: string
          provider_asset_id?: string
          slug?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
