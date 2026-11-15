const TUTORIAL_COMPLETED_KEY = 'sena:valencia-tutorial-complete';
const FIRST_CONSTELLATION_KEY = 'sena:first-constellation';
const TUTORIAL_PROGRESS_EVENT = 'sena:tutorial-progress';

export type FirstConstellation = {
  name: 'Valencia · Mission 00';
  rainVerdict: 'Lead' | 'Confirmed';
  rainReasoning: string;
  createdAt: string;
};

let cachedConstellationJson: string | null | undefined;
let cachedConstellation: FirstConstellation | null = null;

export function isTutorialComplete() {
  return window.localStorage.getItem(TUTORIAL_COMPLETED_KEY) === 'true';
}

export function getFirstConstellation(): FirstConstellation | null {
  const saved = window.localStorage.getItem(FIRST_CONSTELLATION_KEY);
  if (saved === cachedConstellationJson) return cachedConstellation;

  cachedConstellationJson = saved;
  if (!saved) {
    cachedConstellation = null;
    return cachedConstellation;
  }

  try {
    const parsed: unknown = JSON.parse(saved);
    if (
      typeof parsed === 'object'
      && parsed !== null
      && 'name' in parsed
      && parsed.name === 'Valencia · Mission 00'
      && 'rainVerdict' in parsed
      && (parsed.rainVerdict === 'Lead' || parsed.rainVerdict === 'Confirmed')
      && 'rainReasoning' in parsed
      && typeof parsed.rainReasoning === 'string'
      && 'createdAt' in parsed
      && typeof parsed.createdAt === 'string'
    ) {
      cachedConstellation = {
        name: parsed.name,
        rainVerdict: parsed.rainVerdict,
        rainReasoning: parsed.rainReasoning,
        createdAt: parsed.createdAt,
      };
      return cachedConstellation;
    }

    console.error('Saved Valencia constellation has an invalid format.');
    cachedConstellation = null;
    return cachedConstellation;
  } catch (error) {
    console.error('Could not read the saved Valencia constellation.', error);
    cachedConstellation = null;
    return cachedConstellation;
  }
}

export function subscribeToTutorialProgress(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(TUTORIAL_PROGRESS_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(TUTORIAL_PROGRESS_EVENT, onChange);
  };
}

export function getServerTutorialProgress() {
  return false;
}

export function markTutorialComplete() {
  window.localStorage.setItem(TUTORIAL_COMPLETED_KEY, 'true');
  window.dispatchEvent(new Event(TUTORIAL_PROGRESS_EVENT));
}

export function saveFirstConstellation(rainVerdict: FirstConstellation['rainVerdict'], rainReasoning: string) {
  const constellation: FirstConstellation = {
    name: 'Valencia · Mission 00',
    rainVerdict,
    rainReasoning,
    createdAt: new Date().toISOString(),
  };
  const serialized = JSON.stringify(constellation);
  window.localStorage.setItem(FIRST_CONSTELLATION_KEY, serialized);
  cachedConstellationJson = serialized;
  cachedConstellation = constellation;
  window.dispatchEvent(new Event(TUTORIAL_PROGRESS_EVENT));
}

export function getServerFirstConstellation() {
  return null;
}
