export default function LoadingSkeleton() {
  return (
    <div className="glass p-4 rounded-xl flex gap-4 animate-pulse mb-4">
      <div className="w-24 h-24 bg-gradient-to-br from-gradient-start to-gradient-end rounded-lg" />
      <div className="flex-1 space-y-3">
        <div className="h-5 w-1/2 bg-white/20 rounded" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-4 w-1/3 bg-white/10 rounded" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-16 bg-white/10 rounded-full" />
          <div className="h-5 w-12 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
} 