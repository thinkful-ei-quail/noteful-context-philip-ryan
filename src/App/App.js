import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
//import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";

import NoteContext from "../NoteContext";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };
  //implement api fetch here ... use saftey net? || {}
  componentDidMount() {
    const base_url = "http://localhost:9090";
    Promise.all([fetch(`${base_url}/folders`), fetch(`${base_url}/notes`)])
      .then(([folderRes, noteRes]) => {
        return Promise.all([folderRes.json(), noteRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({
          folders,
          notes
        });
      })
      .catch(error => console.error("ERROR:", error));
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
      <NoteContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.handleDeleteNote
        }}
      >
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
