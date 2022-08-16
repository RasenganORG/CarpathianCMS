import React from 'react';
import PropTypes from 'prop-types';

EditBlock.requiredProps={
  blockId:PropTypes.string,
}

export default function EditBlock({blockId}) {

  return(
    <div>
      {`editing ${blockId}`}
    </div>
  )
}