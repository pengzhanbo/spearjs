import { inc, valid } from 'semver'

export const getVersionList = (version: string) => {
  if (valid(version)) {
    version = '1.0.0'
  }

  const major = inc(version, 'major')
  const patch = inc(version, 'patch')
  const minor = inc(version, 'minor')
  const alpha = inc(version, 'prerelease', 'Alpha')
  const beta = inc(version, 'prerelease', 'Beta')
  const rc = inc(version, 'prerelease', 'Rc')

  return [
    { name: `current: ${version}`, value: version },
    { name: `patch: ${patch}`, value: patch },
    { name: `minor: ${minor}`, value: minor },
    { name: `prerelease-alpha: ${alpha}`, value: alpha },
    { name: `prerelease-beta: ${beta}`, value: beta },
    { name: `prerelease-rc: ${rc}`, value: rc },
    { name: `major: ${major}`, value: major },
  ]
}
