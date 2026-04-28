export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black tracking-normal">{title}</h1>
      {description ? <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p> : null}
    </div>
  );
}
