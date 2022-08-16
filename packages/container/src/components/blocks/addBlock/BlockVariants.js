import { Col, Row } from 'antd';
import CardVariantItem from './CardVariantItem';
import React from 'react';
import {v4 as uuidv4} from 'uuid'


export default function BlockVariants({onNext, setFieldValue}) {

  const onSelectVariant = (type) => {
    try{
      setFieldValue('type', type);
      setFieldValue('id', uuidv4());
    }
    catch (error){
      console.log(error)
    }

    onNext()
  }

  return (
    <div>
      <Row>
        <Col span={5}>
          <CardVariantItem
            src={'https://img.icons8.com/ios/50/000000/swithching-between-tabs.png'}
            name={'Add tabs'}
            type={'tabs'}
            onClick={onSelectVariant}
          />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/ios-glyphs/50/000000/table-1.png'}
            name={'Add tabel'}
            type={'tabel'}
            onClick={onSelectVariant}
          />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/material-outlined/50/000000/image.png'}
            name={'Add an image'}
            type={'image'}
            onClick={onSelectVariant}
          />
        </Col>

        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/external-simple-line-edt.graphics/50/000000/external-Images-images-simple-line-edt.graphics.png'}
            name={'Add images'}
            type={'images'}
            onClick={onSelectVariant}
          />
        </Col>
      </Row>

      <Row style={{
        marginTop: 35,
      }}>
        <Col span={5}>
          <CardVariantItem
            src={'https://img.icons8.com/ios-filled/50/000000/paragraph.png'}
            name={'Add paragraph'}
            type={'paragraph'}
            onClick={onSelectVariant}
          />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/ios/50/000000/list--v1.png'}
            name={'Add list'}
            type={'list'}
            onClick={onSelectVariant}
          />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/pix/50/000000/experimental-calendar-pix.png'}
            name={'Add a calendar'}
            type={'calendar'}
            onClick={onSelectVariant}
          />
        </Col>
        <Col span={5} offset={1}>
          <CardVariantItem
            src={'https://img.icons8.com/ios/50/000000/form.png'}
            name={'Add a form'}
            type={'form'}
            onClick={onSelectVariant}
          />
        </Col>
      </Row>
    </div>
  );
}