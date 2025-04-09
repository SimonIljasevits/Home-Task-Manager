async function fetchDatabase(dbName) {
    const response = await fetch("https://kool.krister.ee/chat/homeTaskManager-" + dbName);
    const data = await response.json();
    return data;
}