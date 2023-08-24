import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import BlockFrame from '../blocks/editBlock/BlockFrame';
import ParagraphBlock from '../widgetsLocally/Paragraph/ParagraphBlock';
import { useSelector } from 'react-redux';
import BlockViewFrame from './BlockViewFrame';
import { Spin } from 'antd';
import ImageBlock from '../widgetsLocally/Image/ImageBlock';
import ListBlock from '../widgetsLocally/List/ListBlock';
import ImagesBlock from '../widgetsLocally/Images/ImagesBlock';

const BlockViewManager = () => {

    const selectedPage = useSelector(state => state.pages.selectedPage);
    const blocks = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks);
    const sortedBlocks = blocks?.slice().sort((field1, field2) => field1.metadata.place - field2.metadata.place);
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
        <Spin
          spinning={blocksAreLoading}
          style={{
            display:'flex',
            justifyContent:'center'
          }}
        >
          {sortedBlocks?.map((field) => {
              return (
                <BlockViewFrame
                  key={field.id}
                  id={field.id}
                  name={field.metadata.titleDisplayed ? field.metadata.title : null}
                >
                  {field.metadata.type === 'paragraph' ?
                    <ParagraphBlock
                      content={field.data}
                      isEdit={false}
                      key={field.id}
                      id={field.id} /> : null}
                  {field.metadata.type === 'image' ?
                    <ImageBlock
                      content={field.data}
                      isEdit={false}
                      key={field.id}
                      id={field.id} /> : null}
                  {field.metadata.type === 'list' ?
                    <ListBlock
                      content={field.data}
                      isEdit={false}
                      key={field.id}
                      id={field.id} /> : null}
                  {field.metadata.type === 'images' ?
                    <ImagesBlock
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
