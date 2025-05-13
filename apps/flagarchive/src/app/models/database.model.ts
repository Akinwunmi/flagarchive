import { FlagCategory } from '@flagarchive/advanced-search';
import { EntityType } from '@flagarchive/entities';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

interface DbTable<T, J = []> {
  Row: T;
  Insert: T;
  Update: T;
  Relationships: J;
}

interface DbRawEntity {
  alt_parent_id?: string | null;
  has_no_children?: boolean | null;
  hoisted_right?: boolean | null;
  id: number;
  inserted_at: string;
  name: string;
  parent_ids?: string[] | null;
  type: EntityType;
  unique_id: string;
  updated_at?: string;
}

interface DbRawEntityFlag {
  category: FlagCategory | null;
  entity_id: number | null;
  id: number;
  reverse_url?: string | null;
  url: string | null;
}

export interface DbEntityFlag extends DbRawEntityFlag {
  entity_flag_ranges: DbEntityFlagRange[] | null;
}

export interface DbEntity extends DbRawEntity {
  entity_flags: DbEntityFlag[] | null;
  entity_ranges: DbEntityRange[] | null;
  sources: DbEntitySource[] | null;
}

interface DbEntityFlagForeignKey {
  foreignKeyName: 'entity_flags_entity_id_fkey';
  columns: ['entity_id'];
  isOneToOne: false;
  referencedRelation: 'entities';
  referencedColumns: ['id'];
}

export interface DbEntityFlagRange {
  category_id: number | null;
  end?: number | null;
  id: number;
  reverse_url?: string | null;
  start: number;
  url?: string | null;
}

interface DbEntityFlagRangeForeignKey {
  foreignKeyName: 'entity_flag_ranges_flag_id_fkey';
  columns: ['category_id'];
  isOneToOne: false;
  referencedRelation: 'entity_flags';
  referencedColumns: ['id'];
}

export interface DbEntityRange {
  alt_parent_id: string | null;
  end: number | null;
  entity_id: number | null;
  id: number;
  name: string | null;
  parent_ids: string[] | null;
  start: number;
  type: string | null;
}

interface DbEntityRangeForeignKey {
  foreignKeyName: 'entity_ranges_entity_id_fkey';
  columns: ['entity_id'];
  isOneToOne: false;
  referencedRelation: 'entities';
  referencedColumns: ['id'];
}

export interface DbEntitySource {
  entity_id: number | null;
  id: number;
  name: string | null;
  url: string | null;
}

interface DbEntitySourceForeignKey {
  foreignKeyName: 'entity_sources_entity_id_fkey';
  columns: ['entity_id'];
  isOneToOne: false;
  referencedRelation: 'entities';
  referencedColumns: ['id'];
}

export interface DbFavorite {
  created_at: string;
  favorites: Json | null;
  id: string;
}

export interface DbProfile {
  avatar_url: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  updated_at: string | null;
}

export interface DbWorldEvent {
  end: string | null;
  name: string | null;
  start: string;
  uuid: string;
}

interface Tables {
  entities: DbTable<DbRawEntity>;
  entity_flags: DbTable<DbRawEntityFlag, [DbEntityFlagForeignKey]>;
  entity_flag_ranges: DbTable<DbEntityFlagRange, [DbEntityFlagRangeForeignKey]>;
  entity_ranges: DbTable<DbEntityRange, [DbEntityRangeForeignKey]>;
  entity_sources: DbTable<DbEntitySource, [DbEntitySourceForeignKey]>;
  favorites: DbTable<DbFavorite>;
  profiles: DbTable<DbProfile>;
  'world-events': DbTable<DbWorldEvent>;
}

export interface Database {
  public: {
    Tables: Tables;
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
