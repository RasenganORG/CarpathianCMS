import { Col, Row } from 'antd';
import CardVariantItem from './CardVariantItem';
import React from 'react';

export default function BlockVariants({onNext}) {

  return (
    <div>
      <Row>
        <Col span={5}>
          <CardVariantItem
            src={'https://img.icons8.com/ios/50/000000/swithching-between-tabs.png'}
            name={'Add tabs'}
            onClick={onNext}
          />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/ios-glyphs/50/000000/table-1.png'}
            name={'Add tabel'} />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/material-outlined/50/000000/image.png'}
            name={'Add an image'} />
        </Col>

        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/external-simple-line-edt.graphics/50/000000/external-Images-images-simple-line-edt.graphics.png'}
            name={'Add images'} />
        </Col>
      </Row>

      <Row style={{
        marginTop: 35,
      }}>
        <Col span={5}>
          <CardVariantItem
            src={'https://img.icons8.com/ios-filled/50/000000/paragraph.png'}
            name={'Add paragraph'} />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/ios/50/000000/list--v1.png'}
            name={'Add list'} />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/pix/50/000000/experimental-calendar-pix.png'}
            name={'Add a calendar'} />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/ios/50/000000/form.png'}
            name={'Add a blockManagerForm'} />
        </Col>
      </Row>
    </div>
  );
}