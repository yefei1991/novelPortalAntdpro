import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Button, Icon, Modal, Spin } from 'antd';

import styles from './Table.less';

@connect(({ table, loading }) => ({
  table,
  loading: loading.effects['table/fetch'],
  chapterLoading: loading.effects['table/fetchChapter'],
  detailLoading: loading.effects['table/fetchDetail'],
}))
class BasicList extends PureComponent {
  state = { visible: false, action: 'chapters' };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'table/fetch',
    });
  }

  readBook = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'table/fetchChapter',
      payload: item.id,
    });
    this.setState({ currentNovel: item, visible: true, action: 'chapters' });
  };
  catalog = () => {
    const { table } = this.props;
    table.detail = {};
    this.setState({ visible: true, action: 'chapters' });
  };
  readChapter = item => {
    const { dispatch, loading } = this.props;
    dispatch({
      type: 'table/fetchDetail',
      payload: item.id,
    });
    this.setState({ action: 'chapterDetail' });
  };
  closeBook = () => {
    const { table } = this.props;
    table.chapterList = [];
    table.detail = {};
    this.setState({ visible: false });
  };
  prev = () => {
    const { table, dispatch } = this.props;
    console.info(table.detail.prev);
    if (table.detail.prev) {
      dispatch({
        type: 'table/fetchDetail',
        payload: table.detail.prev,
      });
    }
  };
  next = () => {
    const { table, dispatch } = this.props;
    console.info(table.detail.next);
    if (table.detail.next) {
      dispatch({
        type: 'table/fetchDetail',
        payload: table.detail.next,
      });
    }
  };
  render() {
    const { visible, currentNovel = {}, action, currentChapter = {} } = this.state;
    const { table, loading, chapterLoading, detailLoading } = this.props;
    const modalFooter =
      action == 'chapters'
        ? { footer: null }
        : {
            footer: (
              <div style={{ textAlign: 'center' }}>
                <Button onClick={this.prev}>上一页</Button>
                <Button onClick={this.catalog}>目录</Button>
                <Button onClick={this.next}>下一页</Button>
              </div>
            ),
          };
    const getModalContent = () => {
      if (action == 'chapters') {
        return (
          <Spin spinning={chapterLoading}>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={table.chapterList}
              renderItem={item => (
                <List.Item>
                  <Card
                    onClick={e => {
                      this.readChapter(item);
                    }}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    <p>{item.title}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Spin>
        );
      } else {
        return <Spin spinning={detailLoading}>{table.detail.content}</Spin>;
      }
    };
    return (
      <div>
        <Spin spinning={loading}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={table.tableList}
            renderItem={item => (
              <List.Item>
                <Card
                  onClick={e => {
                    this.readBook(item);
                  }}
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  <h2>{item.name}</h2>
                  <p>{item.author}</p>
                  <p>{item.type}</p>
                </Card>
              </List.Item>
            )}
          />
        </Spin>
        <Modal
          style={{ top: 20 }}
          title={action == 'chapters' ? currentNovel.name : table.detail.title}
          width={1000}
          visible={visible}
          onCancel={this.closeBook}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}

export default BasicList;
