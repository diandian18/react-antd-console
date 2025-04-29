import TooltipIcon from '../components/TooltipIcon';
import SvgIcon from '@/components/SvgIcon';
import { themeModel } from '@/models/theme';
import { useModel } from '@zhangsai/model';
import { ColorPicker as AntdColorPicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useDebounce } from 'react-use';
import { AggregationColor } from 'antd/es/color-picker/color';

export const ColorPrimaryPreset = [{
  label: 'red',
  colors: ['#d7003a', '#e2041b', '#c9171e', '#bf242a', '#b94047', '#a73836', '#d9333f', '#a22041', '#d0576b', '#e9546b', '#ec6d71', '#c85179', '#e7609e', '#a25768', '#bb5548'],
}, {
  label: 'origin',
  colors: ['#ea5506', '#eb6238', '#ec6d51', '#ed6d3d', '#ee7800', '#e17b34', '#f08300', '#f39800', '#f8b862', '#deb068', '#bc763c', '#ad7d4c', '#b68d4c', '#ae7c58', '#e6b422', '#f8b500'],
}, {
  label: 'green',
  colors: ['#69b076', '#88cb7f', '#98d98e', '#93b881', '#769164', '#316745', '#47885e', '#007b43', '#38b48b', '#3b7960', '#028760', '#7ebea5', '#00552e', '#005243'],
}, {
  label: 'blue',
  colors: ['#1c305c', '#223a70', '#164a84', '#19448e', '#165e83', '#507ea4', '#5a79ba', '#007bbb', '#0095d9', '#2ca9e1', '#2a83a2', '#008899', '#84b9cb', '#84a2d4', '#a0d8ef'],
}, {
  label: 'purple',
  colors: ['#4a488e', '#867ba9', '#a59aca', '#674598', '#9079ad', '#65318e', '#522f60', '#493759', '#884898', '#460e44', '#74325c', '#55295b', '#7a4171', '#9d5b8b', '#bc64a4', '#aa4c8f'],
}];

export const AntdColorPickerColorPrimaryPreset = ColorPrimaryPreset.map(item => {
  return {
    label: item.label,
    colors: item.colors.slice(0),
  };
});

const ColorPicker = () => {
  const colorPrimary = useModel(themeModel, 'colorPrimary');
  const { t: t_layout } = useTranslation('layout');
  const [localColorPrimary, setLocalColorPrimary] = useState(colorPrimary);

  useDebounce(
    () => {
      themeModel.setThemeState({ colorPrimary: localColorPrimary });
    },
    200,
    [localColorPrimary]
  );

  const onChangeColor = useCallback((val: AggregationColor) => {
    const hexColor = val.toHexString();
    setLocalColorPrimary(hexColor);
  }, []);
  return (
    <AntdColorPicker
      value={localColorPrimary}
      onChange={onChangeColor}
      presets={AntdColorPickerColorPrimaryPreset}
    >
      <TooltipIcon
        title={t_layout('主题色')}
        icon={<SvgIcon name="color_picker" size={20} color={localColorPrimary} />}
      />
    </AntdColorPicker>
  );
};

export default ColorPicker;
