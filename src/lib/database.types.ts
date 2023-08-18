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
          accepted_invite: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          role: number
        }
        Insert: {
          accepted_invite?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          role?: number
        }
        Update: {
          accepted_invite?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: number
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string
          id: number
          last_updated: string | null
          medium: number
          name: string
          source: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          last_updated?: string | null
          medium: number
          name: string
          source: number
          url: string
        }
        Update: {
          created_at?: string
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
      requests: {
        Row: {
          accepted: boolean
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
        }
        Insert: {
          accepted?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
        }
        Update: {
          accepted?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
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