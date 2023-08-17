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
      accounts: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: number
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: number
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string
          generated_url: string
          id: number
          last_updated: string | null
          medium: number
          name: string
          source: number
          url: string
        }
        Insert: {
          created_at?: string
          generated_url: string
          id?: number
          last_updated?: string | null
          medium: number
          name: string
          source: number
          url: string
        }
        Update: {
          created_at?: string
          generated_url?: string
          id?: number
          last_updated?: string | null
          medium?: number
          name?: string
          source?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_medium_fkey"
            columns: ["medium"]
            referencedRelation: "mediums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_source_fkey"
            columns: ["source"]
            referencedRelation: "sources"
            referencedColumns: ["id"]
          }
        ]
      }
      mediums: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
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