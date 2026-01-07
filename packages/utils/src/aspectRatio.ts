export function aspectRatioToNumber(aspectRatio: string): number {
  if (!aspectRatio.includes('/')) {
    throw new Error('aspectRatio 格式错误，必须包含 "/"');
  }
  const ratio = aspectRatio.split('/');
  return Number(ratio[0]) / Number(ratio[1]);
}