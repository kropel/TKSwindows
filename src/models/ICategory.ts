import { IPage } from './IPage';

export interface ICategory {
  category: string;
  url: string;
  subPages: IPage[];
}
