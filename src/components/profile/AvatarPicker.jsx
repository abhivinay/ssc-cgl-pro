const avatars = ["", "", "", "", "", "", "", ""];

export default function AvatarPicker({ value, onChange }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-zinc-300">Choose Avatar</p>
      <div className="grid grid-cols-4 gap-3">
        {avatars.map((avatar) => (
          <button
            key={avatar}
            type="button"
            onClick={() => onChange(avatar)}
            className={`flex h-14 items-center justify-center rounded-lg border text-2xl transition ${
              value === avatar
                ? "border-cyan-300/40 bg-cyan-300/10"
                : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
            }`}
          >
            {avatar}
          </button>
        ))}
      </div>
    </div>
  );
}
