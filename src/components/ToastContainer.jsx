import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

const iconMap = {
  success: <CheckCircle2 size={18} className="text-green-400" />,
  warning: <AlertTriangle size={18} className="text-yellow-400" />,
  info: <Info size={18} className="text-blue-400" />,
  error: <XCircle size={18} className="text-red-400" />,
};

const colorMap = {
  success: "border-green-500/30 bg-green-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
  info: "border-blue-500/30 bg-blue-500/10",
  error: "border-red-500/30 bg-red-500/10",
};

export default function ToastContainer({ toasts = [] }) {
  return (
    <div className="fixed top-24 right-4 z-[9999] space-y-3 w-[320px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-2xl border px-4 py-3 shadow-panel backdrop-blur-md ${colorMap[toast.type]}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{iconMap[toast.type] || iconMap.info}</div>
            <div>
              <p className="font-medium text-sm text-text">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-muted mt-1">{toast.message}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}