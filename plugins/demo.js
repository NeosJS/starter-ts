import { Plugin } from '@neosjs/release'
import fs from 'node:fs'
import { resolve } from 'node:path'

const prompts = {
  publish: {
    type: 'confirm',
    message: context =>
      `Publish version ${context.version} of ${context.name}?`
  }
}

class MyPlugin extends Plugin {
  constructor(...args) {
    super(...args)
    this.registerPrompts(prompts)
    this.setContext({ versionFile: resolve('./.VERSION') })
  }

  static isEnabled() {
    try {
      fs.accessSync('./.VERSION')
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  init() {
    const versionFile = this.getContext('versionFile')
    const data = fs.readFileSync(versionFile)
    const latestVersion = data.toString().trim()
    this.setContext({ latestVersion })
  }

  getPackageName() {
    return this.config.getContext('name')
  }

  getLatestVersion() {
    return this.getContext('latestVersion')
  }

  bump(version) {
    this.setContext({ version })
    fs.writeFileSync(this.getContext('versionFile'), version)
  }

  async release() {
    await this.step({
      task: () => this.publish(),
      label: 'Publish with pkg-manager',
      prompt: 'publish'
    })
  }

  publish() {
    // <insert command to publish>, example: await this.exec('pkg-manager publish');
    this.isReleased = true
  }

  afterRelease() {
    if (this.isReleased) {
      const name = this.getPackageName()
      const { version } = this.getContext()
      this.log.log(`🔗 https://registry.example.org/${name}/${version}`)
    }
  }

  getLatestVersion() {}
  getIncrement() {}
  getIncrementedVersionCI() {}
  getIncrementedVersion() {}
  getInitialOptions(options, pluginName) {
    return super.getInitialOptions(...arguments)
  }

  beforeBump() {
    console.log('自定义Plugin beforeBump')
  }

  beforeRelease() {
    console.log('自定义Plugin beforeRelease')
  }
}

export default MyPlugin
