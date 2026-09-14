import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-none text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal text-ivory hover:bg-ink",
        invert:
          "bg-ivory text-charcoal hover:bg-stone",
        outline:
          "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
        ghost:
          "text-ivory/90 hover:text-ivory",
        moss: "bg-moss text-ivory hover:bg-moss/90",
        bronze: "bg-bronze text-charcoal hover:bg-sand",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "min-h-12 px-6 py-3 sm:px-8 sm:py-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { href?: string };

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }
  return <button className={classes} {...props} />;
}

export { buttonVariants };
