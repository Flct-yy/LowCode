import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type ComponentSchema, ComTree } from '@wect/type';
import pageApi from '@/api/pageApi';


interface transformedData {
  comTree: ComTree;
}

function Preview() {
  const [searchParams] = useSearchParams();
  const [pageId, setPageId] = useState<number>(0);
  const [componentTree, setComponentTree] = useState<ComTree | null>(null);

  useEffect(() => {
    // 解析查询参数
    const id = searchParams.get('pageId');

    if (id) {
      setPageId(Number(id));
      pageApi.getPageById(Number(id))
        .then((res) => {
          if (!res || !res.com_tree) {
            throw new Error('API返回数据格式不正确');
          }
          // 数据转换
          const transformedData: transformedData = {
            comTree: ComTree.getInstance(res.com_tree),
          };

          if (transformedData.comTree !== null) { // 确保只有当页面数据加载完成后才更新
            setComponentTree(transformedData.comTree);
          }
        })
        .catch((error) => {
          // 处理API调用错误
          console.error('获取页面详情失败:', error);
        })
    }
  }, [searchParams]);

  // 这里可以根据需要使用componentTree渲染预览内容

  return (
    <div>
      <h1>Preview</h1>
      <div>Page ID: {pageId}</div>
      {componentTree && (
        <div>
          <h2>Component Tree</h2>
          <pre>{JSON.stringify(componentTree, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Preview;
