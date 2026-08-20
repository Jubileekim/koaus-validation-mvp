export default function FormField({
  label,
  error,
  as = 'input',
  className,
  children,
  ...controlProps
}) {
  return (
    <label className={className}>
      <span>{label}</span>
      {as === 'select' ? (
        <select {...controlProps}>{children}</select>
      ) : as === 'textarea' ? (
        <textarea {...controlProps} />
      ) : (
        <input {...controlProps} />
      )}
      {error ? <em>{error}</em> : null}
    </label>
  )
}
