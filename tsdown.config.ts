import { defineConfig } from 'tsdown'
import { StaleGuardRecorder } from 'tsdown-stale-guard'
import pkg from './package.json' with { type: 'json' }

const { name, version } = pkg

const releaseTime = new Date().toLocaleString().replace(/\//g, '-')
const BANNER = `/*! 
* ${name}
* Version: ${version}
* Copyright (c) 2021-PRESENT NeosJS
* ReleaseTime: ${releaseTime}
*/\n`

export default defineConfig({
  entry: [
    'src/index.ts'
  ],
  minify: true,
  shims: true,
  clean: true,
  outDir: 'dist',
  dts: true,
  exports: true,
  plugins: [
    StaleGuardRecorder()
  ],
  outputOptions: {
    format: 'esm',
    banner: BANNER
  },
  outExtensions({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
      dts: '.d.ts'
    }
  },
  onSuccess: () => {
    console.log('Build completed successfully')
  }
})
