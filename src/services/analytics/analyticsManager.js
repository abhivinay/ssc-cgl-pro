import storageManager from "../storage/storageManager";

const ANALYTICS_KEY = "analytics";

const defaultAnalytics = {
  totalStudyMinutes: 0,
  totalQuestionsSolved: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  testsTaken: 0,
  averageScore: 0,
  streak: 0,
  xp: 0,
  level: 1,
  weakTopics: [],
  strongTopics: [],
  recentActivity: [],
  updatedAt: new Date().toISOString(),
};

const analyticsManager = {
  get() {
    return storageManager.get(ANALYTICS_KEY, defaultAnalytics);
  },

  save(data) {
    const analytics = {
      ...defaultAnalytics,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    storageManager.set(ANALYTICS_KEY, analytics);
    return analytics;
  },

  update(values) {
    return storageManager.update(ANALYTICS_KEY, (current) => ({
      ...defaultAnalytics,
      ...current,
      ...values,
      updatedAt: new Date().toISOString(),
    }));
  },

  addActivity(activity) {
    return storageManager.update(ANALYTICS_KEY, (current) => ({
      ...defaultAnalytics,
      ...current,
      recentActivity: [
        {
          id: crypto.randomUUID(),
          time: new Date().toISOString(),
          ...activity,
        },
        ...(current.recentActivity || []),
      ].slice(0, 100),
      updatedAt: new Date().toISOString(),
    }));
  },

  reset() {
    storageManager.set(ANALYTICS_KEY, defaultAnalytics);
    return defaultAnalytics;
  },
};

export default analyticsManager;