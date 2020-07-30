import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NoteContext from '../NoteContext'

export default class NoteListMain extends React.Component{
  static contextType=NoteContext

  render(){
    let { notes } = this.context;
    let folderId = this.props.match.params.folderId
    if (folderId) notes = notes.filter(n => n.folderId === folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notes.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
  
}

NoteListMain.defaultProps = {
  notes: [],
}
