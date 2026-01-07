import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComTree } from '@wect/type';
import pageApi from '@/api/pageApi';


interface transformedData {
  comTree: ComTree;
}

function Preview() {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageIdNum, setPageIdNum] = useState<number>(0);
  const [componentTree, setComponentTree] = useState<ComTree | null>(null);

  useEffect(() => {
    // 解析查询参数
    const id = Number(pageId);

    if (id) {
      setPageIdNum(id);
      pageApi.getPageById(id)
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

    console.log('componentTree', componentTree);
  }, [pageIdNum]);

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
