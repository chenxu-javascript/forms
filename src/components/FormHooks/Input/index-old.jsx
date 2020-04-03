import React from 'react';

const Input = React.memo(props => {
  const {
    value,
    style,
    onChange,
    text_area,
    range = false,
    placeholder = '请输入',
    ...other
  } = props;
  return (
    <Input
      autoComplete="off"
      {...other}
      value={value}
      placeholder={placeholder}
      style={{ width: range ? '' : '100%', ...style }}
      onChange={e => onChange(e.target.value)}
    />
  );
});

export default Input;
