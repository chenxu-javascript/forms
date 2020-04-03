import React from 'react';
import { InputNumber } from 'antd';

const InputNumberCompontent = props => {
  const { onChange, id, value, type_genre, ...params } = props;
  const limitDecimals = _value => {
    return /^\d+$/.test(Number(_value)) ? Number(_value) : Number(value);
  };

  return (
    <InputNumber
      {...params}
      id={String(id)}
      defaultValue={value}
      formatter={type_genre === 'Integer' ? limitDecimals : null}
      parser={type_genre === 'Integer' ? limitDecimals : null}
      onChange={e => {
        onChange({
          target: {
            value: e
          }
        });
      }}
    />
  );
};

export default InputNumberCompontent;
