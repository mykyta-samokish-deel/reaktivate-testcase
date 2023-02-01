import React from "react";
import { observer } from "mobx-react";

export const AppHeader = observer(
  ({ data: { toggleType, addBook, reset, isDefaultType, requestStatus } }) => (
    <>
      <div className="toggle-block">
        <div>
          <input
            onChange={toggleType}
            type="radio"
            name="listType"
            id="default"
            checked={isDefaultType}
          />
          <label htmlFor="default">all books</label>
        </div>

        <div>
          <input
            onChange={toggleType}
            type="radio"
            name="listType"
            id="private"
            checked={!isDefaultType}
          />
          <label htmlFor="private">private</label>
        </div>
      </div>

      <div>
        <button onClick={addBook}>add book</button>
        <button onClick={reset}>reset</button>
      </div>

      <div className="status-block">
        {requestStatus === "loading" ? <p>loading</p> : null}
        {requestStatus === "failed" ? <p>error</p> : null}
      </div>
    </>
  )
);
