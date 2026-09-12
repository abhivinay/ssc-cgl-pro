import { useState } from "react";
export default function TopicNotebook({
  topic,
  addTopicNote,
  addTopicMistake,
}) {
  const [note, setNote] = useState("");
  const [mistake, setMistake] = useState("");

  const saveNote = () => {
    if (!note.trim()) return;

    addTopicNote(topic.id, note.trim());
    setNote("");
  };

  const saveMistake = () => {
    if (!mistake.trim()) return;

    addTopicMistake(topic.id, mistake.trim());
    setMistake("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="font-bold">Personal notes</h3>

        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Write an important rule, shortcut or observation..."
          className="mt-4 min-h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-sm outline-none focus:border-cyan-300/40"
          aria-label="Write an important rule, shortcut or observation..."
        />

        <button
          type="button"
          onClick={saveNote}
          className="mt-3 w-full rounded-xl bg-cyan-900 px-4 py-2 text-sm font-semibold hover:bg-cyan-900"
        >
          Save Note
        </button>

        <div className="mt-4 space-y-2">
          {(topic.notes || []).map((noteItem) => (
            <div
              key={noteItem.id}
              className="rounded-xl bg-zinc-950 p-3 text-sm text-zinc-300"
            >
              {noteItem.text}
            </div>
          ))}

          {!(topic.notes || []).length && (
            <p className="text-sm text-zinc-600">No personal notes yet.</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="font-bold">Mistake notebook</h3>

        <textarea
          value={mistake}
          onChange={(event) => setMistake(event.target.value)}
          placeholder="Record a mistake and the correct rule..."
          className="mt-4 min-h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-sm outline-none focus:border-cyan-300/40"
          aria-label="Record a mistake and the correct rule..."
        />

        <button
          type="button"
          onClick={saveMistake}
          className="mt-3 w-full rounded-xl bg-cyan-900 px-4 py-2 text-sm font-semibold hover:bg-cyan-900"
        >
          Save Mistake
        </button>

        <div className="mt-4 space-y-2">
          {(topic.mistakes || []).map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-zinc-950 p-3 text-sm text-zinc-300"
            >
              {item.text}
            </div>
          ))}
          {!(topic.mistakes || []).length && (
            <p className="text-sm text-zinc-600">No recorded mistakes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
