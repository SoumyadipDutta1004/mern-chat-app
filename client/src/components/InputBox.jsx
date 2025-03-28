


export default function InputBox({
  icon,
  showPasswordIcon,
  showPassword,
  label,
  type,
  placeholder,
  register
}) {
  
  return (
    <div>
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <div className="flex items-center border border-neutral-400 rounded-lg px-2 py-2 w-full ">
        {icon}
        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className="px-2 w-full outline-none"
        />
        <span
          onClick={() => showPassword.setShowPassword(!showPassword.showPassword)}
          className="cursor-pointer">
          {showPasswordIcon}
        </span>
      </div>
    </div>
  );
}
