import { ArrowDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                你好，我是
              </p>
              <h1 className="text-5xl md:text-6xl tracking-tight">
                张设计
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground">
                产品设计师
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg">
              专注于创造简洁、优雅且用户友好的数字产品体验。将复杂的问题转化为直观的解决方案。
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() =>
                  document
                    .getElementById("works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
              >
                查看作品
                <ArrowDown size={20} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1705909773420-8d7af2a343f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB3b3Jrc3BhY2UlMjBtaW5pbWFsfGVufDF8fHx8MTc2MTUzODk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="设计工作区"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}