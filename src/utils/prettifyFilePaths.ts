export default function prettifyFilePaths(
  files: string[],
  skipPerlude = false
): string[] {
  const commonPath = files[1].split('/');
  for (const file of files.slice(skipPerlude ? 1 : 0)) {
    const last = commonPath.length - 1;
    if (commonPath[last] !== file.split('/')[last]) {
      commonPath.pop();
    }
  }
  const prefixLength = commonPath.join('/').length;
  return files.map((file, index) => {
    if (skipPerlude && index === 0) return file;
    return file.slice(prefixLength + 1);
  });
}
