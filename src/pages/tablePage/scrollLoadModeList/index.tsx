import TablePage from '@/components/TablePage';
import { GridAction, GridForm, GridFormItem, RefProps } from 'admin-search-list';
import { useScrollContainer, useListScroll } from '@/hooks/useTablePage';
import { Button, Card, Form, Input } from 'antd';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import './index.less';

interface SearchModel {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
}

interface ListItem {
  a: string;
  b: string;
}

const configTableScroll = true; // 仅在headerFixed时生效

const ScrollLoadMode = () => {
  const backTopTarget = useScrollContainer(configTableScroll);
  const listScroll = useListScroll(configTableScroll);
  const [form] = Form.useForm<SearchModel>();
  const ref = useRef<RefProps<ListItem>>(null);
  const { t: t_tablePage } = useTranslation('tablePage');
  const language = useModel(baseModel, 'language');

  async function onClickDeleteStay(item: ListItem) {
    const data = ref.current?.getData() ?? [];
    const total = ref.current?.getPageTotal();
    if (!data || !total) return;
    ref.current?.setData(data.filter((_item) => _item.a !== item.a));
    ref.current?.setPageTotal(total - 1);
  }

  return (
    <TablePage<SearchModel, ListItem>
      language={language}
      ref={ref}
      url={`/table/common`}
      searchForm={form}
      searchRender={({ SearchBtnComponent }) => {
        return (
          <GridForm
            form={form}
          >
            <GridFormItem name="a" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="b" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="c" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="d" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="e" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <GridFormItem name="f" label={t_tablePage('姓名')}>
              <Input placeholder={t_tablePage('请输入')} />
            </GridFormItem>
            <SearchBtnComponent />
            <GridAction>
              <Button type="primary">{t_tablePage('新增')}</Button>
              <Button type="primary">{t_tablePage('编辑')}</Button>
              <Button type="primary">{t_tablePage('日志')}</Button>
              <Button type="primary">{t_tablePage('导出')}</Button>
            </GridAction>
          </GridForm>
        );
      }}
      listScroll={listScroll}
      scrollLoadMode
      scrollContainer={backTopTarget}
      enableBackTop
      listRender={({ data }) => {
        return (
          <div className="scrollLoadPage__list">
            {data.map(item => {
              return (
                <Card className="scrollLoadPage__list-item" key={item.a}
                  hoverable
                  cover={<img alt="example" src="/images/login_bg.jpg" />}
                >
                  <Card.Meta title={item.a} description={item.b} />
                  <div className="scrollLoadPage__list-item-bottom">
                    <Button size="small" type="primary">{t_tablePage('详情')}</Button>
                    <Button size="small" type="primary">{t_tablePage('编辑')}</Button>
                    <Button size="small" type="primary" danger onClick={() => onClickDeleteStay(item)}>{t_tablePage('删除')}</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default ScrollLoadMode;
