import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComTree, type ComponentSchema } from '@wect/type';
import pageApi from '@/api/pageApi';
import RenderComponentContent from './RenderComponentContent';
import './preview.scss';

interface transformedData {
  comTree: ComTree;
}

function Preview() {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageIdNum, setPageIdNum] = useState<number>(0);
  const [componentRoot, setComponentRoot] = useState<ComponentSchema>();
  const [aspectRatio, setAspectRatio] = useState<string>('16/9');
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
          if (res.aspect_ratio) {
            setAspectRatio(res.aspect_ratio);
          }

          if (res.com_tree !== null) { // 确保只有当页面数据加载完成后才更新
            setComponentRoot(res.com_tree);
          }
        })
        .catch((error) => {
          // 处理API调用错误
          console.error('获取页面详情失败:', error);
        })
    }
  }, [pageIdNum]);
  return (
    <main className='main'>
      <div className='preview-container' style={{ aspectRatio }}>
        {componentRoot?.children?.map(child => (
          <RenderComponentContent key={child.comSchemaId} component={child} />
        ))}
      </div>
    </main>
  );
}

export default Preview;
