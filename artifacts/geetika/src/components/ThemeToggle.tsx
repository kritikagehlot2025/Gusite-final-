import { Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Dark mode active"
      title="Dark mode"
      className={`w-9 h-9 flex items-center justify-center border transition-colors ${className}`}
    >
      <Moon className="w-4 h-4" />
    </button>
  );
}

export default ThemeToggle;
