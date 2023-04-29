import React, { useEffect, useState } from "react";
import { Entry } from "./Entry";
import { searchEntries } from "./EntryManager";

export const EntryList = ({ moods, entries, onEditButtonClick, onDeleteButtonClick, tags }) => {

  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState("");

  useEffect(() => {
    if (searchedTerm !== "") {
      searchEntries(searchedTerm).then(entriesData => setEntries(entriesData))
    } else {
      setEntries(entries)
    }
  }, [searchedTerm, entries])


  const filterAllEntries = (mood_id) => {
    const filteredEntriesByMood = entries.filter(entry => entry.mood_id === parseInt(mood_id))
    setEntries(filteredEntriesByMood)
    setMoodSelected(parseInt(mood_id))
  }


  return (
    <article className="panel is-primary">
      <h1 className="panel-heading">Entries</h1>
      <p className="panel-tabs">
      {/* eslint-disable-next-line */}
        <a href="#" className={moodSelected === "" ? "is-active" : ""} onClick={() => {
          setEntries(entries)
          setMoodSelected("")
        }}>All</a>
        {
          // eslint-disable-next-line
          moods.map(mood => (<a key={mood.id}
              onClick={() => filterAllEntries(mood.id)}
              className={moodSelected === mood.id ? "is-active" : ""}
            >{mood.label}</a>
          ))
        }
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search" onKeyUp={
            (event) => {
              const searchTerm = event.target.value
              setTerm(searchTerm)
            }
          } />
        </p>
      </div>

      {filteredEntries.map(entry => {
        return <div className="panel-block" key={entry.id}>
          <Entry
            entry={entry}
            mood={moods.find(m => m.id === entry.mood_id)}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            tags={tags}
          />
        </div>
      })}
    </article>
  );
};
