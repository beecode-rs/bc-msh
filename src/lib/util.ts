import shell from 'shelljs'

export function execAsync(command: string): Promise<{ stdout: string; stderr: string; error: boolean }> {
  return new Promise<{ stdout: string; stderr: string; error: boolean }>(resolve => {
    {
      shell.exec(command, { silent: true }, (code, stdout, stderr) => {
        const execResult = { stdout, stderr, error: false }
        if (code !== 0) execResult.error = true
        return resolve(execResult)
      })
    }
  })
}

export function log(msg: string): void {
  console.log(msg)
}
