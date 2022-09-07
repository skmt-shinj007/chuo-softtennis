/**
 * メンバーAPI
 */
export interface Position {
  id      : number;
  name_ja : string;
  name_en : string;
  color   : string;
}
export interface Member {
  id             : number;
  name_ja        : string;
  name_en        : string;
  name_kana      : string;
  grade          : number | null;
  graduation_year: number | null;
  category       : string[];
  tags           : string[];
  position       : Position | null;
  from           : string | null;
  alma_mater     : string | null;
  affiliation    : string | null;
  archive        : string | null;
  img: {
    src: string;
    alt: string;
  }
}
export interface Category {
  all    : null;
  players: string;
  staff  : string;
  ob     : string;
  none   : string;
}
export interface MembersParams {
  category?: 'all' | 'players' | 'staff' | 'ob' | 'none';
  grade   ?: null | 1 | 2 | 3 | 4;
}

/**
 * コンポーネント
 */
interface TableBody {
  key  : string;
  value: string | number;
}
export interface Table {
  title?: String;
  body  : TableBody[];
}
