import { FlagCategory } from '@flagarchive/advanced-search';

export interface Entity {
  id: number;
  name: string;
  type: EntityType;
  unique_id: string;
  alt_parent_id?: string;
  flags?: EntityFlag[];
  has_no_children?: boolean;
  hoisted_right?: boolean;
  parent_ids?: string[];
  ranges?: EntityRange[];
  sources?: EntitySource[];
}

export interface EntityFlag {
  categories: FlagCategory[];
  url: string;
  colours?: EntityFlagColour[];
  ranges?: EntityFlagRange[];
  ratio?: string;
  reverse_url?: string;
}

export enum EntityType {
  AutonomousCity = 'autonomous-city',
  AutonomousCommunity = 'autonomous-community',
  AutonomousIsland = 'autonomous-island',
  AutonomousRegion = 'autonomous-region',
  AutonomousTerritory = 'autonomous-territory',
  Canton = 'canton',
  CapitalDistrict = 'capital-district',
  City = 'city',
  CityState = 'city-state',
  Commune = 'commune',
  Community = 'community',
  ConstituentCountry = 'constituent-country',
  ConstituentPart = 'constituent-part',
  ConstitutionalMonarchy = 'constitutional-monarchy',
  Continent = 'continent',
  Country = 'country',
  Department = 'department',
  DependentTerritory = 'dependent-territory',
  District = 'district',
  Empire = 'empire',
  EthnicGroup = 'ethnic-group',
  ExternalTerritory = 'external-territory',
  FederalDistrict = 'federal-district',
  IntergovernmentalOrganization = 'intergovernmental-organization',
  IslandState = 'island-state',
  Municipality = 'municipality',
  NonGovernmentalOrganization = 'non-governmental-organization',
  Organization = 'organization',
  OverseasCollectivity = 'overseas-collectivity',
  OverseasDepartment = 'overseas-department',
  OverseasStatePrivateProperty = 'overseas-state-private-property',
  OverseasTerritory = 'overseas-territory',
  Parish = 'parish',
  Province = 'province',
  RegionalState = 'regional-state',
  RuralDistrict = 'rural-district',
  SpecialAdministrativeDivision = 'special-administrative-division',
  SpecialAdministrativeRegion = 'special-administrative-region',
  SpecialMunicipality = 'special-municipality',
  SpecialTerritory = 'special-territory',
  SpecializedAgency = 'specialized-agency',
  State = 'state',
  Town = 'town',
  UnincorporatedTerritory = 'unincorporated-territory',
  UrbanDistrict = 'urban-district',
  Village = 'village',
}

export interface EntityTypeItem {
  checked: boolean;
  label: EntityType;
}

interface EntityStartEnd {
  start: number;
  end?: number;
}

export interface EntityFlagColour {
  flag_id: number | null;
  id: number;
  name: string;
  hexadecimal: string;
  pms?: string | null;
  secondary?: boolean;
}

export interface EntityFlagRange extends EntityStartEnd {
  categories?: FlagCategory[];
  ratio?: string;
}

export interface EntityRange extends EntityStartEnd {
  alt_parent_id?: string;
  parent_ids?: string[];
  name?: string;
  type?: EntityType;
}

export interface EntitySource {
  name: string;
  url: string;
}
