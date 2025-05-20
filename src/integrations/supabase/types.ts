export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login: string | null
          password_hash: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_login?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      awards_recognitions: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string | null
          order_index: number
          organization: string
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image?: string | null
          order_index?: number
          organization: string
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string | null
          order_index?: number
          organization?: string
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          form_type: string
          id: string
          submission_data: Json
          viewed: boolean
        }
        Insert: {
          created_at?: string
          form_type: string
          id?: string
          submission_data: Json
          viewed?: boolean
        }
        Update: {
          created_at?: string
          form_type?: string
          id?: string
          submission_data?: Json
          viewed?: boolean
        }
        Relationships: []
      }
      services: {
        Row: {
          benefits: Json
          case_study_id: string | null
          created_at: string
          features: Json
          full_description: string
          icon: string
          id: string
          short_description: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: Json
          case_study_id?: string | null
          created_at?: string
          features?: Json
          full_description: string
          icon: string
          id?: string
          short_description: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: Json
          case_study_id?: string | null
          created_at?: string
          features?: Json
          full_description?: string
          icon?: string
          id?: string
          short_description?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          updated_at: string
          value: Json
        }
        Insert: {
          id: string
          updated_at?: string
          value: Json
        }
        Update: {
          id?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      strategy_call_bookings: {
        Row: {
          business_type: string
          company: string | null
          created_at: string
          current_marketing: string
          email: string
          goals: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: string
          viewed: boolean
          website: string | null
        }
        Insert: {
          business_type: string
          company?: string | null
          created_at?: string
          current_marketing: string
          email: string
          goals: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string
          viewed?: boolean
          website?: string | null
        }
        Update: {
          business_type?: string
          company?: string | null
          created_at?: string
          current_marketing?: string
          email?: string
          goals?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string
          viewed?: boolean
          website?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string
          id: string
          image: string
          name: string
          order_index: number
          position: string
          updated_at: string
        }
        Insert: {
          bio: string
          created_at?: string
          id?: string
          image: string
          name: string
          order_index?: number
          position: string
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          image?: string
          name?: string
          order_index?: number
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string
          created_at: string
          id: string
          image: string
          industry: string
          name: string
          position: string
          rating: number
          result_summary: string | null
          results: Json
          testimonial: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          id?: string
          image: string
          industry: string
          name: string
          position: string
          rating: number
          result_summary?: string | null
          results?: Json
          testimonial: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          image?: string
          industry?: string
          name?: string
          position?: string
          rating?: number
          result_summary?: string | null
          results?: Json
          testimonial?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      request_password_reset: {
        Args: { email_address: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "administrator" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["administrator", "editor", "viewer"],
    },
  },
} as const
