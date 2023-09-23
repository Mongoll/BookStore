export class Book {
  constructor(
    public id: number = 0,
    public isbn?: number,
    public title?: string,
    public author?: string,
    public description?: string,
    public category?: string,
    public edition?: string,
    public price?: number,
    public imageURL?: string,
    public isAdded?: boolean
  ) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.description = description;
    this.category = category;
    this.edition = edition;
    this.price = price;
    this.imageURL = imageURL;
    this.isAdded = isAdded;
  }
}
