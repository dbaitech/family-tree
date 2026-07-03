export interface Person {
  person_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string | null;
  maiden_name: string | null;
  nickname: string | null;
  gender: "Male" | "Female" | "Unknown";
  birth_date: string | null;
  birth_location: string | null;
  death_date: string | null;
  death_location: string | null;
  bio: string | null;
}

export interface Family {
  family_id: number;
  partner_1_id: number;
  partner_2_id: number | null;
  marriage_date: string | null;
  marriage_location: string | null;
  divorce_date: string | null;
}

export interface ChildRelationship {
  relationship_id: number;
  family_id: number;
  child_id: number;
  lineage_type: string;
}

export interface BalkanNode {
  id: number;
  name: string;
  fid?: number;
  mid?: number;
  pids?: number[];
  gender: string;
}
