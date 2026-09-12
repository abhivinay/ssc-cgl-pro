import { useNavigate } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Continue Mission",
      subtitle: "Resume today's active topic",

      path: "/missions",
      accent: "violet",
    },
    {
      title: "Brain Trainer",
      subtitle: "10 minute warm-up",

      path: "/brain-trainer",
      accent: "emerald",
    },
    {
      title: "Revision",
      subtitle: "Complete due revisions",

      path: "/revision",
      accent: "amber",
    },
    {
      title: "Mock Tests",
      subtitle: "Practice exam mode",

      path: "/mock-tests",
      accent: "sky",
    },
    {
      title: "Analytics",
      subtitle: "View detailed insights",

      path: "/analytics",
      accent: "rose",
    },
    {
      title: "Progress",
      subtitle: "XP, streak & achievements",

      path: "/progress",
      accent: "orange",
    },
  ];

  return (
    <GlassCard hover padding="p-0" className="overflow-hidden">
      <div className="p-6 md:p-5">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="primary">Quick Actions</Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Mission Control
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Jump anywhere in a single click.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => {
            return (
              <button
                key={action.title}
                type="button"
                onClick={() => navigate(action.path)}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5 text-left transition duration-300  hover:border-white/20"
              >
                <div className="relative">
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {action.subtitle}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-cyan-200 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span>Open</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
