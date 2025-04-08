import { FlagCategory } from '@flagarchive/advanced-search';

export interface Entity {
  baseId: string;
  id: string;
  name: string;
  type: EntityType;
  altId?: string;
  altParentId?: string;
  flags?: Record<FlagCategory, EntityFlag>;
  hasNoChildren?: boolean;
  hoistedRight?: boolean;
  parentId?: string;
  parentIds?: string[];
  ranges?: EntityRange[];
}

export interface EntityFlag {
  ranges?: EntityFlagRange[];
  reverseUrl?: string;
  url: string;
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
  Community = 'community',
  ConstituentCountry = 'constituent-country',
  ConstituentPart = 'constituent-part',
  ConstitutionalMonarchy = 'constitutional-monarchy',
  Continent = 'continent',
  Country = 'country',
  Department = 'department',
  DependentTerritory = 'dependent-territory',
  District = 'district',
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

export interface EntityFlagRange extends EntityStartEnd {
  reverseUrl?: string;
  url?: string;
}

export interface EntityRange extends EntityStartEnd {
  altParentId?: string;
  parentId?: string;
  name?: string;
  type?: EntityType;
}

export type EntityFullRange = EntityFlagRange & EntityRange;

export type EntityWithoutBaseId = Omit<Entity, 'baseId'>;
