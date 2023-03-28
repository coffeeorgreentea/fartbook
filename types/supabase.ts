export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_type: string | null
          country: string | null
          created_at: string | null
          credits: string | null
          dob: string | null
          first_name: string | null
          id: string
          image_defaults: string
          language: string | null
          last_name: string | null
          onboarding: boolean
          onboarding_step: number | null
          presets: string
          profile: string | null
          theme: string
          timezone: string
        }
        Insert: {
          account_type?: string | null
          country?: string | null
          created_at?: string | null
          credits?: string | null
          dob?: string | null
          first_name?: string | null
          id: string
          image_defaults: string
          language?: string | null
          last_name?: string | null
          onboarding?: boolean
          onboarding_step?: number | null
          presets: string
          profile?: string | null
          theme?: string
          timezone?: string
        }
        Update: {
          account_type?: string | null
          country?: string | null
          created_at?: string | null
          credits?: string | null
          dob?: string | null
          first_name?: string | null
          id?: string
          image_defaults?: string
          language?: string | null
          last_name?: string | null
          onboarding?: boolean
          onboarding_step?: number | null
          presets?: string
          profile?: string | null
          theme?: string
          timezone?: string
        }
      }
      credits: {
        Row: {
          daily: number
          id: string
          paid: number
        }
        Insert: {
          daily?: number
          id: string
          paid?: number
        }
        Update: {
          daily?: number
          id?: string
          paid?: number
        }
      }
      generations: {
        Row: {
          call_id: string | null
          cost: number | null
          created_at: string
          favorite: boolean
          finished_at: string | null
          id: string | null
          inputs: Json | null
          model: string | null
          outputs: Json[] | null
          paths: string[]
          signed_at: string
          status: string | null
          tid: string
        }
        Insert: {
          call_id?: string | null
          cost?: number | null
          created_at?: string
          favorite?: boolean
          finished_at?: string | null
          id?: string | null
          inputs?: Json | null
          model?: string | null
          outputs?: Json[] | null
          paths?: string[]
          signed_at?: string
          status?: string | null
          tid?: string
        }
        Update: {
          call_id?: string | null
          cost?: number | null
          created_at?: string
          favorite?: boolean
          finished_at?: string | null
          id?: string | null
          inputs?: Json | null
          model?: string | null
          outputs?: Json[] | null
          paths?: string[]
          signed_at?: string
          status?: string | null
          tid?: string
        }
      }
      image_defaults: {
        Row: {
          batch_size: number
          cfg: number
          height: number
          id: string
          model: string
          negative_prompt: string
          pipeline: string
          prompt: string
          safety_checker: boolean
          scheduler: string
          seed: number
          steps: number
          width: number
        }
        Insert: {
          batch_size?: number
          cfg?: number
          height?: number
          id: string
          model?: string
          negative_prompt?: string
          pipeline?: string
          prompt?: string
          safety_checker?: boolean
          scheduler?: string
          seed?: number
          steps?: number
          width?: number
        }
        Update: {
          batch_size?: number
          cfg?: number
          height?: number
          id?: string
          model?: string
          negative_prompt?: string
          pipeline?: string
          prompt?: string
          safety_checker?: boolean
          scheduler?: string
          seed?: number
          steps?: number
          width?: number
        }
      }
      image_outputs: {
        Row: {
          batch_size: number
          cfg: number
          created_at: string | null
          error_message: string | null
          finished_at: string | null
          height: number
          id: string
          model: string
          negative_prompt: string
          oid: string
          outputs_paths: string[] | null
          pipeline: string
          prompt: string
          safety_checker: boolean
          scheduler: string
          seed: number
          signed_at: string | null
          signed_urls: Json[]
          status: string
          steps: number
          width: number
        }
        Insert: {
          batch_size?: number
          cfg?: number
          created_at?: string | null
          error_message?: string | null
          finished_at?: string | null
          height?: number
          id: string
          model?: string
          negative_prompt?: string
          oid?: string
          outputs_paths?: string[] | null
          pipeline?: string
          prompt?: string
          safety_checker?: boolean
          scheduler?: string
          seed?: number
          signed_at?: string | null
          signed_urls?: Json[]
          status?: string
          steps?: number
          width?: number
        }
        Update: {
          batch_size?: number
          cfg?: number
          created_at?: string | null
          error_message?: string | null
          finished_at?: string | null
          height?: number
          id?: string
          model?: string
          negative_prompt?: string
          oid?: string
          outputs_paths?: string[] | null
          pipeline?: string
          prompt?: string
          safety_checker?: boolean
          scheduler?: string
          seed?: number
          signed_at?: string | null
          signed_urls?: Json[]
          status?: string
          steps?: number
          width?: number
        }
      }
      labels: {
        Row: {
          color: string
          created_at: string | null
          icon: string | null
          id: string
          name: string
          owner: string
        }
        Insert: {
          color?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          owner: string
        }
        Update: {
          color?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          owner?: string
        }
      }
      onboarding: {
        Row: {
          id: string
          status: boolean
          step: number
        }
        Insert: {
          id: string
          status?: boolean
          step?: number
        }
        Update: {
          id?: string
          status?: boolean
          step?: number
        }
      }
      presets: {
        Row: {
          color: string
          created_at: string | null
          icon: string | null
          id: string
          name: string
          owner: string
        }
        Insert: {
          color?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          owner: string
        }
        Update: {
          color?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          owner?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string
          followers: string[]
          following: string[]
          id: string
          public: boolean
          updated_at: string | null
          url: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string
          followers?: string[]
          following?: string[]
          id: string
          public?: boolean
          updated_at?: string | null
          url?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string
          followers?: string[]
          following?: string[]
          id?: string
          public?: boolean
          updated_at?: string | null
          url?: string
          username?: string | null
        }
      }
      prompts: {
        Row: {
          data: Json | null
          prompt: string | null
        }
        Insert: {
          data?: Json | null
          prompt?: string | null
        }
        Update: {
          data?: Json | null
          prompt?: string | null
        }
      }
      social: {
        Row: {
          comments: number
          created_at: string | null
          description: string | null
          id: string
          likes: number
          model: string | null
          sid: string
          tid: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          comments?: number
          created_at?: string | null
          description?: string | null
          id: string
          likes?: number
          model?: string | null
          sid?: string
          tid: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          comments?: number
          created_at?: string | null
          description?: string | null
          id?: string
          likes?: number
          model?: string | null
          sid?: string
          tid?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      transactions: {
        Row: {
          cost: number | null
          created_at: string
          id: string | null
          model: string | null
          status: string | null
          tid: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          id?: string | null
          model?: string | null
          status?: string | null
          tid?: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          id?: string | null
          model?: string | null
          status?: string | null
          tid?: string
        }
      }
    }
    Views: {
      random_prompt: {
        Row: {
          data: Json | null
          prompt: string | null
        }
        Insert: {
          data?: Json | null
          prompt?: string | null
        }
        Update: {
          data?: Json | null
          prompt?: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
