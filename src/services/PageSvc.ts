import axios from 'axios';

import { TSideBarLink } from '../components/SideBar/SideBar';
import { ICategory } from '../models/ICategory';
import { IPage } from '../models/IPage';
import { pages } from './mocks/pagesMock';
import { contact } from './mocks/contactMock';

export type TCategoryLink = {
  title: string;
  url: string;
};

export class PageSvc {
  static async getGalleryImagesUrl() {
    try {
      const { data } = await axios.get(process.env.REACT_APP_IMAGES_LIST!);
      const images = data!.images.map((img: string) => ({
        url: `${process.env.REACT_APP_PHOTO_URL}/${img}`,
        title: `${img}`,
      }));
      const thumbnails = data!.thumbnails.map((img: string) => ({
        url: `${process.env.REACT_APP_PHOTO_URL}/thumbnails/${img}`,
        title: `${img}`,
      }));
      return { images, thumbnails };
    } catch (error) {
      console.log(error.message);
    }
  }

  static getCategory(categoryUrl: string): ICategory | undefined {
    return pages.find((cat) => cat.url.toLowerCase() === categoryUrl.toLowerCase());
  }
  static getAllCategoryLinks(): TCategoryLink[] {
    return pages.map((page) => ({ title: page.category, url: page.url }));
  }
  static getSubPage(categoryUrl: string, subPageUrl: string): IPage | undefined {
    return PageSvc.getCategory(categoryUrl)?.subPages.find((page) => page.url === subPageUrl);
  }
  static getSideBarLinks(categoryUrl: string): TSideBarLink[] | null {
    const category = PageSvc.getCategory(categoryUrl);
    if (!category) return null;
    const sideBarLinks = category.subPages.reduce<TCategoryLink[]>((linksArray, page) => {
      linksArray.push({
        title: page.title,
        url: `/${categoryUrl}/${page.url}`,
      });
      return linksArray;
    }, []);
    return sideBarLinks[0].title !== '' ? sideBarLinks : null;
  }

  static getContactProps<K extends keyof typeof contact>(propName: K): typeof contact[K] {
    return contact[propName];
  }

  static getContactData(): typeof contact {
    return contact;
  }
}
