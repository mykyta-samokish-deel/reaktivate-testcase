import BooksStore from "../Books.model";

jest.mock("../../Shared/ApiGateway", () => {
  return class {
    post() {
      return Promise.resolve({ status: "ok" });
    }

    get() {
      return Promise.resolve([
        {
          id: 1,
          name: "lorem",
          author: "ipsum",
        },
      ]);
    }

    reset() {
      return Promise.resolve({ status: "ok" });
    }
  };
});

describe("Books store", () => {
  let store;

  beforeEach(() => {
    store = new BooksStore();
  });

  it("should init correctly", () => {
    expect(store.isDefaultType).toEqual(true);
    expect(store.books).toEqual([]);
    expect(store.addedBookId).toEqual(132);
    expect(store.requestStatus).toEqual("not_asked");
  });

  test("when toggleType is triggered, isDefaultType should change", () => {
    const prevIsDefaultType = store.isDefaultType;
    store.toggleType();
    expect(store.isDefaultType).toEqual(!prevIsDefaultType);
  });

  test("addBook fn", async () => {
    jest.useFakeTimers();

    store.addBook();

    expect(store.requestStatus === "loading").toBeTruthy();

    await jest.advanceTimersByTime();

    expect(store.addedBookId).toEqual(132 + 1);
    expect(store.requestStatus === "succeeded").toBeTruthy();
    expect(store.books).toContainEqual({
      id: 132,
      name: "test",
      author: "qwe",
    });
  });

  test("getBooks fn", async () => {
    jest.useFakeTimers();

    store.getBooks();

    expect(store.requestStatus === "loading").toBeTruthy();

    await jest.advanceTimersByTime();

    expect(store.requestStatus === "succeeded").toBeTruthy();
    expect(store.books).toContainEqual({
      id: 1,
      name: "lorem",
      author: "ipsum",
    });
  });

  test("reset fn", async () => {
    jest.useFakeTimers();
    const spy = jest.spyOn(store, "getBooks");

    store.reset();

    expect(store.requestStatus === "loading").toBeTruthy();

    await jest.advanceTimersByTime();

    expect(spy).toBeCalled();
  });
});
