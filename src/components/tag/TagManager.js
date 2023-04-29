export const getTags = () => {
    return fetch("http://localhost:8088/tags")
      .then(res => res.json())
  };

export const getEntryTags = () => {
    return fetch("http://localhost:8088/entryTags")
    .then(res => res.json())
}