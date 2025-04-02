export interface Item {
  label: string;
  icon?: string;
}

export interface MenuItem extends Item {
  path: string[] | string;
  active?: boolean;
}
