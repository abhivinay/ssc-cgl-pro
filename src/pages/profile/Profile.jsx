import { useMemo, useState } from "react";
import { profileManager } from "../../services";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileStats from "../../components/profile/ProfileStats";
import AvatarPicker from "../../components/profile/AvatarPicker";

export default function Profile() {
  const initialProfile = useMemo(() => profileManager.get(), []);
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const updated = profileManager.save({
      ...profile,
      targetScore: Number(profile.targetScore) || 0,
      dailyStudyHours: Number(profile.dailyStudyHours) || 0,
    });
    setProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const resetProfile = () => {
    const restored = profileManager.reset();
    setProfile(restored);
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Personalization
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Profile Settings</h1>
        <p className="mt-2 text-zinc-400">
          Customize your SSC Sentinel experience.
        </p>
      </div>

      <ProfileStats profile={profile} />

      <form
        onSubmit={saveProfile}
        className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]"
      >
        <div className="space-y-6">
          <ProfileCard profile={profile} />
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <AvatarPicker
              value={profile.avatar}
              onChange={(avatar) => updateField("avatar", avatar)}
            />
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <p className="mb-2 text-sm font-semibold text-zinc-300">Name</p>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </label>

            <label>
              <p className="mb-2 text-sm font-semibold text-zinc-300">Exam</p>
              <select
                value={profile.exam}
                onChange={(e) => updateField("exam", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              >
                <option>SSC CGL</option>
                <option>SSC CHSL</option>
                <option>SSC CPO</option>
                <option>SSC MTS</option>
              </select>
            </label>

            <label>
              <p className="mb-2 text-sm font-semibold text-zinc-300">
                Target Score
              </p>
              <input
                type="number"
                value={profile.targetScore}
                onChange={(e) => updateField("targetScore", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </label>

            <label>
              <p className="mb-2 text-sm font-semibold text-zinc-300">
                Daily Study Hours
              </p>
              <input
                type="number"
                value={profile.dailyStudyHours}
                onChange={(e) => updateField("dailyStudyHours", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </label>

            <label>
              <p className="mb-2 text-sm font-semibold text-zinc-300">
                Language
              </p>
              <select
                value={profile.language}
                onChange={(e) => updateField("language", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              >
                <option value="en">English</option>
                <option value="te-en">Telugu (English Script)</option>
                <option value="hi">Hindi</option>
              </select>
            </label>

            <label>
              <p className="mb-2 text-sm font-semibold text-zinc-300">Theme</p>
              <select
                value={profile.theme}
                onChange={(e) => updateField("theme", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-cyan-900 px-6 py-3 font-semibold text-white hover:bg-cyan-900"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={resetProfile}
              className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Reset
            </button>

            {saved && (
              <span className="flex items-center font-semibold text-cyan-200">
                Profile Saved
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
