import { CvEntry } from './portfolio.model';
// `cv-data.json` is gitignored (keeps real CV out of the repo) and imported at
// build time — so it must exist wherever you build. On a fresh clone copy the
// template: `cp cv-data.example.json cv-data.json` (see README).
import cvJson from './cv-data.json';

export const CV_ENTRIES: CvEntry[] = cvJson;
