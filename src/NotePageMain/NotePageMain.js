/* eslint-disable quotes */
import React, { Component } from "react";
import Note from "../Note/Note";
import "./NotePageMain.css";
import NoteContext from "../NoteContext";

export default class NotePageMain extends Component {
  static contextType = NoteContext;

  handleDeleteNote = noteId => {
    this.props.history.push("/");
  };
  render() {
    console.log(this.context, "NotePageMain 11");
    let { notes } = this.context;
    let note = notes.find(n => n.id === this.props.match.params.noteId);
    const { id = "", name = "", modified = "", content = "" } = note || {};
    return (
      <section className="NotePageMain">
        <Note
          id={id}
          name={name}
          modified={modified}
          deleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

NotePageMain.defaultProps = {
  note: {
    content: ""
  }
};
