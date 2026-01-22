
class AutoID {
  private rootID = -1;
  private comCount = 1;
  private isInitialized = false;

  constructor(rootID: number,comCount?:number) {
    if (this.isInitialized) {
      console.warn('根ID已经初始化，再次设置可能导致ID冲突');
    } else {
      this.rootID = rootID;
      if (comCount) {
        this.comCount = comCount;
      }
      this.isInitialized = true;
    }
  }

  /**
   * 生成唯一ID
   * @returns 唯一的数字ID
   */
  public generateID(): number {
    if (this.rootID === -1) {
      console.error('请先设置rootID');
      return -1;
    }
    return this.rootID + this.comCount++;
  }

  /**
   * 获取当前ID计数
   * @returns 当前ID计数
   */
  public getCount(): number {
    return this.comCount;
  }
}

export default AutoID;