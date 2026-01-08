import { AspectRatioEnum } from '@/type/PageModel';
/**
 * 将字符串格式的宽高比转换为AspectRatioEnum枚举值
 * @param aspectRatio
 * @returns AspectRatioEnum枚举值
 */
export function stringToAspectRatioEnum(aspectRatio: string): AspectRatioEnum {
  // 标准化输入：去除空格、转为小写，避免格式不一致问题
  const normalizedRatio = aspectRatio.trim();

  // 映射表：字符串 -> 枚举值（请根据你的实际枚举定义调整值）
  const ratioMap: Record<string, AspectRatioEnum> = {
    '16/9': AspectRatioEnum.RATIO_16_9,
    '9/16': AspectRatioEnum.RATIO_9_16,
    '16/10': AspectRatioEnum.RATIO_16_10,
    '10/16': AspectRatioEnum.RATIO_10_16,
    '4/3': AspectRatioEnum.RATIO_4_3,
    '3/4': AspectRatioEnum.RATIO_3_4,
    '1/1': AspectRatioEnum.RATIO_1_1,
    '-1': AspectRatioEnum.CUSTOM,
  };

  // 匹配枚举值，无匹配时返回默认值（这里默认16:9，可根据业务调整）
  return ratioMap[normalizedRatio] ?? AspectRatioEnum.RATIO_16_9;
}