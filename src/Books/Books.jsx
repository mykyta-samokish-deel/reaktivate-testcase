import React from "react";
import { observer } from "mobx-react";

export const Books = observer(({ books }) => (
  <>
    {books.length > 0 ? (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <p>
              {book.author}: {book.name}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No items in a list</p>
    )}
  </>
));
