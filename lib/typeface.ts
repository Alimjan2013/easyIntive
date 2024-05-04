export interface CodeList {
    invitation_code_id: number;
    code: string;
    expire_time: string;
    status: number;
    generate_limit: number;
    generate_count: number;
    generate_limit_per_day: number;
    used: boolean;
    generate_count_today: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }