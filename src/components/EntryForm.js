import React, { useState, useEffect } from "react"


export const EntryForm = ({ entry, moods, onFormSubmit, tags }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)
    const [tagsList, setTagsList] = useState([])

    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry ={...updatedEntry}
        newEntry[event.target.name] = event.target.value
        setUpdatedEntry(newEntry)
    }

    const handleIntControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry ={...updatedEntry}
        newEntry[event.target.name] = parseInt(event.target.value)
        setUpdatedEntry(newEntry)
    }

    const handleTagChange = (event) => {
        const newTagsList = [...tagsList]
        if(newTagsList.includes(parseInt(event.target.value))){
            newTagsList.splice(newTagsList.indexOf(parseInt(event.target.value)), 1)
        } else {
            newTagsList.push(parseInt(event.target.value))
        }
        setTagsList(newTagsList)
    }

    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        copyEntry.mood_id = parseInt(copyEntry.mood_id)
        copyEntry.tag_id = tagsList
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        onFormSubmit(copyEntry)
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="mood_id" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="mood_id"
                                    proptype="int"
                                    value={updatedEntry.mood_id}
                                    onChange={handleIntControlledInputChange}>
                                        <option value="0">Select a mood</option>
                                        {moods.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.label}
                                            </option>
                                        ))}
                                </select>
                                {
                                    tags.map((t) => {return <div key={t.id}>
                                        <label key={t.id}> {t.name} </label>
                                        <input type="checkbox" name="tag_id" value={t.id} onChange={handleTagChange}/>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}
