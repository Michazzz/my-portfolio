import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import {
  siSharp,
  siDotnet,
  siNodedotjs,
  siPython,
  siOpenjdk,
  siAngular,
  siTypescript,
  siJavascript,
  siHtml5,
  siIonic,
  siReact,
  siDocker,
  siKubernetes,
  siJenkins,
  siGit,
  siGithub,
  siGitlab,
  siPostgresql,
  siMysql,
  siMariadb,
  siRabbitmq,
  siOpenapiinitiative,
  siJira,
  siClaude,
  siGithubcopilot,
  siReactivex,
  siNgrx,
  siSass,
  siTailwindcss,
  siBootstrap,
  siDaisyui,
  siSqlite,
  siCaddy,
  siNginx,
  siLinux,
  siGnubash,
  siConfluence,
  siPostman,
  siSwagger,
  siDbeaver,
  siFigma,
  siJsonwebtokens,
} from 'simple-icons';

interface Glyph {
  path: string;
  hex: string;
}

/** Skill name (lower-cased) -> brand logo. Names without a logo render nothing. */
const ICONS: Record<string, Glyph> = {
  'c#': siSharp,
  '.net core': siDotnet,
  'asp.net core web api': siDotnet,
  'node.js': siNodedotjs,
  python: siPython,
  java: siOpenjdk,
  angular: siAngular,
  typescript: siTypescript,
  javascript: siJavascript,
  html5: siHtml5,
  ionic: siIonic,
  react: siReact,
  docker: siDocker,
  kubernetes: siKubernetes,
  jenkins: siJenkins,
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
  postgresql: siPostgresql,
  mysql: siMysql,
  mariadb: siMariadb,
  rabbitmq: siRabbitmq,
  openapi: siOpenapiinitiative,
  jira: siJira,
  'claude code': siClaude,
  'github copilot': siGithubcopilot,
  rxjs: siReactivex,
  'ngrx / signals': siNgrx,
  'scss/sass': siSass,
  tailwind: siTailwindcss,
  bootstrap: siBootstrap,
  daisyui: siDaisyui,
  sqlite: siSqlite,
  caddy: siCaddy,
  nginx: siNginx,
  linux: siLinux,
  bash: siGnubash,
  confluence: siConfluence,
  postman: siPostman,
  swagger: siSwagger,
  dbeaver: siDbeaver,
  figma: siFigma,
  jwt: siJsonwebtokens,
  'docker desktop': siDocker,
};

/** Brand colors that are too dark to read on a dark background fall back to the text color. */
function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

@Component({
  selector: 'app-tech-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // `contents` keeps this host out of flex layout so iconless skills don't get an empty gap.
  host: { class: 'contents' },
  templateUrl: './tech-icon.html',
})
export class TechIcon {
  readonly name = input.required<string>();
  /** `sm` (default) is the inline badge size; `lg` is 64px (e.g. project links). */
  readonly size = input<'sm' | 'lg'>('sm');

  protected readonly glyph = computed<Glyph | undefined>(
    () => ICONS[this.name().trim().toLowerCase()],
  );

  protected readonly sizeClass = computed(() =>
    this.size() === 'lg' ? 'size-12 shrink-0' : 'size-3.5 shrink-0',
  );

  protected readonly fill = computed(() => {
    const g = this.glyph();
    return g && !isDark(g.hex) ? `#${g.hex}` : 'currentColor';
  });
}
