import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import BlockFrame from '../blocks/editBlock/BlockFrame';
import Paragraph from '../widgetsLocally/Paragraph/Paragraph';
import { useSelector } from 'react-redux';
import BlockViewFrame from './BlockViewFrame';
import { Spin } from 'antd';

const BlockViewManager = () => {

    const selectedPage = useSelector(state => state.pages.selectedPage);
    const blocks = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks);
    const sortedBlocks = blocks?.slice().sort((field1, field2) => field1.metadata.place - field2.metadata.place)
    const [blocksAreLoading, setBlocksAreLoading] = useState(true);
    useEffect(() => {
      if (blocks !== undefined) {
        setBlocksAreLoading(false);
      } else {
        setBlocksAreLoading(true);
      }
    }, [blocks]);

    return (
      <div>
        <Spin spinning={blocksAreLoading}>

          {sortedBlocks?.map((field) => {
              return (
                <BlockViewFrame
                  key={field.id}
                  id={field.id}
                  name={field.metadata.titleDisplayed ? field.metadata.title : null}
                >
                  {field.metadata.type === 'paragraph' ? <Paragraph
                    content={field.data}
                    isEdit={false}
                    key={field.id}
                    id={field.id} /> : null}
                </BlockViewFrame>);
            },
          )}
        </Spin>
      </div>
    );
  }
;

export default BlockViewManager;