import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟表单提交
    toast.success('消息已发送！我会尽快回复您。');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl tracking-tight">联系我</h2>
              <p className="text-muted-foreground">
                对我的作品感兴趣？想要合作或只是打个招呼？欢迎随时联系我！
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h4>邮箱</h4>
                  <p className="text-muted-foreground">zhang.design@example.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h4>位置</h4>
                  <p className="text-muted-foreground">中国 北京</p>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <h4>社交媒体</h4>
              <div className="flex gap-4">
                {['Dribbble', 'Behance', 'LinkedIn', 'Twitter'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name">姓名</label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="您的姓名"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email">邮箱</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message">消息</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="您想说些什么..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send size={18} className="mr-2" />
                发送消息
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
