import { type ConfigOptions, defineConfig } from '@neosjs/release'

export default defineConfig({
  // plugins: {
  //   './plugins/demo.js': {
  //     unused: 'option'
  //   }
  // },
  changelog: {
    generate: true,
    header: '# 更新日志\n\n此变更日志由 `@neosjs/release` 自动更新.\n',
    infile: 'CHANGELOG.md'
  },
  git: {
    commitMessage: 'chore: release v${version}',
    requireCleanWorkingDir: true,
    commitsPath: '.',
    push: true,
    requireCommits: false,
    requireCommitsFail: true,
    tagName: 'v${version}'
  },
  npm: {
    publish: false
  }
}) satisfies ConfigOptions
