export class Book {
  constructor(data) {
    if (!data) throw new Error('Book data is required');

    this.id = data.id;
    this.active = data.active;
    this.title = data.title;
    this.cover_picture = data.cover_picture;
    this.stock = data.stock;
    this.selling_price = data.selling_price;
    this.language = data.language;
    this.is_download_title = data.is_download_title;
    this.created_at = data.created_at;
  }

  isValid() {
    return typeof this.id === 'string' &&
           (this.active === null || typeof this.active === 'boolean') &&
           typeof this.title === 'string' &&
           (this.cover_picture === undefined || typeof this.cover_picture === 'string') &&
           typeof this.stock === 'number' &&
           typeof this.selling_price === 'number' &&
           typeof this.is_download_title === 'boolean' &&
           typeof this.language === 'string' &&
           typeof this.created_at === 'string';
  }
}
