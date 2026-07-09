import { Portfolio } from './portfolio.model';
// Public site content lives in JSON. It's committed (nothing private here) and
// imported at build time. The private CV lives separately in `cv-data.json`.
import data from './portfolio-data.json';

export const PORTFOLIO = data as Portfolio;
