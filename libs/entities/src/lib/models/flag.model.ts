export interface FlagImage {
  src: string;
  alt: string;
  hoistedRight?: boolean;
  isReversed?: boolean;
  placeholder?: boolean;
}

export interface Flag extends Omit<FlagImage, 'alt' | 'src'> {
  name: string;
  alt_parent_id?: string;
  end?: number;
  reverse_src?: string;
  src?: string;
  start?: number;
}
