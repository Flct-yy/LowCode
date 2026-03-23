import { TextareaConfigItem } from "@wect/type";


const Textarea = ({
  configItem,
  setCurrentValue,
}: {
  configItem: TextareaConfigItem;
  setCurrentValue: (value: string) => void;
}) => {
  const {
    label,
    placeholder,
    currentValue,
  } = configItem;

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <textarea
        className="config-item__ui border padding noOutline"
        value={currentValue || ''}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={(e) => setCurrentValue(e.target.value)}
        placeholder={placeholder}
        rows={6}
        style={{ resize: 'vertical' }}
      />
    </div>
  )
}

export default Textarea;