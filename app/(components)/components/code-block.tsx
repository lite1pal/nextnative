export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6">
      <code>{code}</code>
    </pre>
  );
}
