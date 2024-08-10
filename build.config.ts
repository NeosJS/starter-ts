import fs from 'node:fs/promises'
import { defineBuildConfig } from 'unbuild'
import type { BuildConfig } from 'unbuild'
import { name, version } from './package.json'

const BANNER = `/*! 
* ${name}
* Version: ${version}
* Copyright (c) 2021-PRESENT NeosJS
* ReleaseTime: ${new Date().toLocaleString()}
*/
`

export default defineBuildConfig(<BuildConfig>{
  name, // 项目名称
  entries: [
    'src/index'
  ],
  alias: { // 别名配置
    '@': './src'
  },
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true, // CommonJS 桥接
    inlineDependencies: true, // 内联依赖
    output: {
      banner: BANNER
    },
    esbuild: { // esbuild 配置
      target: 'esnext', // 目标环境
      minify: true, // 是否压缩
      treeShaking: true, // 是否启用 Tree Shaking
      charset: 'utf8' // 字符集
    }
  },
  replace: { // 替换配置
    __VERSION__: version,
    __RELEASE_TIME__: String(+new Date())
  },
  // externals: [''],
  // peerDependencies: [''],
  hooks: { // 钩子函数
    'rollup:done': async () => {
      await fs.rm(new URL('./dist/index.d.mts', import.meta.url))
      await fs.rm(new URL('./dist/index.d.cts', import.meta.url))
    }
  }
})
