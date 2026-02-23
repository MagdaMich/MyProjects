import { Page } from '@playwright/test';
import { SideMenu } from '../components/sideMenu.components';
import { TopNavigationBar } from '../components/topNavigationBar.components';

export class ProductPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenu(this.page);
  topNavigationBar = new TopNavigationBar(this.page);

  searchInput = this.page.locator('.container #search_product');
  searchButton = this.page.locator('.container #submit_search');
  productNameText = 'frozen';
  badProductNameText = 'yellow';

  productTextLabel = this.page.getByText('Frozen Tops For Kids').nth(1);
  productText = 'Frozen Tops For Kids';
  
  noProductsMessage = this.page.getByText('No products are available matching your search');
  noProductsText = 'No products are available matching your search';

  featuresItems = this.page.locator('.features_items');
  productInfoItems = this.page.locator('.features_items .productinfo');

  selectorProduct(productNumber: number): string {
    const selector = `.features_items .productinfo .btn[data-product-id="${productNumber}"]`;
    return selector;
  };
  product1 = this.page.getByText('Add to cart').nth(1);
  viewProduct1 = this.page.locator('.choose > .nav > li > a').first();
  product4 = this.page.locator(this.selectorProduct(4));
  product15 = this.page.locator(this.selectorProduct(15));
  product3Women = this.page.locator(this.selectorProduct(3));
  product35Men = this.page.locator(this.selectorProduct(35));
  product29Kids = this.page.locator(this.selectorProduct(29));
  product8Polo = this.page.locator(this.selectorProduct(8));
  product38Madame = this.page.locator(this.selectorProduct(38));
  product40Biba = this.page.locator(this.selectorProduct(40));
}
