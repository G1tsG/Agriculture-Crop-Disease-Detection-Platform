export default function Button({ variant = "primary", className = "", type = "button", children, ...props }) {
  const classes = ["button", `button--${variant}`, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}