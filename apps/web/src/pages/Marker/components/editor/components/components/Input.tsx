import { InputConfigItem } from "@type/ConfigItem";


const Input = ({
  configItem,
  setCurrentValue,
}: {
  configItem: InputConfigItem;
  setCurrentValue: (value: string) => void;
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    type,
    defaultValue,
    currentValue,
  } = configItem;

  return (
    <div className="config-item">
      <label className="config-item__label">{label+'input'}</label>
      <input
        type={type}
        value={currentValue || ''}
        onChange={(e) => setCurrentValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
} 

export default Input;