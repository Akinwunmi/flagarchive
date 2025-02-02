export interface FilterOption<T = string> {
  active: boolean;
  value: T;
  callback?: () => void;
  icon?: string;
  label?: string;
}
