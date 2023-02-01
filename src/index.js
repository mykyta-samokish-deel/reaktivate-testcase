import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

import BooksStore from "./Books/Books.model";
import { Books } from "./Books/Books";
import { AppHeader } from "./AppHeader/AppHeader";

import "./styles.css";

function App() {
  const [store] = useState(() => new BooksStore());

  useEffect(() => {
    store.getBooks();
  }, [store.isDefaultType, store.getBooks]);

  const toggleType = () => store.toggleType();
  const addBook = () => store.addBook();
  const reset = () => store.reset();

  return (
    <>
      <header>
        <AppHeader
          data={{
            isDefaultType: store.isDefaultType,
            requestStatus: store.requestStatus,
            toggleType,
            addBook,
            reset,
          }}
        />
      </header>

      <main>
        <Books books={store.books} />
      </main>
    </>
  );
}

const ObservedApp = observer(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<ObservedApp />, rootElement);
