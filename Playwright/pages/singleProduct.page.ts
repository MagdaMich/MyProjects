import { Page } from '@playwright/test';
import { TopNavigationBar } from '../components/topNavigationBar.components';

export class SingleProductPage {
  constructor(private page: Page) {}

  topNavigationBar = new TopNavigationBar(this.page);

  quantityInput = this.page.locator('#quantity');
  addToCartButton = this.page.getByRole('button', { name: ' Add to cart' });
  nameInput = this.page.locator('#name');
  emailInput = this.page.locator('#email');
  reviewInput = this.page.locator('#review');
  name: string = 'User';
  review: string = 'New test review'; 
  submitButton = this.page.getByRole('button', { name: 'Submit' });
  messageLabel = this.page.getByText('Thank you for your review.');
  messageText = 'Thank you for your review.';

  async addReview(
    name: string, 
    email: string, 
    review: string
    ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.reviewInput.fill(review);
  }
}
