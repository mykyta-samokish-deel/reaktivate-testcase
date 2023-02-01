import { makeAutoObservable, runInAction } from "mobx";
import ApiGateway from "../Shared/ApiGateway";

const api = new ApiGateway();

export default class BooksStore {
  books = [];
  isDefaultType = true;
  requestStatus = "not_asked";
  addedBookId = 132;

  constructor() {
    makeAutoObservable(this);
  }

  toggleType() {
    this.isDefaultType = !this.isDefaultType;
  }

  async getBooks() {
    try {
      this.requestStatus = "loading";
      const books = await api.get(this.isDefaultType ? "" : "/private");

      runInAction(() => {
        this.books = books;
        this.requestStatus = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.requestStatus = "failed";
      });
    }
  }

  async addBook() {
    const addedBook = {
      id: this.addedBookId,
      name: "test",
      author: "qwe",
    };

    try {
      this.requestStatus = "loading";

      const { status } = await api.post(addedBook);

      runInAction(() => {
        if (status === "ok") {
          this.books.push(addedBook);
          this.addedBookId++;
        }

        this.requestStatus = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.requestStatus = "failed";
      });
    }
  }

  async reset() {
    try {
      this.requestStatus = "loading";
      const { status } = await api.reset();

      runInAction(() => {
        if (status === "ok") {
          this.getBooks();
        }
      });
    } catch (e) {
      runInAction(() => {
        this.requestStatus = "failed";
      });
    }
  }
}
