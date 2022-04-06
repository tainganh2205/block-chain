const replace = require('replace-in-file')

const options = {
  //Glob(s)
  files: ['types/contracts/**/*.ts'],

  //Replacement to make (string or regex)
  from: /\s\sEventFilter,\n/g,
  to: '',
}

const specialOption = {
  //Glob(s)
  files: ['types/contracts/Muticall.ts'],
  from: /\sEventFragment,/g,
  to: '',
}

try {
  const changedFiles = replace.sync(options)
  // eslint-disable-next-line no-console
  console.log(
    'Modified files:\n',
    changedFiles.map((replaceResult) => replaceResult.file).join('\n '),
  )
  const specialFile = replace.sync(specialOption)
  // eslint-disable-next-line no-console
  console.log(
    'Modified special file:\n',
    specialFile.map((replaceResult) => replaceResult.file).join('\n '),
  )
} catch (error) {
  console.error('Error occurred:', error)
}
