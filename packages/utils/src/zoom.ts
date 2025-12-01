// 鼠标滚轮缩放事件处理
export const handleWheel: (e: React.WheelEvent, zoomRatio: number) => number = (e, zoomRatio) => {

  // 定义缩放步长和范围限制
  const zoomStep = 0.1;
  const minZoom = 0.1;
  const maxZoom = 3.0;

  // 根据滚轮方向计算新的缩放比例
  const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
  const newZoomRatio = Math.max(minZoom, Math.min(maxZoom, Number((zoomRatio + delta).toFixed(1))));

  return newZoomRatio;
};