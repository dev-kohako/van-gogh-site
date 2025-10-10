export function CarouselSkeleton() {
  return (
    <div
      aria-label="Carregando galeria de pinturas"
      className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-background rounded-lg animate-pulse"
    >
      <div className="flex items-center space-x-9">
        <div className="w-64 h-64 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
        <div className="w-96 h-80 bg-zinc-300 dark:bg-zinc-700 rounded-md scale-110 transform"></div>
        <div className="w-64 h-64 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
      </div>
    </div>
  );
}