import { FormFieldProps } from "@/types/RegisterFormShema";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  options,
  icon,
  optional,
}) => (
  <>
    {type === "select" ? (
      <select
        name={name}
        className="select select-bordered w-full"
        defaultValue={0}
        onChange={(e) => register(name, { value: e.target.value })}>
        {options?.map((option, index: number) => (
          <option
            key={index}
            value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        className="textarea textarea-bordered w-full"
        name={name}
        rows={4}
        cols={50}
        onChange={(e) => register(name, { value: e.target.value })}
        placeholder={placeholder}></textarea>
    ) : (
      <label className="input input-bordered flex items-center gap-2">
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
        {optional && <span className="badge badge-info">Optional</span>}
      </label>
    )}
    {error && (
      <span className="error-message text-red-500 text-sm mt-1 ml-2 text">
        {error.message}
      </span>
    )}
  </>
);
export default FormField;
