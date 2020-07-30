/* eslint-disable quotes */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";

import NoteContext from "../NoteContext";

export default class Note extends Component {
  static contextType = NoteContext;

  handleClickRemove = () => {
    const noteId = this.props.id;
    console.log(noteId);
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            Promise.reject(error);
          });
        }
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.deleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { id, name, modified } = this.props;

    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickRemove}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">{format(modified, "Do MMM YYYY")}</span>
          </div>
        </div>
      </div>
    );
  }
}
