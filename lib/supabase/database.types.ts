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
      body_circumference_entries: {
        Row: {
          arm_left_cm: number | null
          arm_right_cm: number | null
          calf_left_cm: number | null
          calf_right_cm: number | null
          chest_cm: number | null
          created_at: string
          hip_cm: number | null
          id: string
          measured_at: string
          measurement_method: string
          measurement_protocol: string | null
          metadata: Json
          neck_cm: number | null
          notes: string | null
          thigh_left_cm: number | null
          thigh_right_cm: number | null
          updated_at: string
          user_id: string
          waist_cm: number | null
        }
        Insert: {
          arm_left_cm?: number | null
          arm_right_cm?: number | null
          calf_left_cm?: number | null
          calf_right_cm?: number | null
          chest_cm?: number | null
          created_at?: string
          hip_cm?: number | null
          id?: string
          measured_at?: string
          measurement_method?: string
          measurement_protocol?: string | null
          metadata?: Json
          neck_cm?: number | null
          notes?: string | null
          thigh_left_cm?: number | null
          thigh_right_cm?: number | null
          updated_at?: string
          user_id: string
          waist_cm?: number | null
        }
        Update: {
          arm_left_cm?: number | null
          arm_right_cm?: number | null
          calf_left_cm?: number | null
          calf_right_cm?: number | null
          chest_cm?: number | null
          created_at?: string
          hip_cm?: number | null
          id?: string
          measured_at?: string
          measurement_method?: string
          measurement_protocol?: string | null
          metadata?: Json
          neck_cm?: number | null
          notes?: string | null
          thigh_left_cm?: number | null
          thigh_right_cm?: number | null
          updated_at?: string
          user_id?: string
          waist_cm?: number | null
        }
        Relationships: []
      }
      body_metric_entries: {
        Row: {
          body_fat_pct: number | null
          bone_mass_kg: number | null
          created_at: string
          device_name: string | null
          fat_mass_kg: number | null
          hydration_pct: number | null
          id: string
          lean_mass_kg: number | null
          measured_at: string
          measurement_method: string
          measurement_quality: string
          muscle_mass_kg: number | null
          notes: string | null
          raw_metrics: Json
          source_external_id: string | null
          source_provider: string | null
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          body_fat_pct?: number | null
          bone_mass_kg?: number | null
          created_at?: string
          device_name?: string | null
          fat_mass_kg?: number | null
          hydration_pct?: number | null
          id?: string
          lean_mass_kg?: number | null
          measured_at?: string
          measurement_method?: string
          measurement_quality?: string
          muscle_mass_kg?: number | null
          notes?: string | null
          raw_metrics?: Json
          source_external_id?: string | null
          source_provider?: string | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          body_fat_pct?: number | null
          bone_mass_kg?: number | null
          created_at?: string
          device_name?: string | null
          fat_mass_kg?: number | null
          hydration_pct?: number | null
          id?: string
          lean_mass_kg?: number | null
          measured_at?: string
          measurement_method?: string
          measurement_quality?: string
          muscle_mass_kg?: number | null
          notes?: string | null
          raw_metrics?: Json
          source_external_id?: string | null
          source_provider?: string | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      content_collection_items: {
        Row: {
          collection_id: string
          content_id: string
          created_at: string
          is_required: boolean
          metadata: Json
          position: number
          section_title: string | null
        }
        Insert: {
          collection_id: string
          content_id: string
          created_at?: string
          is_required?: boolean
          metadata?: Json
          position?: number
          section_title?: string | null
        }
        Update: {
          collection_id?: string
          content_id?: string
          created_at?: string
          is_required?: boolean
          metadata?: Json
          position?: number
          section_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "content_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_collection_items_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      content_collection_product_access: {
        Row: {
          collection_id: string
          created_at: string
          product_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          product_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_collection_product_access_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "content_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_collection_product_access_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      content_collections: {
        Row: {
          access_policy: string
          collection_type: string
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json
          slug: string
          sort_priority: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          access_policy?: string
          collection_type: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          slug: string
          sort_priority?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          access_policy?: string
          collection_type?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          slug?: string
          sort_priority?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_items: {
        Row: {
          access_policy: string
          ai_index_policy: string
          audience: string[]
          content_type: string
          cover_url: string | null
          created_at: string
          difficulty: string | null
          downloadable: boolean
          estimated_duration_seconds: number | null
          featured: boolean
          id: string
          language: string
          metadata: Json
          published_at: string | null
          reading_time_minutes: number | null
          slug: string
          sort_priority: number
          status: string
          subtitle: string | null
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
          audience?: string[]
          content_type: string
          cover_url?: string | null
          created_at?: string
          difficulty?: string | null
          downloadable?: boolean
          estimated_duration_seconds?: number | null
          featured?: boolean
          id?: string
          language?: string
          metadata?: Json
          published_at?: string | null
          reading_time_minutes?: number | null
          slug: string
          sort_priority?: number
          status?: string
          subtitle?: string | null
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
          audience?: string[]
          content_type?: string
          cover_url?: string | null
          created_at?: string
          difficulty?: string | null
          downloadable?: boolean
          estimated_duration_seconds?: number | null
          featured?: boolean
          id?: string
          language?: string
          metadata?: Json
          published_at?: string | null
          reading_time_minutes?: number | null
          slug?: string
          sort_priority?: number
          status?: string
          subtitle?: string | null
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
      content_relationships: {
        Row: {
          created_at: string
          metadata: Json
          position: number
          relation_type: string
          source_content_id: string
          target_content_id: string
        }
        Insert: {
          created_at?: string
          metadata?: Json
          position?: number
          relation_type: string
          source_content_id: string
          target_content_id: string
        }
        Update: {
          created_at?: string
          metadata?: Json
          position?: number
          relation_type?: string
          source_content_id?: string
          target_content_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_relationships_source_content_id_fkey"
            columns: ["source_content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_relationships_target_content_id_fkey"
            columns: ["target_content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      content_reviews: {
        Row: {
          content_id: string
          created_at: string
          evidence_urls: string[]
          expires_at: string | null
          id: string
          metadata: Json
          notes: string | null
          review_type: string
          review_version: number
          reviewed_at: string | null
          reviewer_name: string | null
          reviewer_role: string | null
          status: string
        }
        Insert: {
          content_id: string
          created_at?: string
          evidence_urls?: string[]
          expires_at?: string | null
          id?: string
          metadata?: Json
          notes?: string | null
          review_type: string
          review_version?: number
          reviewed_at?: string | null
          reviewer_name?: string | null
          reviewer_role?: string | null
          status?: string
        }
        Update: {
          content_id?: string
          created_at?: string
          evidence_urls?: string[]
          expires_at?: string | null
          id?: string
          metadata?: Json
          notes?: string | null
          review_type?: string
          review_version?: number
          reviewed_at?: string | null
          reviewer_name?: string | null
          reviewer_role?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_reviews_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      content_rights: {
        Row: {
          ai_derivative_generation_allowed: boolean | null
          ai_retrieval_allowed: boolean | null
          attribution_required: boolean | null
          attribution_text: string | null
          commercial_use_allowed: boolean | null
          content_id: string
          copyright_holder: string | null
          created_at: string
          derivatives_allowed: boolean | null
          license_document_url: string | null
          license_name: string | null
          license_url: string | null
          metadata: Json
          notes: string | null
          redistribution_allowed: boolean | null
          rights_basis: string
          updated_at: string
          verification_status: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ai_derivative_generation_allowed?: boolean | null
          ai_retrieval_allowed?: boolean | null
          attribution_required?: boolean | null
          attribution_text?: string | null
          commercial_use_allowed?: boolean | null
          content_id: string
          copyright_holder?: string | null
          created_at?: string
          derivatives_allowed?: boolean | null
          license_document_url?: string | null
          license_name?: string | null
          license_url?: string | null
          metadata?: Json
          notes?: string | null
          redistribution_allowed?: boolean | null
          rights_basis?: string
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ai_derivative_generation_allowed?: boolean | null
          ai_retrieval_allowed?: boolean | null
          attribution_required?: boolean | null
          attribution_text?: string | null
          commercial_use_allowed?: boolean | null
          content_id?: string
          copyright_holder?: string | null
          created_at?: string
          derivatives_allowed?: boolean | null
          license_document_url?: string | null
          license_name?: string | null
          license_url?: string | null
          metadata?: Json
          notes?: string | null
          redistribution_allowed?: boolean | null
          rights_basis?: string
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_rights_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: true
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      content_sources: {
        Row: {
          checksum_sha256: string | null
          content_id: string
          created_at: string
          external_id: string | null
          extraction_status: string
          id: string
          last_scanned_at: string | null
          media_url: string | null
          metadata: Json
          mime_type: string | null
          original_title: string | null
          provider: string
          size_bytes: number | null
          source_collection_id: string | null
          source_path: string | null
          source_url: string | null
          transcript_status: string
          transcript_text: string | null
          updated_at: string
        }
        Insert: {
          checksum_sha256?: string | null
          content_id: string
          created_at?: string
          external_id?: string | null
          extraction_status?: string
          id?: string
          last_scanned_at?: string | null
          media_url?: string | null
          metadata?: Json
          mime_type?: string | null
          original_title?: string | null
          provider: string
          size_bytes?: number | null
          source_collection_id?: string | null
          source_path?: string | null
          source_url?: string | null
          transcript_status?: string
          transcript_text?: string | null
          updated_at?: string
        }
        Update: {
          checksum_sha256?: string | null
          content_id?: string
          created_at?: string
          external_id?: string | null
          extraction_status?: string
          id?: string
          last_scanned_at?: string | null
          media_url?: string | null
          metadata?: Json
          mime_type?: string | null
          original_title?: string | null
          provider?: string
          size_bytes?: number | null
          source_collection_id?: string | null
          source_path?: string | null
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
          {
            foreignKeyName: "content_sources_source_collection_id_fkey"
            columns: ["source_collection_id"]
            isOneToOne: false
            referencedRelation: "source_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      content_taxonomy: {
        Row: {
          content_id: string
          created_at: string
          role: string
          term_id: string
          weight: number
        }
        Insert: {
          content_id: string
          created_at?: string
          role?: string
          term_id: string
          weight?: number
        }
        Update: {
          content_id?: string
          created_at?: string
          role?: string
          term_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_taxonomy_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_taxonomy_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "taxonomy_terms"
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
      exercise_content_links: {
        Row: {
          content_id: string
          created_at: string
          exercise_id: string
          position: number
          relation_type: string
        }
        Insert: {
          content_id: string
          created_at?: string
          exercise_id: string
          position?: number
          relation_type: string
        }
        Update: {
          content_id?: string
          created_at?: string
          exercise_id?: string
          position?: number
          relation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_content_links_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_content_links_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_relations: {
        Row: {
          created_at: string
          exercise_id: string
          metadata: Json
          rank: number
          related_exercise_id: string
          relation_type: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          metadata?: Json
          rank?: number
          related_exercise_id: string
          relation_type: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          metadata?: Json
          rank?: number
          related_exercise_id?: string
          relation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_relations_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_relations_related_exercise_id_fkey"
            columns: ["related_exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          aliases: string[]
          body_regions: string[]
          canonical_name: string | null
          coaching_cues: Json
          common_mistakes: Json
          created_at: string
          difficulty: string
          equipment: string[]
          exercise_type: string
          id: string
          instructions: Json
          locale: string
          metadata: Json
          movement_patterns: string[]
          name: string
          primary_muscles: string[]
          review_status: string
          safety_notes: Json
          secondary_muscles: string[]
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          aliases?: string[]
          body_regions?: string[]
          canonical_name?: string | null
          coaching_cues?: Json
          common_mistakes?: Json
          created_at?: string
          difficulty?: string
          equipment?: string[]
          exercise_type?: string
          id?: string
          instructions?: Json
          locale?: string
          metadata?: Json
          movement_patterns?: string[]
          name: string
          primary_muscles?: string[]
          review_status?: string
          safety_notes?: Json
          secondary_muscles?: string[]
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          aliases?: string[]
          body_regions?: string[]
          canonical_name?: string | null
          coaching_cues?: Json
          common_mistakes?: Json
          created_at?: string
          difficulty?: string
          equipment?: string[]
          exercise_type?: string
          id?: string
          instructions?: Json
          locale?: string
          metadata?: Json
          movement_patterns?: string[]
          name?: string
          primary_muscles?: string[]
          review_status?: string
          safety_notes?: Json
          secondary_muscles?: string[]
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      food_items: {
        Row: {
          allergens: string[]
          brand: string | null
          created_at: string
          default_serving_quantity: number | null
          default_serving_unit: string | null
          food_group: string | null
          id: string
          locale: string
          metadata: Json
          name: string
          slug: string
          source_external_id: string | null
          source_provider: string | null
          status: string
          updated_at: string
        }
        Insert: {
          allergens?: string[]
          brand?: string | null
          created_at?: string
          default_serving_quantity?: number | null
          default_serving_unit?: string | null
          food_group?: string | null
          id?: string
          locale?: string
          metadata?: Json
          name: string
          slug: string
          source_external_id?: string | null
          source_provider?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          allergens?: string[]
          brand?: string | null
          created_at?: string
          default_serving_quantity?: number | null
          default_serving_unit?: string | null
          food_group?: string | null
          id?: string
          locale?: string
          metadata?: Json
          name?: string
          slug?: string
          source_external_id?: string | null
          source_provider?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      food_nutrients: {
        Row: {
          amount_per_100g: number | null
          created_at: string
          food_id: string
          metadata: Json
          nutrient_code: string
          nutrient_name: string
          source_version: string | null
          unit: string
        }
        Insert: {
          amount_per_100g?: number | null
          created_at?: string
          food_id: string
          metadata?: Json
          nutrient_code: string
          nutrient_name: string
          source_version?: string | null
          unit: string
        }
        Update: {
          amount_per_100g?: number | null
          created_at?: string
          food_id?: string
          metadata?: Json
          nutrient_code?: string
          nutrient_name?: string
          source_version?: string | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_nutrients_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_chunks: {
        Row: {
          body: string
          created_at: string
          document_id: string
          heading: string | null
          id: string
          locator: Json
          metadata: Json
          ordinal: number
          token_count: number | null
        }
        Insert: {
          body: string
          created_at?: string
          document_id: string
          heading?: string | null
          id?: string
          locator?: Json
          metadata?: Json
          ordinal: number
          token_count?: number | null
        }
        Update: {
          body?: string
          created_at?: string
          document_id?: string
          heading?: string | null
          id?: string
          locator?: Json
          metadata?: Json
          ordinal?: number
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "knowledge_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_documents: {
        Row: {
          char_count: number | null
          content_id: string
          created_at: string
          extraction_method: string | null
          id: string
          language: string
          metadata: Json
          source_checksum: string | null
          source_id: string | null
          status: string
          token_estimate: number | null
          updated_at: string
          version: number
        }
        Insert: {
          char_count?: number | null
          content_id: string
          created_at?: string
          extraction_method?: string | null
          id?: string
          language?: string
          metadata?: Json
          source_checksum?: string | null
          source_id?: string | null
          status?: string
          token_estimate?: number | null
          updated_at?: string
          version?: number
        }
        Update: {
          char_count?: number | null
          content_id?: string
          created_at?: string
          extraction_method?: string | null
          id?: string
          language?: string
          metadata?: Json
          source_checksum?: string | null
          source_id?: string | null
          status?: string
          token_estimate?: number | null
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_documents_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_documents_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "content_sources"
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
      progress_goals: {
        Row: {
          created_at: string
          goal_type: string
          id: string
          metadata: Json
          notes: string | null
          start_date: string
          start_value: number | null
          status: string
          target_date: string | null
          target_direction: string | null
          target_value: number | null
          title: string
          unit: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal_type: string
          id?: string
          metadata?: Json
          notes?: string | null
          start_date?: string
          start_value?: number | null
          status?: string
          target_date?: string | null
          target_direction?: string | null
          target_value?: number | null
          title: string
          unit?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal_type?: string
          id?: string
          metadata?: Json
          notes?: string | null
          start_date?: string
          start_value?: number | null
          status?: string
          target_date?: string | null
          target_direction?: string | null
          target_value?: number | null
          title?: string
          unit?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progress_photo_sets: {
        Row: {
          ai_analysis_allowed: boolean
          captured_on: string
          created_at: string
          id: string
          label: string | null
          metadata: Json
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_analysis_allowed?: boolean
          captured_on?: string
          created_at?: string
          id?: string
          label?: string | null
          metadata?: Json
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_analysis_allowed?: boolean
          captured_on?: string
          created_at?: string
          id?: string
          label?: string | null
          metadata?: Json
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progress_photos: {
        Row: {
          angle: string
          captured_at: string
          created_at: string
          height_px: number | null
          id: string
          metadata: Json
          notes: string | null
          object_path: string
          photo_set_id: string
          user_id: string
          width_px: number | null
        }
        Insert: {
          angle: string
          captured_at?: string
          created_at?: string
          height_px?: number | null
          id?: string
          metadata?: Json
          notes?: string | null
          object_path: string
          photo_set_id: string
          user_id: string
          width_px?: number | null
        }
        Update: {
          angle?: string
          captured_at?: string
          created_at?: string
          height_px?: number | null
          id?: string
          metadata?: Json
          notes?: string | null
          object_path?: string
          photo_set_id?: string
          user_id?: string
          width_px?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_photos_photo_set_id_user_id_fkey"
            columns: ["photo_set_id", "user_id"]
            isOneToOne: false
            referencedRelation: "progress_photo_sets"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      progress_preferences: {
        Row: {
          created_at: string
          height_cm: number | null
          photo_ai_analysis_opt_in: boolean
          preferences: Json
          progress_photo_frequency: string
          trend_window_days: number
          unit_system: string
          updated_at: string
          user_id: string
          weekly_checkin_weekday: number
          weigh_in_frequency: string
        }
        Insert: {
          created_at?: string
          height_cm?: number | null
          photo_ai_analysis_opt_in?: boolean
          preferences?: Json
          progress_photo_frequency?: string
          trend_window_days?: number
          unit_system?: string
          updated_at?: string
          user_id: string
          weekly_checkin_weekday?: number
          weigh_in_frequency?: string
        }
        Update: {
          created_at?: string
          height_cm?: number | null
          photo_ai_analysis_opt_in?: boolean
          preferences?: Json
          progress_photo_frequency?: string
          trend_window_days?: number
          unit_system?: string
          updated_at?: string
          user_id?: string
          weekly_checkin_weekday?: number
          weigh_in_frequency?: string
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          food_id: string | null
          id: string
          metadata: Json
          optional: boolean
          position: number
          preparation: string | null
          quantity: number | null
          raw_name: string
          recipe_content_id: string
          unit: string | null
        }
        Insert: {
          food_id?: string | null
          id?: string
          metadata?: Json
          optional?: boolean
          position?: number
          preparation?: string | null
          quantity?: number | null
          raw_name: string
          recipe_content_id: string
          unit?: string | null
        }
        Update: {
          food_id?: string | null
          id?: string
          metadata?: Json
          optional?: boolean
          position?: number
          preparation?: string | null
          quantity?: number | null
          raw_name?: string
          recipe_content_id?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_content_id_fkey"
            columns: ["recipe_content_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["content_id"]
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
      source_collections: {
        Row: {
          ai_policy_default: string
          created_at: string
          default_rights_basis: string
          domain_tags: string[]
          external_id: string | null
          id: string
          ingestion_policy: string
          last_scanned_at: string | null
          metadata: Json
          name: string
          parent_id: string | null
          provider: string
          relevance_status: string
          rights_verification_status: string
          slug: string
          source_kind: string
          source_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_policy_default?: string
          created_at?: string
          default_rights_basis?: string
          domain_tags?: string[]
          external_id?: string | null
          id?: string
          ingestion_policy?: string
          last_scanned_at?: string | null
          metadata?: Json
          name: string
          parent_id?: string | null
          provider: string
          relevance_status?: string
          rights_verification_status?: string
          slug: string
          source_kind: string
          source_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_policy_default?: string
          created_at?: string
          default_rights_basis?: string
          domain_tags?: string[]
          external_id?: string | null
          id?: string
          ingestion_policy?: string
          last_scanned_at?: string | null
          metadata?: Json
          name?: string
          parent_id?: string | null
          provider?: string
          relevance_status?: string
          rights_verification_status?: string
          slug?: string
          source_kind?: string
          source_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "source_collections_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "source_collections"
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
      taxonomy_terms: {
        Row: {
          active: boolean
          aliases: string[]
          created_at: string
          description: string | null
          id: string
          kind: string
          label: string
          metadata: Json
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          aliases?: string[]
          created_at?: string
          description?: string | null
          id?: string
          kind: string
          label: string
          metadata?: Json
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          aliases?: string[]
          created_at?: string
          description?: string | null
          id?: string
          kind?: string
          label?: string
          metadata?: Json
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "taxonomy_terms_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "taxonomy_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_content_state: {
        Row: {
          completed_at: string | null
          content_id: string
          last_opened_at: string | null
          last_page: number | null
          last_position_seconds: number | null
          metadata: Json
          progress_percent: number
          saved_at: string | null
          started_at: string | null
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          content_id: string
          last_opened_at?: string | null
          last_page?: number | null
          last_position_seconds?: number | null
          metadata?: Json
          progress_percent?: number
          saved_at?: string | null
          started_at?: string | null
          state?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          content_id?: string
          last_opened_at?: string | null
          last_page?: number | null
          last_position_seconds?: number | null
          metadata?: Json
          progress_percent?: number
          saved_at?: string | null
          started_at?: string | null
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_content_state_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
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
      weekly_checkins: {
        Row: {
          avg_sleep_hours: number | null
          created_at: string
          energy_score: number | null
          id: string
          metadata: Json
          motivation_score: number | null
          notes: string | null
          nutrition_consistency_score: number | null
          sleep_quality_score: number | null
          soreness_score: number | null
          stress_score: number | null
          training_sessions_completed: number | null
          training_sessions_planned: number | null
          updated_at: string
          user_id: string
          week_start: string
        }
        Insert: {
          avg_sleep_hours?: number | null
          created_at?: string
          energy_score?: number | null
          id?: string
          metadata?: Json
          motivation_score?: number | null
          notes?: string | null
          nutrition_consistency_score?: number | null
          sleep_quality_score?: number | null
          soreness_score?: number | null
          stress_score?: number | null
          training_sessions_completed?: number | null
          training_sessions_planned?: number | null
          updated_at?: string
          user_id: string
          week_start: string
        }
        Update: {
          avg_sleep_hours?: number | null
          created_at?: string
          energy_score?: number | null
          id?: string
          metadata?: Json
          motivation_score?: number | null
          notes?: string | null
          nutrition_consistency_score?: number | null
          sleep_quality_score?: number | null
          soreness_score?: number | null
          stress_score?: number | null
          training_sessions_completed?: number | null
          training_sessions_planned?: number | null
          updated_at?: string
          user_id?: string
          week_start?: string
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
