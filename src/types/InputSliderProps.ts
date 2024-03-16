export interface InputSliderprops {
  min: number;
  max: number;
  stepSize: number;
  value: number;
  onChangeHandle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSliderHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isStartAdornment?: boolean;
  endormentIcon?: string;
  name: string;
  title?: string;
  isSliderHide?: boolean;
  isDisable?: boolean;
}
