// components/FormInput.tsx
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  className,
  ...rest
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <input
        id={name}
        {...register(name, {
          required: `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } is required`,
          valueAsNumber: rest.type === "number", // convert input value to number if type is number
        })}
        {...rest}
        className={cn(
          "w-full px-3 py-3 border-2 border-[#D9D9D9] rounded-sm text-[#999] text-base font-medium outline-none",
          error && "border-red-500",
          className
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

//  <FormInput<FormValues> name="name" label="Full Name" placeholder="John Doe" />
//         <FormInput<FormValues> name="age" label="Age" type="number" placeholder="30" />
