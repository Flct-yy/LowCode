import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComTree, comTreeInstance, type ComponentSchema } from '@wect/type';
import pageApi from '@/api/pageApi';
import RenderComponentContent from './RenderComponentContent';


interface transformedData {
  comTree: ComTree;
}

function Preview() {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageIdNum, setPageIdNum] = useState<number>(0);
  const [componentTree, setComponentTree] = useState<ComponentSchema>();

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
            comTree: ComTree.getInstance(),
          };

          if (transformedData.comTree !== null) { // 确保只有当页面数据加载完成后才更新
            transformedData.comTree.setRoot(res.com_tree);
            setComponentTree(transformedData.comTree.getRoot());
          }
        })
        .catch((error) => {
          // 处理API调用错误
          console.error('获取页面详情失败:', error);
        })
    }
  }, [pageIdNum]);

  return (
    <main>
      {componentTree && <RenderComponentContent component={componentTree} />}
    </main>
  );
}

export default Preview;
